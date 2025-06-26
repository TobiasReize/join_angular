import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../../services/contact-service/contact.service';
import { FirebaseService } from '../../../services/firebase-service/firebase.service';
import { ToastMsgService } from '../../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  contactService = inject(ContactService);
  private firebaseService = inject(FirebaseService);
  private toastMsgService = inject(ToastMsgService);
  formClosed: boolean = false;


  closeForm() {
    this.contactService.resetActiveContact();
    this.formClosed = true;
    setTimeout(() => {
      this.contactService.setContactForm(false);
    }, 200);
  }


  clearForm(contactForm: NgForm) {
    contactForm.resetForm();
  }


  deleteContact() {
    const id = this.contactService.activeContact()?.id;
    if (id) {
      this.firebaseService.deleteDoc('contacts', id);
      this.closeForm();
      this.toastMsgService.showToastMsg('Contact deleted');
      setTimeout(() => {
        this.toastMsgService.resetToastMsg();
      }, 2000);
    }
  }


  onSubmit(contactForm: NgForm) {
    const currentContact = this.contactService.activeContact();
    if (contactForm.submitted && contactForm.valid) {
      let data = contactForm.value;
      if (currentContact) {
        this.firebaseService.updateDocData('contacts', currentContact.id, data);
      } else {
        data['color'] = this.getRandomColor();
        this.firebaseService.addDoc('contacts', data);
        this.toastMsgService.showToastMsg('Contact succesfully created');
        setTimeout(() => {
          this.toastMsgService.resetToastMsg();
        }, 2000);
      }
      contactForm.resetForm();
      this.closeForm();
    }
  }


  // Hilfsfunktionen:
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
