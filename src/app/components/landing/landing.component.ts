import { Component, OnInit } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Tile } from './tile.model';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1, color: 'primary' },
    { text: 'Two', cols: 1, rows: 1, color: 'secondary' },
    { text: 'Three', cols: 2, rows: 1, color: 'accent' },
  ];
  loading = false;

  weatherUrl =
    'https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-f15a95c0-61fb-478f-a954-1aa21586e126/cloud/getWeather';

  weatherResult?: any[];

  query?= '?city=Utrecht';

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  constructor(private readonly dialog: MatDialog) { }


  get enableTodo(): boolean {
    return environment.enableTodo;
  }

  async ngOnInit(): Promise<void> {
    await this.doCall();
  }

  async doCall(): Promise<void> {
    this.loading = true;
    try {
      const response = await fetch(encodeURI(this.weatherUrl + this.query));
      const result = await response.json();
      if (result) {
        this.weatherResult = result.data.days.slice(0, 7);
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  moveTo(divId: string) {
    document!
      .getElementById(divId)!
      .scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  navigateTo(url: string) {
    window.open(url, 'blank');
  }
}
