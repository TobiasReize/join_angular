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
import { AddTaskFormComponent } from '../../shared/add-task-form/add-task-form.component';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent, CardComponent, CardDetailViewComponent, AddTaskFormComponent, ToastMsgComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  taskService = inject(TaskService);
  private firebaseService = inject(FirebaseService);
  private userService = inject(UserService);
  toastMsgService = inject(ToastMsgService);
  filteredTasks = this.taskService.allTasks;
  private currentDraggedTaskID = signal<string>('');
  dragOver = signal<string>('');
  addTaskVisible: boolean = false;
  addTaskClosed: boolean = false;
  selectedColumn: string = 'To do';


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


  showAddTaskOverlay(column: string) {
    this.selectedColumn = column;
    this.addTaskVisible = true;
    this.addTaskClosed = false;
  }


  closeAddTaskOverlay() {
    this.addTaskClosed = true;
    setTimeout(() => {
      this.addTaskVisible = false;
    }, 200);
  }


  async onSubmit(addTaskData: any) {
    const subtasks = addTaskData['subtasks'];
    addTaskData['column'] = this.selectedColumn;
    delete addTaskData['subtasks'];
    await this.firebaseService.addTask(addTaskData, subtasks);
    this.toastMsgService.showToastMsg('Task added to board');
    setTimeout(() => {
      this.toastMsgService.resetToastMsg();
    }, 2000);
    this.closeAddTaskOverlay();
  }


  // Hilfsfunktionen:
  getFilteredTasks(column: string): Task[] {
    return this.filteredTasks().filter(task => task.column === column);
  }

}
