import { CheckoutService } from '../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.page.html',
  styleUrls: ['./shipping-method.page.scss'],
})
export class ShippingMethodPage implements OnInit {

  checkoutItems: any;

  constructor(private navCtrl: NavController, private checkoutData: CheckoutService) {
    this.checkoutItems = this.checkoutData.getData();
    console.log('--- checkout data ---');
    console.log(this.checkoutItems);
    console.log('--- end checkout data ---');
  }

  ngOnInit() {
  }

  pushDeliveryPage(){
    this.navCtrl.navigateForward('/delivery');
  }

  pushMeetingPointPage(){
    this.navCtrl.navigateForward('/meeting-point');
  }

}
