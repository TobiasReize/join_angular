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
  router = inject(Router);
  selectedPriority: 'low' | 'medium' | 'urgent' = 'medium';
  selectedCategory: string = '';
  contactsVisible: boolean = false;
  categoriesVisible: boolean = false;
  subtaskAddable: boolean = false;
  editedSubtaskIndex: number | null = null;
  editedSubtaskContent: string = '';
  @ViewChild('subtaskInput') subtaskInputRef!: ElementRef;
  categories: string[] = [
    'Technical Task',
    'User Story'
  ];
  selectedContacts: Contact[] = [];
  allContacts = this.contactService.allContacts;
  filteredContacts = signal<Contact[]>([]);
  addedSubtasks: string[] = [];


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.categoriesVisible = false;
    this.contactsVisible = false;
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.filteredContacts.set(this.allContacts());
    }, 1000);
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
    this.filteredContacts.set(this.allContacts().filter(contact => contact.name.toLowerCase().includes(term)));
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
    this.addedSubtasks.push(subtask);
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
    this.editedSubtaskContent = this.addedSubtasks[index];
  }


  saveSubtask(index: number) {
    this.addedSubtasks[index] = this.editedSubtaskContent;
    this.editedSubtaskIndex = null;
  }


  clearForm(addTaskForm: NgForm) {
    addTaskForm.resetForm();
    this.selectedPriority = 'medium';
    this.selectedContacts = [];
    this.selectedCategory = '';
    this.addedSubtasks = [];
    console.log('Form cleared!');    
  }


  onSubmit(addTaskForm: NgForm) {
    if (addTaskForm.submitted && addTaskForm.valid) {
      console.log('addTaskForm: ', addTaskForm);
      console.log('values: ', addTaskForm.form.value);
      console.log('selectedPriority: ', this.selectedPriority);
      console.log('selectedContacts: ', this.selectedContacts);
      console.log('selectedCategory: ', this.selectedCategory);
      console.log('addedSubtasks: ', this.addedSubtasks);
      this.clearForm(addTaskForm);
      this.toastMsgService.showToastMsg('Task added to board');
        setTimeout(() => {
          this.toastMsgService.resetToastMsg();
          // this.router.navigateByUrl('');
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
