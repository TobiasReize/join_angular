import { Component, HostListener, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userService = inject(UserService);
  router = inject(Router);
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


  // Hilfsfunktionen:
  getInitials(name: string | undefined) {
    if (name) {
      const words = name.split(' ');
      const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
      return initials;
    } else {
      return '';
    }
  }

}
