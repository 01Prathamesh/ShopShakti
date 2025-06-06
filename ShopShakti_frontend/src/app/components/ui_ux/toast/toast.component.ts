import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
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
  getIcon(type: 'success' | 'error' | 'info' | 'warning'): string {
    switch (type) {
      case 'success': return '✔️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      default: return '';
    }
  }
}