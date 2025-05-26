import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SidenavComponent } from "../../shared/sidenav/sidenav.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, SidenavComponent, HeaderComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

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
  testContacts: string[] = [
    'Sophie Müller',
    'Hans Lustig',
    'Max Mustermann',
    'Erika Musterfrau',
    'Gast',
    'Tim Gross',
    'Eva Klein',
    'Klaus Bott',
    'Hanna Seelig',
    'Gustaf Konrad'
  ];
  selectedContacts: string[] = [];
  filteredContacts: string[] = [...this.testContacts];
  addedSubtasks: string[] = [];


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.categoriesVisible = false;
    this.contactsVisible = false;
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


  selectContact(contact: string) {
    const index = this.selectedContacts.indexOf(contact);
    
    if (index == -1) {
      this.selectedContacts.push(contact);
    } else {
      this.selectedContacts.splice(index, 1);
    }
  }


  filterContacts(searchTerm: string) {
    const term = searchTerm.toLowerCase();
    this.filteredContacts = this.testContacts.filter(contact => contact.toLowerCase().includes(term));
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
