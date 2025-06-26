import { Component, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../../services/task-service/task.service';
import { Contact } from '../../../models/contact.class';
import { ContactService } from '../../../services/contact-service/contact.service';
import { FirebaseService } from '../../../services/firebase-service/firebase.service';
import { Task } from '../../../models/task.class';

@Component({
  selector: 'app-card-detail-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-detail-view.component.html',
  styleUrl: './card-detail-view.component.scss'
})
export class CardDetailViewComponent implements OnInit {

  taskService = inject(TaskService);
  contactService = inject(ContactService);
  private firebaseService = inject(FirebaseService);
  activeTask: Task = new Task();
  contactsVisible: boolean = false;
  taskClosed: boolean = false;
  subtaskAddable: boolean = false;
  selectedPriority: string = '';
  filteredContacts = this.contactService.allContacts;
  selectedContacts: string[] = [];
  addedSubtasks: any[] = [];
  deletedSubtasks: string[] = [];
  @ViewChild('subtaskInput') subtaskInputRef!: ElementRef;
  editedSubtaskIndex: number | null = null;
  editedSubtaskTitle: string = '';
  minDate: string = '';


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.contactsVisible = false;
  }


  ngOnInit(): void {
    this.activeTask = this.taskService.activeTask() ?? new Task();
    this.selectedContacts = [...this.taskService.activeTask()?.contacts ?? []];
    this.addedSubtasks = [...this.taskService.activeTask()?.subtasks ?? []];
    this.selectedPriority = structuredClone(this.taskService.activeTask()?.priority ?? '');
  }


  closeTask() {
    this.taskClosed = true;
    setTimeout(() => {
      this.taskService.resetActiveTask();
      this.taskService.setEditTask(false);
    }, 200);
  }


  editTask() {
    this.taskService.setEditTask(true);
  }


  async deleteTask() {
    await this.firebaseService.deleteTask(this.activeTask.id);
    this.closeTask();
  }


  toggleCheckbox(subtaskId: string) {
    const currentTask = this.activeTask;
    if (currentTask) {
      const currentSubtask = currentTask.subtasks.find(subtask => subtask.id === subtaskId);
      if (currentSubtask) {
        const newStatus = currentSubtask.status === 'open' ? 'done' : 'open';
        const data = {
          title: currentSubtask.title,
          status: newStatus
        };
        this.firebaseService.updateDocData(`tasks/${currentTask.id}/subtasks`, currentSubtask.id, data);
      }
    }
  }


  setMinDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
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


  selectContact(contact: Contact) {
    const index = this.selectedContacts.indexOf(contact.id);
    if (index == -1) {
      this.selectedContacts.push(contact.id);
    } else {
      this.selectedContacts.splice(index, 1);
    }
  }


  filterContacts(searchTerm: string) {
    const term = searchTerm.trim().toLowerCase();
    this.filteredContacts = signal(this.contactService.allContacts().filter(contact => contact.name.trim().toLowerCase().includes(term)));
  }


  checkSubtask(subtask: string) {
    if (subtask.length > 2) {
      this.subtaskAddable = true;
    } else {
      this.subtaskAddable = false;
    }
  }


  addSubtask(subtaskInput: string) {
    this.addedSubtasks.push({title: subtaskInput, status: 'open'});
    this.clearSubtask();
  }


  clearSubtask() {
    this.subtaskInputRef.nativeElement.value = '';
    this.subtaskAddable = false;
  }


  deleteSubtask(index: number) {
    if (this.addedSubtasks[index]['id']) {
      this.deletedSubtasks.push(this.addedSubtasks[index]['id']);
    }
    this.addedSubtasks.splice(index, 1);
    this.editedSubtaskIndex = null;
  }


  editSubtask(index: number) {
    this.editedSubtaskIndex = index;
    this.editedSubtaskTitle = this.addedSubtasks[index]['title'];
  }


  saveSubtask(index: number) {
    this.addedSubtasks[index]['title'] = this.editedSubtaskTitle;
    this.editedSubtaskIndex = null;
  }


  onSubmit(editTaskForm: NgForm) {
    if (editTaskForm.submitted && editTaskForm.valid) {
      const taskData = {
        title: editTaskForm.value.title,
        description: editTaskForm.value.description,
        date: editTaskForm.value.date,
        priority: this.selectedPriority,
        contacts: [...this.selectedContacts]
      }
      this.firebaseService.updateTask(this.activeTask.id, taskData, this.addedSubtasks, this.deletedSubtasks);
      this.closeTask();
    } else {
      console.log('Fehler!');
    }
  }


  // Hilfsfunktionen:
  firstLetterUppercase(word: string | undefined): string {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return '';
    }
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
