import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  toasts = signal<Toast[]>([]);

  show(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = Date.now();
    this.toasts.update(t => [...t, { id, message, type, duration }]);

    setTimeout(() => {
      this.toasts.update(t => t.filter(toast => toast.id !== id));
    }, duration);
  }
}
