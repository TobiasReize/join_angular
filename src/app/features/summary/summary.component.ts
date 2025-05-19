import { Component } from '@angular/core';
import { SidenavComponent } from "../../shared/sidenav/sidenav.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SidenavComponent, HeaderComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

}
