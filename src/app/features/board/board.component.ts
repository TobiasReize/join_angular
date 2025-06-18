import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from './card/card.component';
import { Task } from '../../models/task.class';
import { TaskService } from '../../services/task-service/task.service';
import { CardDetailViewComponent } from './card-detail-view/card-detail-view.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { ContactService } from '../../services/contact-service/contact.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent, CardComponent, CardDetailViewComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  taskService = inject(TaskService);
  contactService = inject(ContactService);
  firebaseService = inject(FirebaseService);
  userService = inject(UserService);
  filteredTasks = this.taskService.allTasks;


  ngOnInit(): void {
    this.userService.checkCredentials();
  }


  selectTask(id: string) {
    this.taskService.setActiveTask(id);
  }


  filterTasks(searchTerm: string) {
    if (searchTerm.length > 2) {
      const term = searchTerm.trim().toLowerCase();
      this.filteredTasks = signal(this.taskService.allTasks().filter(task => task.title.trim().toLowerCase().includes(searchTerm) || task.description.trim().toLowerCase().includes(searchTerm)));
    } else {
      this.filteredTasks = this.taskService.allTasks;
    }
  }


  // Hilfsfunktionen:
  getFilteredTasks(column: string): Task[] {
    return this.filteredTasks().filter(task => task.column === column);
  }

}
