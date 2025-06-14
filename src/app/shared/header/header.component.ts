import { Component, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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

}
