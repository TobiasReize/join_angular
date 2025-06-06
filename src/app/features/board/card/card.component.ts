import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInterface } from '../../../interfaces/task.interface';
import { Contact } from '../../../models/contact.class';
import { ContactService } from '../../../services/contact-service/contact.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() task!: TaskInterface;
  @Input() column!: 'To do' | 'In progress' | 'Await feedback' | 'Done';
  contactService = inject(ContactService);


  getSubtasksDone(task: TaskInterface): number {
    return task.subtasks.filter(subtask => subtask.status === 'done').length;
  }


  getInitials(contact: Contact | undefined): string {
    if (contact) {
      return contact.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    } else {
      return '';
    }
  }

}
