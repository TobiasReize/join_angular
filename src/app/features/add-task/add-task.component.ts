import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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


  async onSubmit(addTaskForm: NgForm) {
    // if (addTaskForm.submitted && addTaskForm.valid) {
    //   const contactIds = this.selectedContacts.map(contact => contact.id);
    //   const taskData = {
    //     column: 'To do',
    //     category: this.selectedCategory,
    //     title: addTaskForm.value.title,
    //     description: addTaskForm.value.description,
    //     date: addTaskForm.value.date,
    //     priority: this.selectedPriority,
    //     contacts: [...contactIds]
    //   }
    //   await this.firebaseService.addTask(taskData, this.addedSubtasks)
    //   this.clearForm(addTaskForm);
    //   this.toastMsgService.showToastMsg('Task added to board');
    //   setTimeout(() => {
    //     this.toastMsgService.resetToastMsg();
    //     this.router.navigateByUrl('board');
    //   }, 1500);
    // } else {
    //   console.log('Form invalid!!!');
    //   console.log('addTaskForm: ', addTaskForm);
    // }
  }

}
