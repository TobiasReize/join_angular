import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact-service/contact.service';
import { Contact } from '../../models/contact.class';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnInit {

  contactService = inject(ContactService);
  minDate: string = '';
  selectedPriority: 'low' | 'medium' | 'urgent' = 'medium';
  selectedCategory: string = '';
  contactsVisible: boolean = false;
  categoriesVisible: boolean = false;
  selectedContacts: Contact[] = [];
  filteredContacts = this.contactService.allContacts;
  categories: string[] = [
    'Technical Task',
    'User Story',
    'Bug Fix'
  ];
  subtaskAddable: boolean = false;
  editedSubtaskIndex: number | null = null;
  editedSubtaskContent: string = '';
  @ViewChild('subtaskInput') subtaskInputRef!: ElementRef;
  addedSubtasks: any[] = [];
  @Output() submitForm = new EventEmitter<any>();


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.categoriesVisible = false;
    this.contactsVisible = false;
  }


  ngOnInit(): void {
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


  onSubmit(addTaskForm: NgForm) {
    if (addTaskForm.submitted && addTaskForm.valid) {
      const contactIds = this.selectedContacts.map(contact => contact.id);
      const data = {
        title: addTaskForm.value.title,
        description: addTaskForm.value.description,
        date: addTaskForm.value.date,
        priority: this.selectedPriority,
        contacts: [...contactIds],
        category: this.selectedCategory,
        subtasks: this.addedSubtasks
      }
      this.submitForm.emit(data);
      this.clearForm(addTaskForm);
    } else {
      console.log('Form invalid!!!');
      console.log('addTaskForm: ', addTaskForm);
    }
  }

}
