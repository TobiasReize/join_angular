import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Task } from '../../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  firebaseService = inject(FirebaseService);

  private activeTaskSignal = signal<Task | undefined>(undefined);
  readonly activeTask = this.activeTaskSignal.asReadonly();

  private editTaskSignal = signal<boolean>(false);
  readonly editTask = this.editTaskSignal.asReadonly();

  private allTasksSignal = signal<Task[]>([]);
  readonly allTasks = this.allTasksSignal.asReadonly();


  setActiveTask(id: string) {
    this.activeTaskSignal.set(this.getTaskFromId(id));
  }


  getTaskFromId(id: string) {
    return this.allTasks().find(task => task.id === id);
  }
  
  
  resetActiveTask() {
    this.activeTaskSignal.set(undefined);
  }


  setEditTask(state: boolean) {
    this.editTaskSignal.set(state);
  }


  subTaskCol() {
    return onSnapshot(this.firebaseService.getCollectionRef('tasks'), tasksCollection => {
      this.allTasksSignal.set([]);
      tasksCollection.forEach(async task => {
        const data = new Task(task.data(), task.id);
        data.subtasks = [];
        const subtaskSnap = await this.firebaseService.getMultipleDocs(this.firebaseService.getSubcollectionRef('tasks', task.id, 'subtasks'));
        subtaskSnap.forEach(subtask => {
          const subtaskData = {
            title: subtask.data()['title'],
            status: subtask.data()['status']
          };
          data.subtasks.push(subtaskData);
        });
        this.allTasksSignal().push(data);
      });
      console.log('allTasks: ', this.allTasks());
    });
  }

}
