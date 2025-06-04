import { Injectable, signal } from '@angular/core';
import { TaskInterface } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private activeTaskSignal = signal<TaskInterface | null>(null);
  readonly activeTask = this.activeTaskSignal.asReadonly();


  setActiveTask(task: TaskInterface) {
    this.activeTaskSignal.set(task);
  }
  
  
  resetActiveTask() {
    this.activeTaskSignal.set(null);
  }

}
