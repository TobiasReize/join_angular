import { Component, inject } from '@angular/core';
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
export class ImprintComponent {

  private userService = inject(UserService);


  ngOnInit(): void {
    this.userService.checkCredentials();
  }

}
