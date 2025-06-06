import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { TaskInterface } from '../../interfaces/task.interface';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Task } from '../../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  firebaseService = inject(FirebaseService);

  private activeTaskSignal = signal<TaskInterface | null>(null);
  readonly activeTask = this.activeTaskSignal.asReadonly();

  private editTaskSignal = signal<boolean>(false);
  readonly editTask = this.editTaskSignal.asReadonly();

  private allTasksSignal = signal<TaskInterface[]>([]);
  readonly allTasks = this.allTasksSignal.asReadonly();


  setActiveTask(task: TaskInterface) {
    this.activeTaskSignal.set(task);
  }
  
  
  resetActiveTask() {
    this.activeTaskSignal.set(null);
  }


  setEditTask(state: boolean) {
    this.editTaskSignal.set(state);
  }


  subTaskCol() {
    return onSnapshot(this.firebaseService.getCollectionRef('tasks'), tasksCollection => {
      tasksCollection.forEach(task => {
        this.allTasksSignal().push(new Task(task.data()));
      });
    });
  }

}
