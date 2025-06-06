import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms'; // Required for ngModel

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule], // Import FormsModule to use ngModel
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;
  isLoggedIn = false;
  userId: string | null = null; // ✅ Store user ID
  isEditing = false; // Track whether we are in edit mode
  previewImage: string | null = null; // For displaying image preview
  originalUserData: User | null = null; // To store the original data for cancel functionality

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id'); // ✅ Store it
    if (!this.userId) {
      this.error = 'No user ID provided in URL.';
      return;
    }

    this.checkLoginAndLoadProfile(this.userId);
  }

  private checkLoginAndLoadProfile(userId: string): void {
    const token = localStorage.getItem('user'); // ✅ Simulated login check
    this.isLoggedIn = !!token;

    if (!this.isLoggedIn) {
      this.error = 'Please login to view your profile.';
      this.user = null;
      return;
    }

    this.loadUserProfile(this.userId!); // ✅ Pass the stored ID
  }

  private loadUserProfile(id: string): void {
    this.loading = true;
    this.error = null;

    this.profileService.getUserProfileById(+id).subscribe({
      next: (data: User) => {
        this.user = data;
        this.originalUserData = { ...data }; // Store the original data for cancellation
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error = 'Failed to load user profile. Please refresh or try again later.';
        this.loading = false;
      }
    });
  }

  // Toggle between view and edit mode
  toggleEdit(): void {
    if (this.isEditing) {
      this.saveProfile(); // Save profile when editing is done
    } else {
      this.isEditing = true; // Switch to edit mode
    }
  }

  // Save the edited profile
  private saveProfile(): void {
    if (!this.user) return;

    this.loading = true;

    // If there's a profile image selected, include it in the updated user object
    const updatedUser: Partial<User> = {
      ...this.user,
      profileImage: this.previewImage || this.user.profileImage // Include the new profile image if available
    };

    // Call the service to update the user profile
    this.profileService.updateUserProfile(+this.userId!, updatedUser).subscribe({
      next: (updatedUser: User) => {
        this.user = updatedUser; // Update the profile data
        this.isEditing = false; // Switch back to view mode
        this.previewImage = null; // Reset image preview
        this.loading = false;
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        this.error = 'Failed to save profile. Please try again later.';
        this.loading = false;
      }
    });
  }

  // Cancel the edit and revert to the original profile data
  cancelEdit(): void {
    if (this.originalUserData) {
      this.user = { ...this.originalUserData }; // Revert back to original user data
    }
    this.isEditing = false; // Switch back to view mode
    this.previewImage = null; // Reset the image preview
  }

  // Handle profile image selection
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string; // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  }
}
