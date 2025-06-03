import { Component } from '@angular/core';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from './card/card.component';
import { TaskInterface } from '../../interfaces/task.interface';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

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
      category: 'User Story',
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
        }
      ],
      contacts: [
        'Amelie Müller',
        'Hans Klein',
        'Max Mustermann',
        'Eva Gross'
      ]
    }
  ];


  getFilteredTasks(column: string): TaskInterface[] {
    return this.allTasks.filter(task => task.column === column);
  }

}
