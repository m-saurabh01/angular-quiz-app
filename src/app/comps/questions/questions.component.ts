import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {


  public name:string="";
  public questionList:any=[];
  public currQues:number=0;
  public points:number=0;
  counter=60;
  correctAns:number=0;
  IncorrectAns:number=0;
  interval$:any;
  progress:string="0";
  isQuizCompleted:boolean=false;


  constructor(private questionService:QuestionsService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{
      this.questionList=res.questions;
    });}

    nextQues(){
      this.currQues++;
    }

    prevQues(){
      this.currQues--;
    }

    answer(currQues:number,option:any){

      if(currQues===this.questionList.length){
        this.isQuizCompleted=true;
        
      }

      if(option.correct){
        this.points +=10;
        this.correctAns++;
        setTimeout(() => {
        this.currQues++;
        this.resetCounter();
        this.getProgress();
        }, 1000);
      }
      else{
        setTimeout(() => {
        this.currQues++;
        this.IncorrectAns++;
        this.resetCounter();
        this.getProgress();
        }, 1000);

        this.points -=5;
        

      }

    }

    startCounter(){
      this.interval$=interval(1000).subscribe(val=>{
        this.counter--;
        if(this.counter==0){
          this.currQues++;
          this.counter=60;
          this.points-=5;
        }
      });

      setTimeout(()=>{
        this.interval$.unsubscribe();

      },600000);

    }

    stopCounter(){
      this.interval$.unsubscribe();
      this.counter=0;
      
    }

    resetCounter(){
      this.stopCounter();
      this.counter=60;
      this.startCounter();
      
    }

    resetQuiz(){
      
      this.getAllQuestions();
      this.points=0;
      this.counter=60;
      this.currQues=0;
      this.resetCounter();
      this.progress="0";
    }

    getProgress(){
      this.progress=((this.currQues/this.questionList.length)*100).toString();
      return this.progress;
    }
    

  }


