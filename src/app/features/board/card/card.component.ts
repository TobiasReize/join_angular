import { Component, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.class';
import { ContactService } from '../../../services/contact-service/contact.service';
import { FirebaseService } from '../../../services/firebase-service/firebase.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  contactService = inject(ContactService);
  private firebaseService = inject(FirebaseService);
  @Input() task!: Task;
  @Input() column!: 'To do' | 'In progress' | 'Await feedback' | 'Done';
  columns = ['To do', 'In progress', 'Await feedback', 'Done'];
  swapOverlayVisible: boolean = false;
  previous: string = '';
  next: string = '';


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.swapOverlayVisible = false;
  }


  showSwapOverlay(event: Event) {
    event.stopPropagation();
    this.swapOverlayVisible = true;
    const index = this.columns.indexOf(this.task.column);
    this.setColumns(index);
  }


  setColumns(index: number) {
    if (index - 1 < 0) {
      this.previous = '-';
      this.next = 'In progress';
    } else if (index + 1 > 3) {
      this.next = '-';
      this.previous = 'Await feedback';
    } else {
      this.previous = this.columns[index - 1];
      this.next = this.columns[index + 1];
    }
  }


  moveTo(column: string) {
    if (column != '-') {
      const data = {column: column};
      this.firebaseService.updateDocData('tasks', this.task.id, data);
    }
    this.swapOverlayVisible = false;
  }


  // Hilfsfunktionen:
  getSubtasksDone(task: Task): number {
    return task.subtasks.filter(subtask => subtask.status === 'done').length;
  }

}
