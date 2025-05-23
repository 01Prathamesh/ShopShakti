import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-searchbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  query: string = '';

  search() {
    if (this.query.trim()) {
      console.log('Searching for:', this.query);
      // Trigger your search service or router navigation here
    }
  }
}
