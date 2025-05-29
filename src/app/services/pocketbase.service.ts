import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  pocketbase: PocketBase;

  constructor() {
    this.pocketbase = new PocketBase('https://pocketbase.nergy.space');
  }
}
