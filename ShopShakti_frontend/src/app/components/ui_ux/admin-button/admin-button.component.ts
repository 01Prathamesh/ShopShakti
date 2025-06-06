import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-button',
  imports: [CommonModule],
  templateUrl: './admin-button.component.html',
  styleUrls: ['./admin-button.component.css']
})
export class AdminButtonComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getRole() === 'Admin';
  }

  goToAdminDashboard(): void {
    this.router.navigate(['/admin']);
  }
}
