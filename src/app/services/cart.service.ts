import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any = [];

  constructor() { }

  setData(data) {
    this.items.push(data);
  }

  getData() {
    return this.items;
  }

}
