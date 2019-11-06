import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  items: any = [];

  constructor() { }

  setData(data) {
    this.items.push(data);
    return this.items;
  }

  getData() {
    return this.items;
  }

  removeData(){
    this.items = [];
  }

  removeSingleData(id){
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        this.items.splice(i, 1);
      }
    }
  }

}
