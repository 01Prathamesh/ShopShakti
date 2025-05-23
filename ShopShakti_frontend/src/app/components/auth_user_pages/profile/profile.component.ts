import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user.model';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User = {
    name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    phone: '+91 9876543210',
    address: '123, MG Road, Bengaluru, India',
    joinedDate: '2023-02-15',
    profileImage: 'assets/images/logo.png' // Make sure this image exists
  };

  editProfile() {
    alert('Edit profile functionality coming soon!');
  }
}
