import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';

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
  isLoading = false;
  errorMessage = '';
  expandedUserId: string | null = null;


  toggleDropdown(userId: string) {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
  }


  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    fetch('https://localhost:7171/api/Users')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then((data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      })
      .catch(err => {
        console.error(err);
        this.errorMessage = 'Failed to load users.';
        this.isLoading = false;
      });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      fetch(`https://localhost:7171/api/Users/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            throw new Error('Delete failed');
          }
          this.users = this.users.filter(u => u.id !== id);
          this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
        })
        .catch(err => {
          console.error(err);
          this.errorMessage = 'Failed to delete user.';
        });
    }
  }

  toggleBlockUser(user: User): void {
    const updatedUser = { ...user, isBlocked: !user.isBlocked };

    fetch(`https://localhost:7171/api/Users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update block status');
        }
        this.loadUsers();
      })
      .catch(err => {
        console.error(err);
        this.errorMessage = 'Failed to update user status.';
      });
  }
}
