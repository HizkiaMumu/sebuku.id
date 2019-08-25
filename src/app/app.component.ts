import { Component } from '@angular/core';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
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
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.storage.get('token').then((val) => {
        let token = val;
        const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        this.http.get('http://192.168.1.6:8000/api/check-token', {headers}).subscribe((response) => {
          this.router.navigateByUrl('/home');
        }, (err) => {
          this.router.navigateByUrl('/login');
        });
      });
      this.splashScreen.hide();
    });
  }
}
