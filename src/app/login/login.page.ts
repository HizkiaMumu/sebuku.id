import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginSection: any = true;
  registerSection: any = false;
  nama: any;
  tanggal_lahir: any;
  no_hp: any;
  alamat_rumah: any;
  alamat_instansi: any;
  email: any;
  password: any;
  loginEmail: any;
  loginPassword: any;
  response: any;
  loginErr: any;

  constructor(private navCtrl: NavController, private http: HttpClient, public alertController: AlertController, private storage: Storage, private googlePlus: GooglePlus, private fb: Facebook) { }

  ngOnInit() {
  }

  pushHomePage(){
    this.navCtrl.navigateForward('/home');
  }

  showLoginSection(){
    this.loginSection = true;
    this.registerSection = false;
  }

  showRegisterSection(){
    this.registerSection = true;
    this.loginSection = false;
  }

  pushForgotPasswordPage(){
    this.navCtrl.navigateForward('/forgot-password');
  }

  loginUser(){
    let user = {
      email: this.loginEmail,
      password: this.loginPassword
    }

    this.http.post('http://sebuku.livingpay.id/api/sign-in', user).subscribe((response) => {
      this.response = response;
      this.storage.set('user', this.response.user);
      this.storage.set('token', this.response.token);
      console.log(response);
      this.pushHomePage();
    }, (err) => {
      this.response = err;
      if (this.response.error.error == "invalid_credentials") {
        console.log('Email atau password yang anda masukan salah.');
        this.loginErr = 'Email atau password yang anda masukan salah.';
      } else {
        console.log('Telah terjadi kesalahan yang tidak diketahui, harap coba lagi nanti.');
        this.loginErr = 'Telah terjadi kesalahan yang tidak diketahui, harap coba lagi nanti.';
      }
    });
  }

  googleLogin(){
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  facebookLogin(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
  }

  async registerUser(){
    let user = {
      nama: this.nama,
      tanggal_lahir: this.tanggal_lahir,
      no_hp: this.no_hp,
      alamat_rumah: this.alamat_rumah,
      alamat_instansi: this.alamat_instansi,
      email: this.email,
      password: this.password,
    }

    this.http.post('http://sebuku.livingpay.id/api/sign-up', user).subscribe((response) => {
      console.log(response);
      this.showLoginSection();
      this.alertSuccess('Berhasil mendaftarkan akun, silahkan login');
    });
  }

  async alertSuccess(message){
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
