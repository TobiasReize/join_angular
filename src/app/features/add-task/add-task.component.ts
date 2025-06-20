import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { UserService } from '../../services/user-service/user.service';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { AddTaskFormComponent } from '../../shared/add-task-form/add-task-form.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, ToastMsgComponent, AddTaskFormComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {

  toastMsgService = inject(ToastMsgService);
  userService = inject(UserService);
  firebaseService = inject(FirebaseService);
  router = inject(Router);


  ngOnInit(): void {
    this.userService.checkCredentials();
  }


  async onSubmit(addTaskData: any) {
    const subtasks = addTaskData['subtasks'];
    addTaskData['column'] = 'To do';
    delete addTaskData['subtasks'];
    await this.firebaseService.addTask(addTaskData, subtasks);
    this.toastMsgService.showToastMsg('Task added to board');
    setTimeout(() => {
      this.toastMsgService.resetToastMsg();
      this.router.navigateByUrl('board');
    }, 1500);
  }

}
