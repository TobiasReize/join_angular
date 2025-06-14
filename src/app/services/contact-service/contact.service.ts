import { inject, Injectable, signal } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Contact } from '../../models/contact.class';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  firebaseService = inject(FirebaseService);
  
  private allContactsSignal = signal<Contact[]>([]);
  readonly allContacts = this.allContactsSignal.asReadonly();


  subContactCol() {
    return onSnapshot(this.firebaseService.getCollectionRef('contacts'), contactsCollection => {
      this.allContactsSignal.set([]);
      const contacts: Contact[] = [];
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
