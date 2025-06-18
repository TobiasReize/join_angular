import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from './card/card.component';
import { Task } from '../../models/task.class';
import { TaskService } from '../../services/task-service/task.service';
import { CardDetailViewComponent } from './card-detail-view/card-detail-view.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
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
  private firebaseService = inject(FirebaseService);
  private userService = inject(UserService);
  filteredTasks = this.taskService.allTasks;
  private currentDraggedTaskID = signal<string>('');
  dragOver = signal<string>('');


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


  startDragging(taskId: string) {
    this.currentDraggedTaskID.set(taskId);
  }


  allowDrop(event: DragEvent, column: string) {
    event.preventDefault();
    this.dragOver.set(column);
  }


  removeHighlight() {
    this.dragOver.set('');
  }


  moveTo(column: string) {
    const data = {column: column};
    this.dragOver.set('');
    this.firebaseService.updateDocData('tasks', this.currentDraggedTaskID(), data);
  }


  // Hilfsfunktionen:
  getFilteredTasks(column: string): Task[] {
    return this.filteredTasks().filter(task => task.column === column);
  }

}
