import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

declare var GMaps;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  onDrag: boolean = false;
  markerClass: any = '';
  checkoutItems: any;
  response: any;
  message: any;
  userLat: any;
  userLng: any;
  token: any;
  map: any;

  constructor(private checkoutData: CheckoutService, private storage: Storage, private http: HttpClient, private geolocation: Geolocation) {
    this.checkoutItems = this.checkoutData.getData();

    this.storage.get('token').then((val) => {
      this.token = val;
    });
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
     this.userLat = resp.coords.latitude;
     this.userLng = resp.coords.longitude;

     this.loadMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap(){
    console.log(this.userLat, this.userLng);
    this.map = new GMaps({
      div: this.mapElement.nativeElement,
      lat: this.userLat,
      lng: this.userLng,
      zoom: 15,
      disableDefaultUI: true,
      dragstart: (e) => {
        this.markerClass = 'ondrag-marker';
        this.onDrag = true;
      },
      dragend: (e) => {
        this.userLat = e.center.lat(); // set user lat
        this.userLng = e.center.lng(); // set user lng
        this.markerClass = '';

        console.log(this.userLat, this.userLng);
      }
    });
  }

  createTransaction(){
    // jangan lupa get token dari storage
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    const body = {
      'shipping_method': 'delivered',
      'meeting_point_id': null,
      'lat_delivery': this.userLat,
      'lng_delivery': this.userLng,
      'delivery_message': this.message,
      'books': this.checkoutItems
    };

    console.log(body);

    this.http.post('http://sebuku.livingpay.id/api/transaction/add', body, {headers}).subscribe((response) => {
      this.response = response;
      console.log(this.response);
    }, (err) => {
      this.response = err;
      console.log(this.response);
    });
  }

}
