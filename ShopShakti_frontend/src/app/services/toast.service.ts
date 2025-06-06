import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/ui_ux/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastRef!: ToastComponent;

  register(toastInstance: ToastComponent) {
    this.toastRef = toastInstance;
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
    if (this.toastRef) {
      this.toastRef.show(message, type, duration);
    } else {
      console.warn('ToastComponent not registered yet.');
    }
  }
}
