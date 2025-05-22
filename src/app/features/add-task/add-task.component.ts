import { Component } from '@angular/core';
import { SidenavComponent } from "../../shared/sidenav/sidenav.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, SidenavComponent, HeaderComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  selectedPriority: string = 'medium';


  choosePriority(priority: string) {
    this.selectedPriority = priority;
  }

}
