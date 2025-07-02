import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { UserService } from '../../services/user-service/user.service';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { AddTaskFormComponent } from '../../shared/add-task-form/add-task-form.component';
import { TaskService } from '../../services/task-service/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, ToastMsgComponent, AddTaskFormComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {

  toastMsgService = inject(ToastMsgService);
  private userService = inject(UserService);
  private firebaseService = inject(FirebaseService);
  private router = inject(Router);
  private taskService = inject(TaskService);


  ngOnInit(): void {
    this.userService.checkCredentials();
  }


  async onSubmit(addTaskData: any) {
    const subtasks = addTaskData['subtasks'];
    addTaskData['column'] = this.taskService.addTaskColumn();
    delete addTaskData['subtasks'];
    await this.firebaseService.addTask(addTaskData, subtasks);
    this.toastMsgService.showToastMsg('Task added to board');
    setTimeout(() => {
      this.toastMsgService.resetToastMsg();
      this.router.navigateByUrl('board');
    }, 1500);
  }

}
