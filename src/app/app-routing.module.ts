import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './comps/questions/questions.component';
import {WelcomeComponent} from  "./comps/welcome/welcome.component";

const routes: Routes = [
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:"welcome",component:WelcomeComponent},
  {path:"questions",component:QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
