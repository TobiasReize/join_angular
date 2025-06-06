import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Unsubscribe } from '@angular/fire/firestore';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from './card/card.component';
import { TaskInterface } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task-service/task.service';
import { CardDetailViewComponent } from './card-detail-view/card-detail-view.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent, CardComponent, CardDetailViewComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {

  taskService = inject(TaskService);
  firebaseService = inject(FirebaseService);
  unsubTaskCol!: Unsubscribe;
  
  allTasks: TaskInterface[] = [
    {
      column: 'In progress',
      category: 'User Story',
      title: 'Kochwelt Page',
      description: 'Build start page with recipe recommendation',
      date: '2025-06-21',
      priority: 'low',
      subtasks: [
        {
          title: 'Subtask 1',
          status: 'open'
        },
        {
          title: 'Subtask 2',
          status: 'done'
        }
      ],
      contacts: [
        'Max Mustermann',
        'Hans Klein',
        'Amelie Müller'
      ]
    },
    {
      column: 'Await feedback',
      category: 'Technical Task',
      title: 'Kochwelt Page',
      description: 'Build start page with recipe recommendation',
      date: '2025-07-13',
      priority: 'urgent',
      subtasks: [
        {
          title: 'Subtask 1',
          status: 'done'
        },
        {
          title: 'Subtask 2',
          status: 'done'
        },
        {
          title: 'Subtask 3',
          status: 'done'
        }
      ],
      contacts: [
        'Amelie Müller',
        'Hans Klein',
        'Max Mustermann',
        'Eva Gross',
        'Kim Lanig',
        'Xaver Super'
      ]
    }
  ];


  ngOnInit(): void {
    this.unsubTaskCol = this.taskService.subTaskCol();
    console.log('allTasks: ', this.taskService.allTasks());
  }


  selectTask(task: TaskInterface) {
    this.taskService.setActiveTask(task);
    console.log('active Task:', task);
  }


  ngOnDestroy(): void {
    this.unsubTaskCol();
  }


  // Hilfsfunktionen:
  getFilteredTasks(column: string): TaskInterface[] {
    return this.allTasks.filter(task => task.column === column);
  }

}
