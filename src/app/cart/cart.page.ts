import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CheckoutService } from '../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  checkoutItems: any = [];
  splicedValue: any = 0;
  loadingBar: boolean;
  totalPrice: any = 0;
  response: any;
  findId: any;
  token: any;
  cart: any;
  user: any;

  constructor(private storage: Storage, private http: HttpClient, private navCtrl: NavController, private checkoutData: CheckoutService) {
    this.storage.get('user').then((val) => {
      this.user = val;
      this.storage.get('token').then((val) => {
        this.token = val;
        this.getCart();
      });
    });

    this.checkoutData.removeData();
  }

  ionViewDidEnter(){
    console.log('did enter...');
  }

  ngOnInit() {
  }

  getCart(){
    this.loadingBar = true;
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://sebuku.livingpay.id/api/cart/list', {headers}).subscribe((response) => {
      console.log(response);
      this.response = response;
      this.cart = this.response.cart;
      this.loadingBar = false;
    }, (err) => {
      console.log(err);
      this.loadingBar = false;
    });
  }

  addQuantity(i){
    this.cart[i].jumlah += 1;

    if (this.cart[i].type == 'buy') {
      this.totalPrice += this.cart[i].book.selling_price;
    } else {
      this.totalPrice += this.cart[i].book.rental_price;
    }

    if (this.cart[i].jumlah == 1) {
      this.checkoutItems.push(this.cart[i]);
    }

    console.log(this.checkoutItems);
  }

  minQuantity(i){
    if (this.cart[i].jumlah > 0) {
      this.cart[i].jumlah -= 1;

      if (this.cart[i].type == 'buy') {
        this.totalPrice -= this.cart[i].book.selling_price;
      } else {
        this.totalPrice -= this.cart[i].book.rental_price;
      }

      if (this.cart[i].jumlah == 0) {
        this.checkoutItems.splice(i, 1);
      }

      console.log(this.checkoutItems);
    }
  }

  pushShippingMethodPage(){
    this.checkoutData.removeData();
    this.checkoutData.setData(this.checkoutItems);
    this.navCtrl.navigateForward('/shipping-method');
  }

}
