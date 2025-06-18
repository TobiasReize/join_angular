import { Component, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';
import { ContactService } from '../../services/contact-service/contact.service';
import { Contact } from '../../models/contact.class';
import { UserService } from '../../services/user-service/user.service';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, SidenavComponent, HeaderComponent, ToastMsgComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {

  toastMsgService = inject(ToastMsgService);
  contactService = inject(ContactService);
  userService = inject(UserService);
  firebaseService = inject(FirebaseService);
  router = inject(Router);
  selectedPriority: 'low' | 'medium' | 'urgent' = 'medium';
  selectedCategory: string = '';
  contactsVisible: boolean = false;
  categoriesVisible: boolean = false;
  subtaskAddable: boolean = false;
  editedSubtaskIndex: number | null = null;
  editedSubtaskContent: string = '';
  minDate: string = '';
  @ViewChild('subtaskInput') subtaskInputRef!: ElementRef;
  categories: string[] = [
    'Technical Task',
    'User Story',
    'Bug Fix'
  ];
  selectedContacts: Contact[] = [];
  filteredContacts = this.contactService.allContacts;
  addedSubtasks: any[] = [];


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.categoriesVisible = false;
    this.contactsVisible = false;
  }


  ngOnInit(): void {
    this.userService.checkCredentials();
    this.setMinDate();
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
    const index = this.selectedContacts.indexOf(contact);
    if (index == -1) {
      this.selectedContacts.push(contact);
    } else {
      this.selectedContacts.splice(index, 1);
    }
  }


  filterContacts(searchTerm: string) {
    const term = searchTerm.trim().toLowerCase();
    this.filteredContacts = signal(this.contactService.allContacts().filter(contact => contact.name.trim().toLowerCase().includes(term)));
  }


  toggleCategoryOverlay(event: Event) {
    event.stopPropagation();
    this.categoriesVisible = !this.categoriesVisible;
  }


  selectCategory(category: string) {
    this.selectedCategory = category;
  }


  checkSubtask(subtask: string) {
    if (subtask.length > 2) {
      this.subtaskAddable = true;
    } else {
      this.subtaskAddable = false;
    }
  }


  addSubtask(subtask: string) {
    this.addedSubtasks.push({title: subtask, status: 'open'});
    this.clearSubtask();
  }


  clearSubtask() {
    this.subtaskInputRef.nativeElement.value = '';
    this.subtaskAddable = false;
  }


  deleteSubtask(index: number) {
    this.addedSubtasks.splice(index, 1);
    this.editedSubtaskIndex = null;
  }


  editSubtask(index: number) {
    this.editedSubtaskIndex = index;
    this.editedSubtaskContent = this.addedSubtasks[index]['title'];
  }


  saveSubtask(index: number) {
    this.addedSubtasks[index]['title'] = this.editedSubtaskContent;
    this.editedSubtaskIndex = null;
  }


  clearForm(addTaskForm: NgForm) {
    addTaskForm.resetForm();
    this.selectedPriority = 'medium';
    this.selectedContacts = [];
    this.selectedCategory = '';
    this.addedSubtasks = [];
  }


  async onSubmit(addTaskForm: NgForm) {
    if (addTaskForm.submitted && addTaskForm.valid) {
      const contactIds = this.selectedContacts.map(contact => contact.id);
      const taskData = {
        column: 'To do',
        category: this.selectedCategory,
        title: addTaskForm.value.title,
        description: addTaskForm.value.description,
        date: addTaskForm.value.date,
        priority: this.selectedPriority,
        contacts: [...contactIds]
      }
      await this.firebaseService.addTask(taskData, this.addedSubtasks)
      this.clearForm(addTaskForm);
      this.toastMsgService.showToastMsg('Task added to board');
      setTimeout(() => {
        this.toastMsgService.resetToastMsg();
        this.router.navigateByUrl('board');
      }, 1500);
    } else {
      console.log('Form invalid!!!');
      console.log('addTaskForm: ', addTaskForm);
    }
  }


  // Hilfsfunktionen:
  getInitials(name: string) {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }

}
