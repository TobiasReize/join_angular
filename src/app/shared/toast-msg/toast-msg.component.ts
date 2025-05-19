import { Component, inject } from '@angular/core';
import { ToastMsgService } from '../../services/toast-msg-service/toast-msg.service';

@Component({
  selector: 'app-toast-msg',
  standalone: true,
  imports: [],
  templateUrl: './toast-msg.component.html',
  styleUrl: './toast-msg.component.scss'
})
export class ToastMsgComponent {

  toastMsgService = inject(ToastMsgService);

}
