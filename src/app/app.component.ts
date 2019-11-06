import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Transaksi',
      url: '/transaction',
      icon: 'card'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.storage.get('token').then((val) => {
        let token = val;
        const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        this.http.get('http://sebuku.livingpay.id/api/check-token', {headers}).subscribe((response) => {
          this.router.navigateByUrl('/home');
          this.splashScreen.hide();
        }, (err) => {
          this.router.navigateByUrl('/login');
          this.splashScreen.hide();
        });
      });
    });
  }

  logout(){
    this.storage.remove('token');
    this.storage.remove('user');
    this.navCtrl.navigateRoot('/login');
  }
}
