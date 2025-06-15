import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Unsubscribe } from '@angular/fire/firestore';
import { TaskService } from './services/task-service/task.service';
import { ContactService } from './services/contact-service/contact.service';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'join_angular';

  taskService = inject(TaskService);
  contactService = inject(ContactService);
  userService = inject(UserService);
  unsubTaskCol!: Unsubscribe;
  unsubContactCol!: Unsubscribe;
  unsubUserCol!: Unsubscribe;


  ngOnInit(): void {
    this.unsubTaskCol = this.taskService.subTaskCol();
    this.unsubContactCol = this.contactService.subContactCol();
    this.unsubUserCol = this.userService.subUserCol();
  }


  ngOnDestroy(): void {
    this.unsubTaskCol();
    this.unsubContactCol();
    this.unsubUserCol();
  }

}
