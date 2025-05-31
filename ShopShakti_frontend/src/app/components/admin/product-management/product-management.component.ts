import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  showForm: boolean = false;
  errorMessage = '';
  searchQuery = '';
  filteredProducts: Product[] = [];

  // For add/edit form
  editingProduct: Product | null = null;
  formModel: Product = { id: 0, name: '', price: 0, category: '', description: '', imageUrl: '', quantity: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }


  loadProducts() {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  addProduct() {
    this.editingProduct = null;
    this.formModel = { id: 0, name: '', price: 0, category: '', description: '', imageUrl: '', quantity: 0 };
    this.showForm = true;
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.formModel = { ...product };
    this.showForm = true;
  }

  saveProduct() {
    if (this.editingProduct) {
      // Update product
      this.productService.updateProduct(this.editingProduct.id, this.formModel).subscribe({
        next: () => {
          this.loadProducts();
          this.editingProduct = null;
        },
        error: () => {
          this.errorMessage = 'Failed to update product.';
        }
      });
    } else {
      // Add new product
      this.productService.addProduct(this.formModel).subscribe({
        next: () => {
          this.loadProducts();
          this.formModel = { id: 0, name: '', price: 0, category: '', description: '', imageUrl: '', quantity: 0 };
        },
        error: () => {
          this.errorMessage = 'Failed to add product.';
        }
      });
    }
  }

  cancelEdit() {
    this.editingProduct = null;
    this.formModel = { id: 0, name: '', price: 0, category: '', description: '', imageUrl: '', quantity: 0 };
    this.showForm = false;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: () => {
          this.errorMessage = 'Failed to delete product.';
        }
      });
    }
  }
}
