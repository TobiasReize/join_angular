import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent, IntroComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private router = inject(Router);
  isPasswordVisible: boolean = false;
  passwordIconSrc: string = 'icon/visibility_off.svg';
  showIntro: boolean = true;


  setIntroVariable(introFinished: boolean) {
    this.showIntro = !introFinished;    
  }


  showPassword(state: boolean, password: NgModel) {
    if (state == true && password.value.length > 0) {
      this.isPasswordVisible = true;
      this.passwordIconSrc = 'icon/visibility.svg'
    } else {
      this.isPasswordVisible = false;
      this.passwordIconSrc = 'icon/visibility_off.svg'
    }
  }
  

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    console.log(ngForm.value);
  }


  guestLogin() {
    console.log('Gast Login');
    this.router.navigateByUrl('summary');
    // tbd.
  }

}
