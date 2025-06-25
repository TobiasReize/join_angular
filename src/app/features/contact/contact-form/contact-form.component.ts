import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  formClosed: boolean = false;


  closeForm() {
    this.formClosed = true;
  }


  clearForm(contactForm: NgForm) {
    contactForm.resetForm();
  }


  onSubmit(contactForm: NgForm) {
    if (contactForm.submitted && contactForm.valid) {
      console.log('contactForm: ', contactForm.value);
    }
  }

}
