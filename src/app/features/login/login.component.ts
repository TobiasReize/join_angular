import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Auth, browserSessionPersistence } from '@angular/fire/auth';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { IntroComponent } from './intro/intro.component';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent, IntroComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private router = inject(Router);
  private firebaseService = inject(FirebaseService);
  private auth = inject(Auth);
  isPasswordVisible: boolean = false;
  passwordIconSrc: string = 'icon/visibility_off.svg';
  showIntro: boolean = true;


  async ngOnInit(): Promise<void> {
    this.setAuthStatePersistence();
    if (this.auth.currentUser) {
      await this.firebaseService.signOutUser();
    }
  }


  setAuthStatePersistence() {
    this.auth.setPersistence(browserSessionPersistence)
      .catch((error) => {
        console.log('Error-Code:', error.code);
        console.log('Error-Message:', error.message);
      });
  }


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
    this.firebaseService.signInUser(ngForm.value.email, ngForm.value.password)
      .then(user => {
        if (user) {
          sessionStorage.setItem('uid', user.uid);
          sessionStorage.setItem('email', user.email ?? '');
          this.router.navigateByUrl('summary');
        }
      });
  }


  guestLogin() {
    this.firebaseService.signInUser(environment.guest.EMAIL, environment.guest.PASSWORD)
      .then(user => {
        if (user) {
          sessionStorage.setItem('uid', user.uid);
          sessionStorage.setItem('email', user.email ?? '');
          this.router.navigateByUrl('summary');
        }
      });
  }

}
