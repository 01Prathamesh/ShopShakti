# 🛍️ ShopShakti {Work In Progress}

Welcome to the **ShopShakti** project — a modern, responsive e-commerce web application built using Angular. This project showcases a clean, scalable, and modular frontend architecture tailored for optimal performance and UX.

## 🚀 Features

- 🏠 **Homepage** with promotional banners and featured categories
- 🛒 **Product Listing & Detail Pages** with filtering and dynamic routing
- 👤 **Authentication**: Register, Login, Profile management
- 🧺 **Cart** with real-time updates
- 💳 **Checkout** flow with order summary and confirmation
- 📦 **Order Management**: User order history and admin management
- 🧑‍💼 **Admin Dashboard** with metrics and protected routes
- 🍞 **Toast Notifications** for user feedback
- 🧭 **Responsive Layout** with a sidebar, navbar, and footer

## 🧱 Project Structure
```
ShopShakti_frontend/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── admin/             # Admin-related views & guards
│ │ │ ├── auth_user_pages/   # Login, Register, Profile
│ │ │ ├── core_pages/        # Homepage, Products, Orders, Cart
│ │ │ ├── orders/            # Order history, success, summary
│ │ │ └── ui_ux/             # Navbar, Footer, Toast, etc.
│ │ ├── app.routes.ts        # Routing configuration
│ │ └── app.component.ts/html # Root component setup
│ ├── assets/
│ │ └── images/              # Static assets (products, banners, etc.)
│ └── index.html             # Entry HTML with external icon libraries
```

## 🛠️ Tech Stack

- **Angular 17+** with standalone components
- **TypeScript** for component logic and models
- **SCSS/CSS** for styling
- **Angular Router** for navigation and guards
- **Material Icons & FontAwesome** for UI enhancement

## 🔒 Admin Access

Admin routes are protected using an `AuthService` and `canActivateAdmin` guard. Only users with role `admin` can access the dashboard.

```ts
if (auth.isLoggedIn() && auth.isAdmin()) {
  return true;
}
```

## 📸 Assets

All required static assets (banners, categories, deals, products) are organized in the following directory structure:
```
assets/
  ├──images/
        ├── banners/
        ├── categories/
        ├── deals/
        └── products/
```

## 📦 Installation & Run
```
# Install dependencies
npm install

# Run the app locally
ng serve
```
Access the app at: http://localhost:4200

## ✅ Future Enhancements
- Integration with backend APIs

- JWT-based authentication

- Wishlist & payment gateway

- Pagination & advanced search filters

## 🤝 Contribution

Pull requests and suggestions are welcome! Please fork the repository and submit a PR with clear and descriptive commit messages.

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this software with attribution.  
See the [LICENSE](./LICENSE) file for full details.


## 👨‍💻 Developer Note
This project is developed with passion, precision, and professionalism as part of a frontend-only e-commerce solution. The structure, UI/UX, and scalability have been a top priority throughout the development process.

## 🧑‍🎓 Developed & Maintained by:

***Prathamesh Kasar*** 
<br>
`© 2025 Prathamesh Kasar. All rights reserved.`
<br>
Please do not reproduce without proper attribution.

