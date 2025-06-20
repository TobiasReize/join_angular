import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../../models/contact.class';
import { ContactService } from '../../services/contact-service/contact.service';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent implements OnInit {

  private contactService = inject(ContactService);
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


  // Hilfsfunktionen:
  getInitials(name: string) {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }

}
