import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginPage } from '../login/login'
import { User } from '../../fireframe2/user';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public user: User
    ) {
      this.user.loggedIn( (userData) => {
        console.log('HomePage::constructor() user.loggedIn() : yes : userData : ', userData);
        this.navCtrl.setRoot( DashboardPage );
      }, e => this.navCtrl.setRoot( LoginPage ) );
    }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

}
