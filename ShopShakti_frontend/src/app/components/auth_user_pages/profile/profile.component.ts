import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;
  isLoggedIn = false;
  userId: string | null = null; // ✅ Store user ID

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

    this.profileService.getUserProfileById(id).subscribe({
      next: (data: User) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error = 'Failed to load user profile. Please refresh or try again later.';
        this.loading = false;
      }
    });
  }

  editProfile(): void {
    alert('Edit profile functionality coming soon!');
  }
}
