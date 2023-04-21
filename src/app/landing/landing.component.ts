import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Tile } from './tile.model';
import PocketBase from 'pocketbase';

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

  query? = '?city=Utrecht';

  faChevronDown = faChevronDown;

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.doCall();

    const pb = new PocketBase('https://pocketbase.nergy.space');
    // This method initializes a one-off realtime subscription and will
    // open a popup window with the OAuth2 vendor page to authenticate.
    //
    // Once the external OAuth2 sign-in/sign-up flow is completed, the popup
    // window will be automatically closed and the OAuth2 data sent back
    // to the user through the previously established realtime connection.
    const authData = await pb
      .collection('users')
      .authWithOAuth2({ provider: 'google' });

    console.log(authData);

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model?.id);

    // "logout" the last authenticated model
    pb.authStore.clear();
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
