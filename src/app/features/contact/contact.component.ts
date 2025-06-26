import { Component, computed, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { UserService } from '../../services/user-service/user.service';
import { ContactService } from '../../services/contact-service/contact.service';
import { Contact } from '../../models/contact.class';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { ToastMsgComponent } from "../../shared/toast-msg/toast-msg.component";
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent, ContactFormComponent, ToastMsgComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  private userService = inject(UserService);
  private firebaseService = inject(FirebaseService);
  toastMsgService = inject(ToastMsgService);
  contactService = inject(ContactService);
  contactSelected: boolean = false;
  moreOverlayVisible: boolean = false;
  moreOptionsClosed: boolean = false;
  @ViewChild('singleContactSection') singleContactSection!: ElementRef;

  initialLetters = computed(() => {
    const result: string[] = [];
    this.contactService.allContacts().map(contact => contact.name.charAt(0).toUpperCase()).sort().forEach(letter => {
      if (!result.includes(letter)) {
        result.push(letter);
      }
    });
    return result;
  });


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.closeMoreOptions();
  }


  ngOnInit(): void {
    this.userService.checkCredentials();
    this.contactService.resetActiveContact();
  }


  selectContact(contact: Contact) {
    if (window.innerWidth <= 750) {
      this.contactSelected = true;
      this.contactService.setActiveContact(contact);
      this.singleContactSection.nativeElement.classList.add('d-Flex');
    } else {
      this.contactSelected = false;
      this.contactService.setActiveContact(contact);
      setTimeout(() => {
        this.contactSelected = true;
      }, 0);
    }
  }


  addContact() {
    this.contactService.resetActiveContact();
    this.contactService.setContactForm(true);
  }


  editContact(contact: Contact | undefined) {
    if (contact) {
      this.contactService.setActiveContact(contact);
      this.contactService.setContactForm(true);
    }
  }


  async deleteContact(id: string | undefined) {
    if (id) {
      await this.firebaseService.deleteContact(id);
      this.contactService.resetActiveContact();
      this.toastMsgService.showToastMsg('Contact deleted');
      setTimeout(() => {
        this.toastMsgService.resetToastMsg();
      }, 2000);
    }
  }


  goBack() {
    this.contactService.resetActiveContact();
    this.singleContactSection.nativeElement.classList.remove('d-Flex');
  }


  showMoreOptions(event: Event) {
    this.moreOptionsClosed = false;
    event.stopPropagation();
    this.moreOverlayVisible = true;
  }


  closeMoreOptions() {
    this.moreOptionsClosed = true;
    setTimeout(() => {
      this.moreOverlayVisible = false;
    }, 200);
  }


  // Hilfsfunktionen:
  getFilteredContacts(letter: string) {
    return this.contactService.allContacts().filter(contact => contact.name.toUpperCase().startsWith(letter));
  }

}
