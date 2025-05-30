import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { SummaryComponent } from './features/summary/summary.component';
import { AddTaskComponent } from './features/add-task/add-task.component';
import { BoardComponent } from './features/board/board.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'addtask', component: AddTaskComponent },
    { path: 'board', component: BoardComponent },
];
