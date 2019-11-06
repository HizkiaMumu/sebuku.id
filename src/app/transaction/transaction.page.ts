import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './../services/data.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  transactions: any;
  response: any;
  message: any;
  token: any;
  cart: any;

  constructor(private navCtrl: NavController, private storage: Storage, private http: HttpClient, private dataService: DataService) {
    this.storage.get('token').then((val) => {
      this.token = val;

      this.getCart();
      this.getTransactions();
    });
  }

  ngOnInit() {
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

  getTransactions(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://sebuku.livingpay.id/api/transaction', {headers}).subscribe((response) => {
      this.response = response;
      this.countTransactionPrice(this.response.data.transactions);
    }, (err) => {
      console.log(err);
    });
  }

  countTransactionPrice(transactions){
    for (let i = 0; i < transactions.length; i++) {
      transactions[i].total_price = 0;
      for (let h = 0; h < transactions[i].items.length; h++) {
        transactions[i].total_price += transactions[i].items[h].total_price;
      }
    }

    this.transactions = transactions;
    console.log(this.transactions);
  }

  pushDetailTransactionPage(data){
    this.dataService.setData(data);
    this.navCtrl.navigateForward(['detail-transaction']);
  }

}
