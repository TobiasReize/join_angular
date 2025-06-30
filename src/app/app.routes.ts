import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { SummaryComponent } from './features/summary/summary.component';
import { AddTaskComponent } from './features/add-task/add-task.component';
import { BoardComponent } from './features/board/board.component';
import { ContactComponent } from './features/contact/contact.component';
import { HelpComponent } from './features/help/help.component';
import { ImprintComponent } from './features/imprint/imprint.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'addtask', component: AddTaskComponent },
    { path: 'board', component: BoardComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'help', component: HelpComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
