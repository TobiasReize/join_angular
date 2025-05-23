import { Component, Input } from '@angular/core';
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


  showOverlay() {
    this.overlayVisible = !this.overlayVisible;
  }

}
