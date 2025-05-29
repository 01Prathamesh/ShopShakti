import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Simulate fetching all users (needs a backend GET /api/Users)
    fetch('https://localhost:7171/api/Users')
      .then(res => res.json())
      .then((data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
      });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      fetch(`https://localhost:7171/api/Users/${id}`, { method: 'DELETE' })
        .then(() => {
          this.users = this.users.filter(u => u.id !== id);
          this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
        })
        .catch(err => console.error('Delete failed', err));
    }
  }
}
