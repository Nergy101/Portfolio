import { test, expect } from '@playwright/test';

test.describe('Portfolio improvements', () => {
  test('filters technology cards by name without changing other groups', async ({
    page,
  }) => {
    await page.goto('/');

    const professionalGroup = page.locator('app-tech-grid').first();
    const search = professionalGroup.getByRole('searchbox', {
      name: 'Search technologies',
    });

    await search.fill('angular');

    await expect(
      professionalGroup.getByText('Angular', { exact: true }),
    ).toBeVisible();
    await expect(
      professionalGroup.getByText('Azure', { exact: true }),
    ).toHaveCount(0);
    await expect(
      page.locator('app-tech-grid').nth(1).getByText('Deno'),
    ).toBeVisible();
  });

  test('opens a keyboard-accessible project case study with outcome, stack, and screenshots', async ({
    page,
  }) => {
    await page.goto('/');
    const projectCards = page.locator('app-project-showcase');
    await expect(projectCards.locator('details.case-study')).toHaveCount(5);
    const screenshotCounts = await projectCards.evaluateAll((cards) =>
      cards.map(
        (card) =>
          card.querySelectorAll('details.case-study .screenshot-gallery img')
            .length,
      ),
    );
    expect(screenshotCounts).toHaveLength(5);
    expect(screenshotCounts.every((count) => count > 0)).toBe(true);

    const muorg = page
      .locator('app-project-showcase')
      .filter({
        has: page.getByRole('heading', { name: 'Muorg', exact: true }),
      })
      .first();
    const disclosure = muorg.getByRole('button', { name: 'Case study' });

    await expect(disclosure).toHaveAttribute('aria-expanded', 'false');
    await disclosure.focus();
    await page.keyboard.press('Enter');

    await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
    await expect(
      muorg.getByText(/Delivered a cross-platform music library organizer/i),
    ).toBeVisible();
    await expect(muorg.getByText('Vue.js', { exact: true })).toBeVisible();
    await expect(
      muorg
        .getByRole('img', { name: 'Muorg web client - desktop view' })
        .first(),
    ).toBeVisible();

    for (const card of await projectCards.all()) {
      await card.locator('details.case-study').evaluate((details) => {
        (details as HTMLDetailsElement).open = true;
      });
      const images = card.locator('.screenshot-gallery img');
      const imageCount = await images.count();
      expect(imageCount).toBeGreaterThan(0);

      for (let index = 0; index < imageCount; index += 1) {
        const image = images.nth(index);
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute('alt', /\S/);
        await expect
          .poll(() =>
            image.evaluate(
              (element) => (element as HTMLImageElement).naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
      }
    }
  });

  test('saves weather location and units, fetches a forecast, and reuses fresh cached data', async ({
    page,
  }) => {
    const forecastUnits: string[] = [];
    let geocodingRequests = 0;

    await page.route('**/v1/search?**', async (route) => {
      geocodingRequests += 1;
      const location = new URL(route.request().url()).searchParams.get('name');
      await route.fulfill({
        json: {
          results: [
            {
              name: location,
              country: 'Netherlands',
              country_code: 'NL',
              latitude: 52.1,
              longitude: 5.1,
            },
          ],
        },
      });
    });
    await page.route('**/v1/forecast?**', async (route) => {
      const unit =
        new URL(route.request().url()).searchParams.get('temperature_unit') ??
        'celsius';
      forecastUnits.push(unit);
      const temperature = unit === 'fahrenheit' ? 68 : 20;
      await route.fulfill({
        json: {
          daily: {
            time: [
              '2026-09-29',
              '2026-09-30',
              '2026-10-01',
              '2026-10-02',
              '2026-10-03',
              '2026-10-04',
              '2026-10-05',
            ],
            weather_code: [0, 1, 2, 3, 45, 61, 95],
            temperature_2m_max: Array(7).fill(temperature),
            temperature_2m_min: Array(7).fill(temperature - 10),
          },
        },
      });
    });

    await page.goto('/');

    const weather = page.locator('app-weather-section');
    await weather.getByRole('textbox', { name: 'Location' }).fill('Amsterdam');
    await weather.getByLabel('Temperature unit').selectOption('fahrenheit');
    await weather.getByRole('button', { name: 'Update weather' }).click();

    await expect(
      weather.getByRole('heading', { name: 'Forecast for Amsterdam' }),
    ).toBeVisible();
    await expect(
      weather.getByText('68°F', { exact: true }).first(),
    ).toBeVisible();
    await expect(weather.getByText(/Last updated:/)).toBeVisible();
    expect(forecastUnits).toContain('fahrenheit');

    const preferences = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('portfolio-weather-preferences') ?? '{}'),
    );
    expect(preferences).toEqual({ location: 'Amsterdam', unit: 'fahrenheit' });

    const requestsBeforeReload = forecastUnits.length;
    await page.reload();

    await expect(
      weather.getByText('68°F', { exact: true }).first(),
    ).toBeVisible();
    expect(forecastUnits).toHaveLength(requestsBeforeReload);
    expect(geocodingRequests).toBeLessThanOrEqual(requestsBeforeReload + 1);
  });

  test('uses safe weather defaults when saved preferences are malformed', async ({
    page,
  }) => {
    const requestedUnits: string[] = [];
    await page.addInitScript(() => {
      localStorage.setItem('portfolio-weather-preferences', '{not json');
    });
    await page.route('**/v1/search?**', async (route) => {
      const name = new URL(route.request().url()).searchParams.get('name');
      await route.fulfill({
        json: {
          results: [{ name, latitude: 52.09, longitude: 5.12 }],
        },
      });
    });
    await page.route('**/v1/forecast?**', async (route) => {
      requestedUnits.push(
        new URL(route.request().url()).searchParams.get('temperature_unit') ??
          '',
      );
      await route.fulfill({
        json: {
          daily: {
            time: ['2026-09-29'],
            weather_code: [0],
            temperature_2m_max: [20],
            temperature_2m_min: [12],
          },
        },
      });
    });

    await page.goto('/');

    const weather = page.locator('app-weather-section');
    await expect(
      weather.getByRole('textbox', { name: 'Location' }),
    ).toHaveValue('Utrecht');
    await expect(weather.getByLabel('Temperature unit')).toHaveValue('celsius');
    await expect(
      weather.getByRole('heading', { name: 'Forecast for Utrecht' }),
    ).toBeVisible();
    expect(requestedUnits).toContain('celsius');
  });

  test('keeps a cached forecast and explains a failed refresh', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'portfolio-weather-preferences',
        JSON.stringify({ location: 'Utrecht', unit: 'celsius' }),
      );
      localStorage.setItem(
        'portfolio-weather-cache',
        JSON.stringify({
          'utrecht|celsius': {
            location: 'Utrecht',
            unit: 'celsius',
            fetchedAt: Date.now() - 45 * 60 * 1000,
            days: [
              {
                datetime: '2026-09-29',
                icon: 'clear-day',
                temperatureHigh: 17,
                temperatureLow: 9,
              },
            ],
          },
        }),
      );
    });
    await page.route('**/v1/search?**', (route) => route.abort());

    await page.goto('/');

    const weather = page.locator('app-weather-section');
    await expect(
      weather.getByText(/Showing cached forecast, last updated/),
    ).toBeVisible();
    await expect(weather.getByRole('alert')).toHaveText(
      "Couldn't refresh. Showing saved weather instead.",
    );
    await expect(weather.getByText('17°C', { exact: true })).toBeVisible();
  });

  test('keeps weather, technology, and project content within a mobile viewport', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const overflowingSections = await page.evaluate(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          '.weather-preferences, .weather-cards, .tech-icons-container, app-project-showcase .section',
        ),
      );
      return sections
        .filter((section) => section.scrollWidth > section.clientWidth + 1)
        .map((section) => section.className || section.tagName.toLowerCase());
    });

    expect(overflowingSections).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test('reduces page transitions and disables smooth scrolling when requested', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const motionStyles = await page
      .locator('app-project-showcase .section')
      .first()
      .evaluate((section) => ({
        transitionDuration: getComputedStyle(section).transitionDuration,
        scrollBehavior: getComputedStyle(document.documentElement)
          .scrollBehavior,
      }));

    expect(motionStyles.scrollBehavior).toBe('auto');
    expect(
      Number.parseFloat(motionStyles.transitionDuration),
    ).toBeLessThanOrEqual(0.001);
  });
});
