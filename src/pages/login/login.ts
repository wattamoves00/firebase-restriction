import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { User, USER_DATA } from "../../fireframe2/user";

interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {

  errorChk;

  userData = <userMeta> {};
  regUserMail:string;
  regUserPass:string;

  loginUserMail:string;
  loginUserPass:string;

  authentication: string = 'login';

  constructor(
    public navCtrl: NavController,
    private user: User,
    private toastCtrl: ToastController
  ) {
    this.checkUser();
  }


// observable
//  checks anfularfire auth if user is logged in.
  checkUser() {
    this.user.loggedIn( (userData) => {
      this.navCtrl.setRoot( DashboardPage );
    }, e => console.error( e ) );
  }

  onClickTest(){

  }

  onClickReset(){
    this.userData.email = undefined;
    this.userData.password = undefined;
    this.userData.displayName = undefined;
  }
  ionViewWillEnter(){
    // this.checkUser();
  }
  ionViewDidLoad(){
   
  }
  onClickLogin(){
    if ( this.validateForm() == false ) return;
    this.errorChk = { progress: 'Signing in .. ' };
    this.user
      .set('email', this.loginUserMail)
      .set('password', this.loginUserPass)
      .login( re => {
        this.errorChk = { success: 'Sign in sucess: redirecting to dashboard ..'}
        this.navCtrl.setRoot( DashboardPage );
      }, e => {
        this.errorChk = { error: e }
        
        let failToast = this.toastCtrl.create({
          message: e,
          duration: 1500
        })
        failToast.present();
      });
  }
  onClickRegister(){
    if ( this.validateForm() == false ) return;
    this.errorChk = { progress: 'Registration on progress: please wait..' };
    this.user
     .sets(this.userData)
     .register(
        ( ) => {this.alert('User registration success')
      this.errorChk = { success: 'Registration success'}},
        (e) => {
          
          this.errorChk = { error: e }
      } );
        
  }
  alert(e) {
    this.errorChk = { error: e }
    this.toastCtrl.create({ message: e, duration: 1500 }).present();
  }

    validateForm() {
    if ( this.loginUserMail == '' || this.userData.email =='' ) {
      this.errorChk = { error: 'Input user email' };
      return false;
    }else if( this.loginUserPass == '' || this.userData.password == '' ){
      this.errorChk = { error: 'Input Password' }
      return false;
    }
    return true;
  }

  clearError(){
    this.errorChk = {};
  }
}
