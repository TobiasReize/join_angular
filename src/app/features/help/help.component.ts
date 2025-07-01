import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent implements OnInit {

  private location = inject(Location);
  private userService = inject(UserService);


  ngOnInit(): void {
    this.userService.checkCredentials();
  }


  goBack() {
    this.location.back();
  }

}
