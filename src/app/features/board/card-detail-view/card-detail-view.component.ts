import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task-service/task.service';

@Component({
  selector: 'app-card-detail-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail-view.component.html',
  styleUrl: './card-detail-view.component.scss'
})
export class CardDetailViewComponent {

  taskService = inject(TaskService);


  deselectTask() {
    this.taskService.resetActiveTask();
  }


  getInitials(contact: string): string {
    return contact.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
  }


  firstLetterUppercase(word: string | undefined): string {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return '';
    }
  }

}
