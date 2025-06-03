import { Component, Input } from '@angular/core';
import { TaskInterface } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() task!: TaskInterface;
  @Input() column!: 'To do' | 'In progress' | 'Await feedback' | 'Done';
  

  getSubtasksDone(task: TaskInterface): number {
    return task.subtasks.filter(subtask => subtask.status === 'done').length;
  }


  getInitials(contact: string): string {
    return contact.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
  }

}
