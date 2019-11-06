import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {

  slicedSynopsis: boolean = true;
  cartSpinner: boolean = false;
  bookOwner: boolean = false;
  aboutBook: boolean = true;
  response: any;
  token: any;
  book: any;
  cart: any;

  constructor(public navCtrl: NavController, private storage: Storage, private http: HttpClient, private route: ActivatedRoute, private router: Router, private dataService: DataService, private cartService: CartService) {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.getCart();
    });

    this.book = this.dataService.getData();
  }

  ionViewDidLoad(){

  }

  ngOnInit() {

  }

  getCart(){
    this.cartSpinner = true;
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://sebuku.livingpay.id/api/cart/list', {headers}).subscribe((response) => {
      console.log(response);
      this.response = response;
      this.cart = this.response.cart;
      this.cartSpinner = false;
    }, (err) => {
      console.log(err);
      this.cartSpinner = false;
    });
  }

  showAboutBook(){
    this.aboutBook = true;
    this.bookOwner = false;
  }

  showBookOwner(){
    this.bookOwner = true;
    this.aboutBook = false;
  }

  sliceSynopsis(){
    this.slicedSynopsis = true;
  }

  unSliceSynopsis(){
    this.slicedSynopsis = false;
  }

  buyBook(){
    this.cartSpinner = true;
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    const body = {
      'book_id': this.book.id,
      'type': 'buy',
      'jumlah': 0
    };

    this.http.post('http://sebuku.livingpay.id/api/cart/add', body, {headers}).subscribe((response) => {
      console.log(response);
      this.response = response;
      this.cart = this.response.cart;
      this.cartSpinner = false;
    }, (err) => {
      console.log(err);
      this.cartSpinner = false;
    });
  }

  rentBook(){
    this.cartSpinner = true;
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    const body = {
      'book_id': this.book.id,
      'type': 'rent',
      'jumlah': 1
    };

    this.http.post('http://sebuku.livingpay.id/api/cart/add', body, {headers}).subscribe((response) => {
      console.log(response);
      this.response = response;
      this.cart = this.response.cart;
      this.cartSpinner = false;
    }, (err) => {
      console.log(err);
      this.cartSpinner = false;
    });
  }

  pushCartPage(){
    this.navCtrl.navigateForward('/cart');
  }

}
