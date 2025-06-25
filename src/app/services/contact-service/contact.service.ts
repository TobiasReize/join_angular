import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Contact } from '../../models/contact.class';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  firebaseService = inject(FirebaseService);
  
  private allContactsSignal = signal<Contact[]>([]);
  readonly allContacts = this.allContactsSignal.asReadonly();

  private contactFormActiveSignal = signal<boolean>(false);
  readonly contactFormActive = this.contactFormActiveSignal.asReadonly();

  private editContactSignal = signal<Contact | undefined>(undefined);
  readonly editContact = this.editContactSignal.asReadonly();


  setContactForm(state: boolean) {
    this.contactFormActiveSignal.set(state);
  }
  
  
  setEditContact(id: string) {
    this.editContactSignal.set(this.getContactFromId(id));
  }


  resetEditContact() {
    this.editContactSignal.set(undefined);
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
      console.log('allContacts: ', this.allContacts());
    });
  }


  getContactFromId(id: string) {
    return this.allContacts().find(contact => contact.id === id);
  }

}
