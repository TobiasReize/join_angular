import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unsubscribe } from '@angular/fire/firestore';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from './card/card.component';
import { Task } from '../../models/task.class';
import { TaskService } from '../../services/task-service/task.service';
import { CardDetailViewComponent } from './card-detail-view/card-detail-view.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { ContactService } from '../../services/contact-service/contact.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent, CardComponent, CardDetailViewComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {

  taskService = inject(TaskService);
  contactService = inject(ContactService);
  firebaseService = inject(FirebaseService);
  unsubTaskCol!: Unsubscribe;
  unsubContactCol!: Unsubscribe;


  ngOnInit(): void {
    this.unsubTaskCol = this.taskService.subTaskCol();
    this.unsubContactCol = this.contactService.subContactCol();
  }


  selectTask(id: string) {
    this.taskService.setActiveTask(id);
    // console.log('active Task:', this.taskService.getTaskFromId(id));
  }


  ngOnDestroy(): void {
    this.unsubTaskCol();
    this.unsubContactCol();
  }


  // Hilfsfunktionen:
  getFilteredTasks(column: string): Task[] {
    return this.taskService.allTasks().filter(task => task.column === column);
  }

}
