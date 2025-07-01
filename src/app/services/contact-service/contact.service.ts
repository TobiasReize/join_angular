import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Contact } from '../../models/contact.class';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private firebaseService = inject(FirebaseService);
  
  private allContactsSignal = signal<Contact[]>([]);
  readonly allContacts = this.allContactsSignal.asReadonly();

  private contactFormActiveSignal = signal<boolean>(false);
  readonly contactFormActive = this.contactFormActiveSignal.asReadonly();

  private activeContactSignal = signal<Contact | undefined>(undefined);
  readonly activeContact = this.activeContactSignal.asReadonly();


  setContactForm(state: boolean) {
    this.contactFormActiveSignal.set(state);
  }


  setActiveContact(contact: Contact) {
    this.activeContactSignal.set(contact);
  }


  resetActiveContact() {
    this.activeContactSignal.set(undefined);
  }


  subContactCol() {
    const q = query(this.firebaseService.getCollectionRef('contacts'), orderBy('name'));
    return onSnapshot(q, contactsCollection => {
      this.allContactsSignal.set([]);
      let contacts: Contact[] = [];
      contactsCollection.forEach(contact => {
        const data = new Contact(contact.data(), contact.id);
        contacts.push(data);
      });
      this.allContactsSignal.set([...contacts]);
      // console.log('allContacts: ', this.allContacts());
    });
  }


  // Hilfsfunktionen:
  getContactFromId(id: string) {
    return this.allContacts().find(contact => contact.id === id);
  }


  getInitials(name: string | undefined): string {
    if (name) {
      return name.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
    } else {
      return '';
    }
  }

}
