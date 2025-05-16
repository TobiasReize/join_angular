import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {

  @Output() introFinished = new EventEmitter<boolean>();


  ngOnInit(): void {
    setTimeout(() => {
      this.hideIntroScreen();
    }, 1100);
  }


  hideIntroScreen() {
    this.introFinished.emit(true);
  }

}
