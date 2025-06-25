import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { UserService } from '../../services/user-service/user.service';
import { ContactService } from '../../services/contact-service/contact.service';
import { Contact } from '../../models/contact.class';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  private userService = inject(UserService);
  contactService = inject(ContactService);
  contactSelected: boolean = false;
  selectedContact: Contact = new Contact();
  initialLetters = computed(() => {
    const result: string[] = [];
    this.contactService.allContacts().map(contact => contact.name.charAt(0).toUpperCase()).forEach(letter => {
      if (!result.includes(letter)) {
        result.push(letter);
      }
    });
    return result;
  });


  ngOnInit(): void {
    this.userService.checkCredentials();
  }


  selectContact(contact: Contact) {
    this.contactSelected = false;
    this.selectedContact = contact;
    setTimeout(() => {
      this.contactSelected = true;
    }, 0);
  }


  addContact() {
    this.contactService.setContactForm(true);
  }


  editContact(id: string) {
    this.contactService.setEditContact(id);
    this.contactService.setContactForm(true);
  }


  deleteContact(id: string) {
    console.log('Contact deleted!!!', this.contactService.getContactFromId(id));
  }


  // Hilfsfunktionen:
  getInitials(contact: Contact): string {
    return contact.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
  }


  getFilteredContacts(letter: string) {
    return this.contactService.allContacts().filter(contact => contact.name.startsWith(letter));
  }

}
