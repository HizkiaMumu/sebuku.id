import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  token: any;

  constructor(private navCtrl: NavController, private storage: Storage, private http: HttpClient) {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.getBooks();
    });
  }

  getBooks(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://192.168.1.6:8000/api/get-books', {headers}).subscribe((response) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    });
  }

  pushDetailBook(){
    this.navCtrl.navigateForward('/detail-book');
  }

  pushCartPage(){
    this.navCtrl.navigateForward('/cart');
  }

}
