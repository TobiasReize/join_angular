import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { TaskService } from '../../services/task-service/task.service';
import { Task } from '../../models/task.class';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  private taskService = inject(TaskService);
  userService = inject(UserService);
  greetingVisible: boolean = true;
  greeting = signal<string>('');
  tasksToDo: Signal<number> = signal<number>(0);
  tasksDone: Signal<number> = signal(0);
  tasksUrgent: Signal<number> = signal<number>(0);
  tasksInProgress: Signal<number> = signal<number>(0);
  tasksAwaitFeedback: Signal<number> = signal<number>(0);
  allTasks: Signal<number> = signal<number>(0);
  upcomingDeadline: Signal<Task> = signal<Task>(new Task());
  deadlineDay: Signal<number> = signal<number>(0);
  deadlineMonth: Signal<number> = signal<number>(0);
  deadlineYear: Signal<number> = signal<number>(0);
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


  ngOnInit(): void {
    this.userService.checkCredentials();
    setTimeout(() => {
      this.greetingVisible = false;
    }, 1600);
    this.setKeyMetrics();
    this.setUpcomingDeadline();
    this.setDaytime();
  }


  setKeyMetrics() {
    this.tasksToDo = computed(() => this.taskService.allTasks().filter(task => task.column === 'To do').length);
    this.tasksDone = computed(() => this.taskService.allTasks().filter(task => task.column === 'Done').length);
    this.tasksUrgent = computed(() => this.taskService.allTasks().filter(task => task.priority === 'urgent').length);
    this.tasksInProgress = computed(() => this.taskService.allTasks().filter(task => task.column === 'In progress').length);
    this.tasksAwaitFeedback = computed(() => this.taskService.allTasks().filter(task => task.column === 'Await feedback').length);
    this.allTasks = computed(() => this.taskService.allTasks().length);
  }


  setUpcomingDeadline() {
    this.upcomingDeadline = computed(() => this.taskService.allTasks().filter(task => task.column !== 'Done').reduce((min, task) => {
      return new Date(task.date) < new Date(min.date) ? task : min;
    }, new Task({date: '2100-01-01'})));
    this.deadlineDay = computed(() => new Date(this.upcomingDeadline().date).getDate());
    this.deadlineMonth = computed(() => new Date(this.upcomingDeadline().date).getMonth());
    this.deadlineYear = computed(() => new Date(this.upcomingDeadline().date).getFullYear());
  }


  setDaytime() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return this.greeting.set('Good morning');
    } else if (hour >= 12 && hour < 18) {
      return this.greeting.set('Hello');
    } else if (hour >= 18) {
      return this.greeting.set('Good evening');
    } else {
      return this.greeting.set('Good night');
    }
  }

}
