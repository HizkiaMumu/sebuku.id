import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './../services/data.service';
import { CartService } from './../services/cart.service';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  bookSkeleton: any;
  books: any = [];
  response: any;
  token: any;
  cart: any;

  constructor(private navCtrl: NavController, private storage: Storage, private http: HttpClient, private route: ActivatedRoute, private router: Router, private dataService: DataService, private cartService: CartService) {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.getBooks();
      this.getCart();
    });
  }

  getBooks(){
    this.bookSkeleton = true;
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://sebuku.livingpay.id/api/get-books', {headers}).subscribe((response) => {
      console.log(response);
      this.groupingBooks(response);
      this.bookSkeleton = false;
    }, (err) => {
      console.log(err);
      this.bookSkeleton = false;
    });
  }

  getCart(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://sebuku.livingpay.id/api/cart/list', {headers}).subscribe((response) => {
      console.log(response);
      this.response = response;
      this.cart = this.response.cart;
    }, (err) => {
      console.log(err);
    });
  }

  groupingBooks(data){
    let books = data.books;
    let booksArray = [];
    let number = 0;

    for (let i = 0; i < books.length; i++) {
      booksArray.push(books[i]);
      number += 1;
      if (number == 3) {
        this.books.push(booksArray);
        booksArray = [];
        number = 0;
      } else if (books.length == i + 1) {
        this.books.push(booksArray);
        console.log('akhir...');
      }
    }
  }

  pushDetailBook(data){
    this.dataService.setData(data);
    this.navCtrl.navigateForward(['detail-book']);
  }

  pushCartPage(){
    this.navCtrl.navigateForward('/cart');
  }

}
