import { Component, HostListener, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { ContactService } from '../../services/contact-service/contact.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userService = inject(UserService);
  private router = inject(Router);
  contactService = inject(ContactService);
  @Input() type: string = '';
  overlayVisible: boolean = false;


  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.overlayVisible = false;
  }


  toggleOverlay(event: Event) {
    event.stopPropagation();
    this.overlayVisible = !this.overlayVisible;
  }


  async logout() {
    await this.userService.signOutUser();
    this.router.navigateByUrl('');
  }

}
