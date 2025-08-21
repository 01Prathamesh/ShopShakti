# 🛍️ ShopShakti (Full-Stack E-Commerce Platform)


![GitHub issues](https://img.shields.io/github/issues/01Prathamesh/ShopShakti) &nbsp;&nbsp;&nbsp;
![GitHub license](https://img.shields.io/github/license/01Prathamesh/ShopShakti) &nbsp;&nbsp;&nbsp;
![GitHub stars](https://img.shields.io/github/stars/01Prathamesh/ShopShakti) &nbsp;&nbsp;&nbsp;
![GitHub forks](https://img.shields.io/github/forks/01Prathamesh/ShopShakti) &nbsp;&nbsp;&nbsp;
![GitHub last commit](https://img.shields.io/github/last-commit/01Prathamesh/ShopShakti)


## 📌 Status: Active Development — Stable Core Features

Welcome to the **ShopShakti** project — a modern, full-stack, responsive e-commerce web application built using **Angular (frontend)** and **ASP.NET Core Web API (backend)**. It features a clean, scalable architecture and is designed for performance, maintainability, and an excellent user experience.

## 📽️ **Project Demo**

Check out the live walkthrough of **ShopShakti** on YouTube:  
[![ShopShakti Demo](https://img.youtube.com/vi/rlYTUn8ONFk/0.jpg)](https://youtu.be/rlYTUn8ONFk?si=KnZtb-_hHt2Op6vs)

🔗 Watch here: [https://youtu.be/rlYTUn8ONFk?si=KnZtb-_hHt2Op6vs](https://youtu.be/rlYTUn8ONFk?si=KnZtb-_hHt2Op6vs)

> 🚧 *Note: This project is a work in progress, but it’s stable enough to demonstrate core features and user flows.*

## 🚀 Frontend Features (Angular)

- 🏠 **Homepage** with hero banners, trending, deals, and featured categories
- 🛒 **Product Listing & Detail Pages** with filtering, dynamic routing
- 👤 **Authentication**: Register, Login, Profile management
- 🧺 **Cart System** with quantity control and persistence
- 💳 **Checkout** flow with order summary and confirmation
- 📦 **Order Management** for both users and admin
- 🧑‍💼 **Admin Dashboard** with analytics and protected routes
- 🍞 **Toast Notifications** for seamless feedback
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile

## 🧱 Frontend Structure
```
ShopShakti_frontend/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── admin/
│ │ │ │ ├── admin-dashboard/
│ │ │ │ ├── order-management/
│ │ │ │ ├── product-management/
│ │ │ │ └── user-management/
│ │ │ ├── auth_user_pages/
│ │ │ │ ├── login/
│ │ │ │ ├── register/
│ │ │ │ └── profile/
│ │ │ ├── core_pages/
│ │ │ │ ├── homepage/
│ │ │ │ ├── product-list/
│ │ │ │ ├── product-detail/
│ │ │ │ └── cart/
│ │ │ ├── orders/
│ │ │ │ ├── order-list/
│ │ │ │ ├── order-summary/
│ │ │ │ └── order-success/
│ │ │ ├── staff/
│ │ │ │ ├── staff-dashboard/                         
│ │ │ │ ├── manage-trending-products/               
│ │ │ │ ├── manage-benefits/                        
│ │ │ │ ├── manage-top-deals/                       
│ │ │ │ ├── manage-customer-reviews/                
│ │ │ │ ├── manage-featured-categories/             
│ │ │ │ └── manage-newsletter-subscription/
│ │ │ ├── home/
│ │ │ │ ├── trending-products/
│ │ │ │ ├── featured-categories/
│ │ │ │ ├── top-deals/
│ │ │ │ ├── benefits/
│ │ │ │ ├── customer-reviews/
│ │ │ │ └── newsletter-subscription/
│ │ │ └── ui_ux/
│ │ │   ├── navbar/
│ │ │   ├── admin-button/
│ │ │   ├── cart-button/
│ │ │   ├── footer/
│ │ │   ├── searchbar/
│ │ │   ├── category-sidebar/
│ │ │   ├── banner-carousel/
│ │ │   └── toast/
| | ├── models/
| | └── services/
│ ├── assets/
│ │ └── images/
│ │   ├── banners/
| |   ├── company/
│ │   ├── categories/
│ │   ├── deals/
│ │   └── products/
│ └── index.html
```

## 🛠️ Tech Stack (Frontend)

- **Angular 19** with standalone component architecture
- **TypeScript**
- **Angular Router** for route management and guards
- **Material Icons**, **FontAwesome** for UI elements

## 🔒 Admin Access

Admin routes are protected using an `AuthService` and `canActivateAdmin` guard. Only users with role `admin` can access the dashboard.

```ts
if (auth.isLoggedIn() && auth.isAdmin()) {
  return true;
}
```

## 📦 Run Frontend Locally
```
# Install dependencies
npm install

# Run dev server
ng serve
```
Access the app at: http://localhost:4200

## 🔧 Backend Overview (ASP.NET Core)

The backend is a RESTful API built with **ASP.NET Core Web API**, using **Entity Framework Core** for data persistence and **SQL Server** as the database.

## 🧱 Backend Structure
```
ShopShakti_backend/
├── Properties/
|    └── launchSettings.cs/
├── Controllers/
│   ├── AdminController.cs
│   ├── CartItemsController.cs
│   ├── OrdersController.cs
│   ├── ProductsController.cs
│   └── UsersController.cs
├── Data/
│   ├── AppContextDb.cs
│   └── AppDbContextFactory.cs
├── Models/
│   ├── CartItem.cs
│   ├── Order.cs
│   ├── Product.cs
│   ├── User.cs
│   ├── AdminMetricsDto.cs
│   └── LoginDto.cs
├── Migrations/
├── Program.cs
├── appsettings.json
└── ShopShakti_backend.csproj

```

## 🧰 Tech Stack (Backend)

- **ASP.NET Core 7 Web API**

- **Entity Framework Core**

- **SQL Server / SQLite**

- **CORS Configuration for frontend integration**

- **Swagger (OpenAPI 3.0) for documentation**

## 📘 API Endpoints

**🛒 CartItems**

`GET /api/CartItems`

`GET /api/CartItems/{id}`

`POST /api/CartItems`

`PUT /api/CartItems/{id}`

`DELETE /api/CartItems/{id}`

**📦 Orders**

`GET /api/Orders`

`GET /api/Orders/{id}`

`POST /api/Orders`

`PUT /api/Orders/{id}`

`DELETE /api/Orders/{id}`

**🛍️ Products**

`GET /api/Products`

`GET /api/Products/{id}`

`POST /api/Products`

`PUT /api/Products/{id}`

`DELETE /api/Products/{id}`

**👤 Users**

`GET /api/Users`

`GET /api/Users/{id}`

`POST /api/Users`

`PUT /api/Users/{id}`

`DELETE /api/Users/{id}`

`POST /api/Users/login`

**📊 Admin Metrics**

`GET /api/Admin/metrics`

## 📄 Schemas Used
- `Product`

- `CartItem`

- `Order`

- `User`

- `LoginRequest`

- `AdminMetricsDto`

## 🧪 Run Backend Locally
```
# Navigate to backend folder
cd ShopShakti_backend

# Restore NuGet packages
dotnet restore

# Update database (if using migrations)
dotnet ef database update

# Start the server
dotnet run
```
API Base URL: https://localhost:7171/api

Swagger: https://localhost:7171/swagger

## 🔐 Security Architecture

ShopShakti is designed with a strong focus on secure authentication, data protection, and access control. Below are the key security features implemented:

### ✅ Authentication & Authorization
- **JWT-based Authentication**  
  Secure login with JSON Web Tokens (JWT), including issuer, audience, and HMAC SHA256 signing.
- **Token Expiration & Validation**  
  Tokens expire based on a configurable time (`ExpiresInMinutes`), enforced using `ValidateLifetime` and `ClockSkew = 0`.
- **Role-Based Access Control**  
  Admin and user routes are guarded using Angular route guards (`canActivateAdmin`, `canActivateUser`).
- **Password Hashing**  
  User passwords are securely hashed using ASP.NET Core’s `PasswordHasher<T>` before being saved to the database.

### ✅ API & Backend Security
- **[Authorize] Decorators**  
  Sensitive API endpoints (e.g. profile, orders, cart) are protected using `[Authorize]`, while public routes like registration and login use `[AllowAnonymous]`.
- **CORS Policy Enforcement**  
  Backend is configured to allow only trusted frontend origins (e.g., `http://localhost:4200`).
- **Blocked User Handling**  
  Blocked users are denied access during login and receive a `403 Forbidden` response.

### ✅ Frontend Safeguards
- **JWT Interceptor**  
  Angular HTTP interceptor automatically attaches `Authorization: Bearer <token>` to every protected API request.
- **Secure Token Storage**  
  JWT and user info (excluding password) are stored safely in `localStorage`. Passwords are never exposed to the client.
- **Route Guards**  
  Angular guards restrict access to protected routes like `/profile`, `/cart`, `/checkout`, and `/admin`.

> ✅ All critical flows (login, logout, registration, token validation, admin access, and blocked user control) have been implemented securely and verified.  
This setup follows modern best practices for Angular + ASP.NET Core Web API + SQL Server applications.


## ✅ Future Enhancements

- Wishlist & Payment gateway

- Advanced search, filters, and pagination

- Product ratings and reviews

- Order tracking & invoice downloads

## 🤝 Contribution

Pull requests and suggestions are welcome! Please fork the repository and submit a PR with clear and descriptive commit messages.

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this software with attribution.  
See the [LICENSE](./LICENSE) file for full details.


## 👨‍💻 Developer Note
This project has been thoughtfully crafted as a full-stack e-commerce solution with a strong emphasis on clean architecture, intuitive UI/UX, and scalable design. Every component—from frontend interactions to backend logic—has been built with attention to performance, maintainability, and modern best practices.

## 🧑‍🎓 Developed & Maintained by:

***Prathamesh Kasar*** 
<br>
`© 2025 Prathamesh Kasar. All rights reserved.`
<br>
Please do not reproduce without proper attribution.

