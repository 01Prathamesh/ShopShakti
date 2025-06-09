import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-staff-button',
  imports: [CommonModule],
  templateUrl: './staff-button.component.html',
  styleUrls: ['./staff-button.component.css']
})
export class StaffButtonComponent implements OnInit {
  isStaffOrAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.isStaffOrAdmin = role === 'Admin' || role === 'Staff';
  }

  goToStaffDashboard(): void {
    this.router.navigate(['/staff']);
  }
}
