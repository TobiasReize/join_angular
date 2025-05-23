import { Component } from '@angular/core';
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
  contactsVisible: boolean = false;
  testContacts: string[] = [
    'Sophie Müller',
    'Hans Lustig',
    'Max Mustermann',
    'Erika Musterfrau',
    'Gast',
    'Tim Gross',
    'Eva Klein'
  ];
  selectedContacts: string[] = [];
  filteredContacts: string[] = [...this.testContacts];


  choosePriority(priority: string) {
    this.selectedPriority = priority;
  }


  toggleContactsOverlay(event?: Event, state?: 'visible') {
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


  getInitials(name: string) {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }

}
