import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent implements OnInit {

  private userService = inject(UserService);
  loggedIn: boolean = false;


  ngOnInit(): void {
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      this.userService.setCurrentUserUID(uid);
      this.loggedIn = true;
    }
  }

}
