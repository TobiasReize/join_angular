import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task-service/task.service';
import { Contact } from '../../../models/contact.class';
import { ContactService } from '../../../services/contact-service/contact.service';

@Component({
  selector: 'app-card-detail-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail-view.component.html',
  styleUrl: './card-detail-view.component.scss'
})
export class CardDetailViewComponent {

  taskService = inject(TaskService);
  contactService = inject(ContactService);
  selectedPriority: 'low' | 'medium' | 'urgent' = 'medium';
  contactsVisible: boolean = false;


  deselectTask() {
    this.taskService.resetActiveTask();
    this.taskService.setEditTask(false);
  }


  editTask() {
    this.taskService.setEditTask(true);
  }


  choosePriority(priority: 'low' | 'medium' | 'urgent') {
    this.selectedPriority = priority;
  }


  toggleContactOverlay(event: Event, state?: 'visible') {
    if (state == 'visible') {
      event.stopPropagation();
      this.contactsVisible = true;
    } else {
      this.contactsVisible = !this.contactsVisible;
      event.stopPropagation();
    }
  }


  getInitials(contact: Contact | undefined): string {
    if (contact) {
      return contact.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    } else {
      return '';
    }
  }


  firstLetterUppercase(word: string | undefined): string {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return '';
    }
  }

}
