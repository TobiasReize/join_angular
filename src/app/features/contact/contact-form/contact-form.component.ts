import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../../services/contact-service/contact.service';
import { Contact } from '../../../models/contact.class';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  contactService = inject(ContactService);
  formClosed: boolean = false;


  closeForm() {
    this.contactService.resetEditContact();
    this.formClosed = true;
    setTimeout(() => {
      this.contactService.setContactForm(false);
    }, 200);
  }


  clearForm(contactForm: NgForm) {
    contactForm.resetForm();
  }


  deleteContact() {
    const id = this.contactService.editContact()?.id;
    if (id) {
      console.log('Contact deleted!!!', this.contactService.getContactFromId(id));
    }
  }


  onSubmit(contactForm: NgForm) {
    if (contactForm.submitted && contactForm.valid) {
      console.log('contactForm: ', contactForm.value);
    }
  }


  // Hilfsfunktionen:
  getInitials(contact: Contact | undefined): string {
    if (contact) {
      return contact.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    } else {
      return '';
    }
  }

}
