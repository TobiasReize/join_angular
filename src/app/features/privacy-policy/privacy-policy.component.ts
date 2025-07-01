import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {

  private userService = inject(UserService);
  loggedIn: boolean = false;


  ngOnInit(): void {
    this.userService.currentUser();
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      this.loggedIn = true;
    }
  }

}
