import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HomepageComponent } from './components/core_pages/homepage/homepage.component';
import { NavbarComponent } from './components/ui_ux/navbar/navbar.component';
import { FooterComponent } from './components/ui_ux/footer/footer.component';
import { ToastComponent } from './components/ui_ux/toast/toast.component';
import { ToastService } from './components/ui_ux/toast/toast.service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, ToastComponent, FooterComponent, RouterOutlet],
  providers: [ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShopShakti_frontend';
   @ViewChild(ToastComponent) toastComp!: ToastComponent;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit(): void {
    this.toastService.register(this.toastComp);
  }
}
