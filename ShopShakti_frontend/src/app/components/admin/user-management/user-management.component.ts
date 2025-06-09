import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';
import { ToastService } from '../../../services/toast.service';

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
  expandedUserId: number | null = null;
  editingUserId: number | null = null;
  editForm: Partial<User> = {};
  selectedAvatar: string | null = null;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.profileService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
        this.toastService.show('Users loaded successfully!', 'success');
      },
      error: () => {
        this.errorMessage = 'Failed to load users.';
        this.isLoading = false;
        this.toastService.show('Failed to load users.', 'error', 4000);
      }
    });
  }

  toggleDropdown(userId: number) {
    if (this.expandedUserId === userId) {
      this.expandedUserId = null;
      this.editingUserId = null;
    } else {
      this.expandedUserId = userId;
      this.editingUserId = null;
    }
  }

  startEditing(user: User): void {
    this.editingUserId = user.id;
    this.editForm = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage,
      isBlocked: user.isBlocked,
      role: user.role || 'User'
    };
  }

  saveUser(): void {
    if (this.editingUserId === null) return;

    this.profileService.updateUserProfile(this.editingUserId, this.editForm).subscribe({
      next: () => {
        this.loadUsers();
        this.editingUserId = null;
        this.toastService.show('User updated successfully!', 'success');
      },
      error: () => {
        this.errorMessage = 'Failed to update user.';
        this.toastService.show('Failed to update user.', 'error', 4000);
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.profileService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
          this.toastService.show('User deleted successfully!', 'success');
        },
        error: () => {
          this.errorMessage = 'Failed to delete user.';
          this.toastService.show('Failed to delete user.', 'error', 4000);
        }
      });
    }
  }

  toggleBlockUser(user: User): void {
    const updatedUser = { ...user, isBlocked: !user.isBlocked };

    this.profileService.updateUserProfile(user.id, updatedUser).subscribe({
      next: () => {
        this.loadUsers();
        const action = updatedUser.isBlocked ? 'blocked' : 'unblocked';
        this.toastService.show(`User ${action} successfully!`, 'success');
      },
      error: () => {
        this.errorMessage = 'Failed to update user status.';
        this.toastService.show('Failed to update user status.', 'error', 4000);
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

  onAvatarClick(imageUrl: string) {
    this.selectedAvatar = imageUrl;
  }
}
