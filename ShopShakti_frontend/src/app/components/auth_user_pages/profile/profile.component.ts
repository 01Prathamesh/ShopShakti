import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;
  isLoggedIn = false;
  isEditing = false;
  previewImage: string | null = null;
  originalUserData: User | null = null;
  selectedAvatar: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('user');
    this.isLoggedIn = !!token;

    if (!this.isLoggedIn) {
      this.error = 'Please login to view your profile.';
      this.user = null;
      return;
    }

    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.loading = true;
    this.error = null;

    this.profileService.getUserProfile().subscribe({
      next: (data: User) => {
        this.user = data;
        this.originalUserData = { ...data };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error = 'Failed to load user profile. Please refresh or try again later.';
        this.loading = false;
      }
    });
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveProfile();
    } else {
      this.isEditing = true;
    }
  }

  private saveProfile(): void {
    if (!this.user) return;

    this.loading = true;

    const updatedUser: Partial<User> = {
      ...this.user,
      profileImage: this.previewImage || this.user.profileImage
    };

    this.profileService.updateUserProfile(0, updatedUser).subscribe({
      next: (updatedUser: User) => {
        this.user = updatedUser;
        this.isEditing = false;
        this.previewImage = null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        this.error = 'Failed to save profile. Please try again later.';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    if (this.originalUserData) {
      this.user = { ...this.originalUserData };
    }
    this.isEditing = false;
    this.previewImage = null;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onAvatarClick(imageUrl: string): void {
    this.selectedAvatar = imageUrl;
  }
}
