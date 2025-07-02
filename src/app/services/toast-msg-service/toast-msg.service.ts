import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastMsgService {

  private toastMsgSignal = signal<string>('');
  readonly toastMsg = this.toastMsgSignal.asReadonly();

  private toastStateSignal = signal<'active' | 'unset'>('unset');
  readonly toastState = this.toastStateSignal.asReadonly();


  showToastMsg(msg: string) {
    this.toastMsgSignal.set(msg);
    this.toastStateSignal.set('active');
  }


  resetToastMsg() {
    this.toastMsgSignal.set('');
    this.toastStateSignal.set('unset');
  }

}
