import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

    isPasswordVisible: boolean = false;
    isPasswordRepeatVisible: boolean = false;
    passwordIconSrc: string = 'icon/visibility_off.svg';
    passwordRepeatIconSrc: string = 'icon/visibility_off.svg';
  
  
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
    
  
    onSubmit(ngForm: NgForm) {
      console.log(ngForm);
      console.log(ngForm.value);
    }

}
