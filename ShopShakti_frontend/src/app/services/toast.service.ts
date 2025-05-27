import { Component, Injectable, inject } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastRef!: ToastComponent;

  register(toastInstance: ToastComponent) {
    this.toastRef = toastInstance;
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
    if (this.toastRef) {
      this.toastRef.show(message, type, duration);
    } else {
      console.warn('ToastComponent not registered yet.');
    }
  }
}
