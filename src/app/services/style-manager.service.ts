/**
 * Copied from https://github.com/angular/material.angular.io/blob/master/src/app/shared/style-manager/style-manager.ts
 * TODO(@SiddAjmera): Give proper attribution here
 */

import { Injectable } from '@angular/core';

@Injectable()
export class StyleManagerService {
  isLight = false;

  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string) {
    getLinkElementForKey1(key).setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  toggleDarkTheme() {
    if (this.isLight) {
      this.removeStyle('light-theme');
      document.body.classList.remove('light-theme');
      this.isLight = false;
    } else {
      document.body.classList.add('light-theme');
      this.isLight = true;
    }
  }
}

function getLinkElementForKey1(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `app-${key}`;
}
