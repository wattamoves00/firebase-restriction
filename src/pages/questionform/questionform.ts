import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Category } from '../../fireframe2/category';
import { Post } from '../../fireframe2/post';
import { questionData } from '../../shared/shared';
/*
  Generated class for the Questionform page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questionform',
  templateUrl: 'questionform.html'
})
export class QuestionformPage {
  questionID
  contents;
  question = questionData;
  track;
  constructor(
    private navCtrl: NavController,
    private category: Category,
    private questionPost: Post,
    private navPar: NavParams
  ) {
    this.questionID = this.navPar.get('questionID');
    console.log('question ID', this.questionID);

    console.log(this.questionID)

    // for ( let i = 1; i < 21; i ++ ) {
    //   this.questionPost.path = 'question';
    //   this.questionPost
    //     .set('question', 'Question No. ' + i )
    //     .set('choice1', 'choice a. ' + i)
    //     .set('choice2', 'choice b. ' + i)
    //     .set('choice3', 'choice c. ' + i)
    //     .set('choice4', 'choice d. ' + i)
    //     .set('answer', 'answer. ' + i)
    //     .create( () => {
    //       console.log('question: ' + i + ' created !!');
    //     }, e => {
    //       console.log(e)
    //     })
    // }

    // this.questionCategory()
    


  }

  ionViewWillEnter() {
    console.log('Hello QuestionformPage Page');
    this.questionCategory(); //creates category
    this.displayQuestions();
  }

  questionCategory( ) {
    this.category
      .set( 'key', 'questions' )
      .set( 'name', 'questions' )
      .set( 'title', 'Questions' )
      .set( 'description', 'questions for quiz app' )
      .create( () => {
      }, e => {

        console.log(e)
      });
  }

  onClickReset(){
    this.question.question = '';
    this.question.choice1 = '';
    this.question.choice2 = '';
    this.question.choice3 = '';
    this.question.choice4 = '';
    this.question.answer = '';
  }

  displayQuestions() {
    if ( this.questionID ) {
      this.questionPost.path = 'question';
      this.questionPost
        .set('key', this.questionID )
        .get( re => {
          this.question = re;
        }, e => alert(e) );
    }

  }

  get questions() {
    if ( this.contents === void 0 ) return [];
    return Object.keys( this.contents );
  }

  validateForm() {
    if ( this.question.question == '' ) {
      this.track = { error: 'No Question' };
      return false;
    }else if( this.question.answer == '' ){
      this.track = { error: 'Input answer' }
      return false;
    }
    return true;
  }
  onClickCreate(){
    if ( this.validateForm() == false ) return;
    this.track = { progress: 'Updating ...' };
    this.questionPost
      .sets(this.question)
      .create( () => {
        this.track = { success: 'Update success!' };
        this.onClickReset()
      }, e => {
        console.log(e)
        this.track = { error: e };
      });

    console.log(this.question.answer)
  }
  onClickUpdate() {
    if ( this.validateForm() == false ) return;
    this.track = { progress: 'Updating ...' };
    this.questionPost.path = 'question';
    this.questionPost
      .set( 'key', this.questionID )
      .set( 'question', this.question.question )
      .set( 'choice1', this.question.choice1 )
      .set( 'choice2', this.question.choice2 )
      .set( 'choice3', this.question.choice3 )
      .set( 'choice4', this.question.choice4 )
      .set( 'answer', this.question.answer )
      .update( () => {
        // this.onClickBack();
        this.track = { success: 'Update success!' };
      },e=>{
        console.log(e)
        this.track = { error: e };
      })
  }

  onClickBack(){
    this.navCtrl.pop();
  }

}
