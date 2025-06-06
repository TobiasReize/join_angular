import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ToastMsgComponent } from '../../shared/toast-msg/toast-msg.component';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterLink, ToastMsgComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

    isPasswordVisible: boolean = false;
    isPasswordRepeatVisible: boolean = false;
    passwordIconSrc: string = 'icon/visibility_off.svg';
    passwordRepeatIconSrc: string = 'icon/visibility_off.svg';
    acceptedPrivacyPolicy: boolean = false;
    location = inject(Location);
    toastMsgService = inject(ToastMsgService);
    private router = inject(Router);


    goBack() {
      this.location.back();
    }
  

    showPassword(name: string, state: boolean, password: NgModel) {
      if (state == true && password.value.length > 0) {
        if (name == 'password') {
          this.isPasswordVisible = true;
          this.passwordIconSrc = 'icon/visibility.svg'
        } else {
          this.isPasswordRepeatVisible = true;
          this.passwordRepeatIconSrc = 'icon/visibility.svg'
        }
      } else {
        if (name == 'password') {
          this.isPasswordVisible = false;
          this.passwordIconSrc = 'icon/visibility_off.svg'
        } else {
          this.isPasswordRepeatVisible = false;
          this.passwordRepeatIconSrc = 'icon/visibility_off.svg'
        }
      }
    }


    toggleCheckbox() {
      this.acceptedPrivacyPolicy = !this.acceptedPrivacyPolicy;
    }


    onSubmit(ngForm: NgForm) {
      if (ngForm.submitted && ngForm.valid) {
        console.log(ngForm);
        console.log(ngForm.value);
        this.toastMsgService.showToastMsg('You signed up successfully');
        setTimeout(() => {
          this.toastMsgService.resetToastMsg();
          this.router.navigateByUrl('');
        }, 1500);
      }
    }

}
