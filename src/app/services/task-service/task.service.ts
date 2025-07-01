import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Task } from '../../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private firebaseService = inject(FirebaseService);

  private activeTaskSignal = signal<Task | undefined>(undefined);
  readonly activeTask = this.activeTaskSignal.asReadonly();

  private editTaskSignal = signal<boolean>(false);
  readonly editTask = this.editTaskSignal.asReadonly();

  private allTasksSignal = signal<Task[]>([]);
  readonly allTasks = this.allTasksSignal.asReadonly();

  private addTaskColumnSignal = signal<string>('To do');
  readonly addTaskColumn = this.addTaskColumnSignal.asReadonly();


  setActiveTask(id: string) {
    this.activeTaskSignal.set(this.getTaskFromId(id));
  }
  
  
  resetActiveTask() {
    this.activeTaskSignal.set(undefined);
  }


  setEditTask(state: boolean) {
    this.editTaskSignal.set(state);
  }


  setAddTaskColumn(column: string) {
    this.addTaskColumnSignal.set(column);
  }


  subTaskCol() {
    return onSnapshot(this.firebaseService.getCollectionRef('tasks'), tasksCollection => {
      this.allTasksSignal.set([]);
      let tasks: Task[] = [];
      tasksCollection.forEach(task => {
        const data = new Task(task.data(), task.id);
        this.subSubtaskCol(data, task);
        tasks.push(data);
      });
      this.allTasksSignal.set([...tasks])
      // console.log('allTasks: ', this.allTasks());
    });
  }


  subSubtaskCol(data: Task, task: QueryDocumentSnapshot) {
    onSnapshot(this.firebaseService.getSubcollectionRef('tasks', task.id, 'subtasks'), subtasksCollection => {
      data.subtasks = subtasksCollection.docs.map(subtask => ({
        title: subtask.data()['title'],
        status: subtask.data()['status'],
        id: subtask.id
      }));
    });
  }


  // Hilfsfunktionen:
  getTaskFromId(id: string) {
    return this.allTasks().find(task => task.id === id);
  }

}
