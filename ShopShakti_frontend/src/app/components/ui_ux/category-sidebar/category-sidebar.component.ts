import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-category-sidebar',
  imports: [CommonModule],
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent {
  categories: string[] = ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Beauty', 'Cricket'];
  selectedCategory: string | null = null;

  @Output() categorySelected = new EventEmitter<string>();

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    console.log('Selected Category:', category);
    this.categorySelected.emit(category); // Emit to parent
  }
}
