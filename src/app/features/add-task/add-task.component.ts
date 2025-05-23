import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidenavComponent } from "../../shared/sidenav/sidenav.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  selectedPriority: string = 'medium';
  selectedCategory: string = '';
  contactsVisible: boolean = false;
  categoriesVisible: boolean = false;
  subtaskAddable: boolean = false;
  @ViewChild('subtaskInput') subtaskInputRef!: ElementRef;
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


  choosePriority(priority: string) {
    this.selectedPriority = priority;
  }


  toggleContactOverlay(event?: Event, state?: 'visible') {
    if (state == 'visible') {
      this.contactsVisible = true;
    } else {
      this.contactsVisible = !this.contactsVisible;
      event?.stopPropagation();
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


  toggleCategoryOverlay() {
    this.categoriesVisible = !this.categoriesVisible;
  }


  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categoriesVisible = false;
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


  // Hilfsfunktionen:
  getInitials(name: string) {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }

}
