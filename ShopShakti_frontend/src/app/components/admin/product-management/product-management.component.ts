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
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];

  isLoading = false;
  showForm = false;
  errorMessage = '';
  searchQuery = '';

  currentPage = 1;
  itemsPerPage = 10;

  editingProduct: Product | null = null;
  formModel: Product = { id: 0, name: '', price: 0, category: '', description: '', imageUrl: '', quantity: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.paginate();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  openForm(): void {
    this.editingProduct = null;
    this.formModel = { id: 0, name: '', price: 0, category: '', description: '', imageUrl: '', quantity: 0 };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingProduct = null;
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.formModel = { ...product };
    this.showForm = true;
  }

  saveProduct(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.formModel).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: () => {
          this.errorMessage = 'Failed to update product.';
        }
      });
    } else {
      this.productService.addProduct(this.formModel).subscribe({
        next: () => {
          this.loadProducts();
          this.closeForm();
        },
        error: () => {
          this.errorMessage = 'Failed to add product.';
        }
      });
    }
  }

  deleteProduct(id: number): void {
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
