import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

declare var GMaps;
declare var google;

@Component({
  selector: 'app-meeting-point',
  templateUrl: './meeting-point.page.html',
  styleUrls: ['./meeting-point.page.scss'],
})
export class MeetingPointPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  meetingPointSkeleton: boolean;
  selectedMeetingPoint: any;
  selectedPointMarker: any;
  meetingPoints: any = [];
  checkoutItems: any;
  mapClass: any;
  response: any;
  userLat: any;
  userLng: any;
  token: any;
  map: any;

  constructor(private checkoutData: CheckoutService, private storage: Storage, private http: HttpClient, private geolocation: Geolocation) {
    this.checkoutItems = this.checkoutData.getData();

    this.storage.get('token').then((val) => {
      this.token = val;

      this.getMeetingPoints();
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

  getMeetingPoints(){
    this.meetingPointSkeleton = true;
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    this.http.get('http://sebuku.livingpay.id/api/meeting-points', {headers}).subscribe((response) => {
      this.response = response;
      console.log(this.response);

      this.mappingMeetingPointsData(this.response.data.meeting_points);
      this.meetingPointSkeleton = false;
    }, (err) => {
      console.log(err);
      this.meetingPointSkeleton = false;
    });
  }

  mappingMeetingPointsData(meetingPoints){
    let arrayData = [];

    for (let i = 0; i < meetingPoints.length; i++) {
      arrayData.push(meetingPoints[i]);

      if (arrayData.length == 2) {
        this.meetingPoints.push(arrayData);
        arrayData = [];
      }
    }
  }

  selectMeetingPoint(meetingPoint){
    this.selectedMeetingPoint = meetingPoint;
    this.mapClass = "height-50";

    if (this.selectedPointMarker != null) {
      let latlng = new google.maps.LatLng(meetingPoint.lat, meetingPoint.lng);
      this.selectedPointMarker.setPosition(latlng);
    } else {
      this.selectedPointMarker = this.map.addMarker({
        lat: meetingPoint.lat,
        lng: meetingPoint.lng,
        title: meetingPoint.title
      });
    }

    let mapCenter = this.map.setCenter(meetingPoint.lat, meetingPoint.lng);
  }

  loadMap(){
    console.log(this.userLat, this.userLng);
    this.map = new GMaps({
      div: this.mapElement.nativeElement,
      lat: this.userLat,
      lng: this.userLng,
      zoom: 15,
      disableDefaultUI: true,
      dragend: (e) => {
        this.userLat = e.center.lat(); // set user lat
        this.userLat = e.center.lng(); // set user lng
      }
    });
  }

  createTransaction(){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + this.token);
    const body = {
      'shipping_method': 'meeting_point',
      'meeting_point_id': this.selectedMeetingPoint.id,
      'lat_delivery': this.selectedMeetingPoint.lat,
      'lng_delivery': this.selectedMeetingPoint.lng,
      'delivery_message': null,
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
