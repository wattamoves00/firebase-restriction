import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform';
import { LoginPage } from '../login/login';
import {Post} from "../../fireframe2/post";
import { User, USER_DATA } from '../../fireframe2/user';

//import { LoginPage } from '../login/login';
//import { AngularFire, FirebaseAuth } from 'angularfire2';


interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  searchBar:string = '';
  lastDisplayedKey: string = '';
  userName;
  userData = <userMeta> {};
  uid;
  more = [];
  questionID;
  contents = [];
  choice
  questions = [];
  constructor(
    private navCtrl: NavController,
    private question: Post,
    private user: User

  ) {
    // this.onDestroy();
  }

    checkUser(){
      this.user.loggedIn( (userData) => {
        this.uid = userData.uid;
        this.user.set('key', this.uid).get( user =>{
          this.userName = user.displayName;
        }, e=>{})
      }, e => alert('Login : ' + e ) );

  }

  onDestroy(){
    this.question.path='question';
          this.question.destroy( () => {
        }, e => {
           console.log('error:' + e)
        });
  }

  getItems(ev) {
     if(this.searchBar == ''){
      this.getQuestions();
      return;
    }
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.questions = this.questions.filter( res => {
        return ( res.value.question.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      }, e=>{console.log('error')})
    }

   

  }


  ionViewWillEnter() {
    //console.log('ionViewWillEnter()');
    this.getQuestions();
    this.checkUser();
  }

  testResign(){
    this.user.resign( s=>{console.log(s)}, e=>console.error(e) )
  }
  
  onClickAdd(){
    this.navCtrl.push( QuestionformPage );
  }

  onSlideItem(id){
    // console.log('Slide ok')
    this.more[id] = null;
  }

  displayQuestions(data?) {
    this.lastDisplayedKey = Object.keys(data).shift();
    Object.keys(data).pop();

    console.log(this.questions);
    let lastData =[]
    console.log('Last data'+ lastData);
    for ( let key in data ) {
     lastData.unshift({'key': key, value: data[key]});
    }
    for( let key in lastData){
      this.questions.push(lastData[key])
    }

  }


  
  getQuestions( finished? ) {
    this.question.path = 'question'
    this.question
      .set('lastKey', this.lastDisplayedKey )
      .set('limitToLast', '11' )
      .fetch( snapshot =>{
        if(snapshot) this.displayQuestions( snapshot );
        if ( finished ) finished();
      }, e=>{
        if ( finished ) finished();
        console.info(e);
      })
  }

  doInfinite( infiniteScroll ) {

    this.getQuestions( () => {
      infiniteScroll.complete();
    });

  }


  onClickChoice(ansTest, answer){
    console.log(ansTest);
    if( ansTest == answer)console.log('correct');
    else console.log('incorrect');
  }

  onClickLogout(){
    this.user.logout( () => {
      this.userData = null
      this.navCtrl.setRoot( LoginPage )
  } );
  }

  onClickUpdate(id){
    this.navCtrl.push( QuestionformPage, {
      questionID: id
    })
  }
  
  onClickDelete(key){
    this.question.set('key', key);
    this.question.delete( s => {
      if ( s ) alert('Error: ' + s);
      else {
        console.log('success: removing from content');
        this.contents = [];
        this.displayQuestions();
      }
    }, e => {
      alert('Error: ' + e);
    });
  }

}
