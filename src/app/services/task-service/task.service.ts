import { Injectable, signal } from '@angular/core';
import { TaskInterface } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private activeTaskSignal = signal<TaskInterface | null>(null);
  readonly activeTask = this.activeTaskSignal.asReadonly();

  private editTaskSignal = signal<boolean>(false);
  readonly editTask = this.editTaskSignal.asReadonly();


  setActiveTask(task: TaskInterface) {
    this.activeTaskSignal.set(task);
  }
  
  
  resetActiveTask() {
    this.activeTaskSignal.set(null);
  }


  setEditTask(state: boolean) {
    this.editTaskSignal.set(state);
  }

}
