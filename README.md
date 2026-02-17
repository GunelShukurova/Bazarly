# 🛒 Bazarly — E-Commerce Web Application

**Bazarly** is a modern full-stack e-commerce web application built with React. It provides a smooth shopping experience for users and a powerful admin panel for store management.

---

## ✨ Live Demo

> *(Add your deployed link here)*
> 👉 [[https://your-demo-link.com](https://your-demo-link.com](https://bazarly-virid.vercel.app/)

---

# 🚀 Features

## 👤 Client Features

### Authentication

* Secure login & registration
* Form validation with Formik + Yup
* Password visibility toggle
* Toast notifications
* Role-based authentication

### Shopping Experience

* Product browsing with filters & sorting
* Search functionality
* Favorites system
* Shopping cart management
* Discount price display
* Responsive UI

### Orders & Profile

* Checkout with balance validation
* Order history tracking
* Profile editing
* Password change
* User statistics dashboard

---

## 🛠 Admin Panel

The admin panel allows full store control.

### Admin Capabilities

* Dashboard analytics
* Product CRUD management
* Order tracking & status updates
* User moderation (ban/unban/delete)
* Reviews moderation
* Customer message management

---

# 🧰 Tech Stack

## Frontend

* React
* Redux Toolkit
* React Router
* Tailwind CSS
* Ant Design
* Formik + Yup
* Notistack
* Moment.js

## Backend (Mock API)

* JSON Server (REST API simulation)

---

# 📦 Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/bazarly.git
cd bazarly
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start JSON Server

```bash
npm run server
```

Server runs at:

```
http://localhost:3000
```

Available endpoints:

```
/users
/products
/orders
/messages
/reviews
```

## 4. Start development server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

# 🔐 Demo Credentials

## Client

```
Email: gunel23@mail.ru
Password: Gunel1223
```

## Admin

```
Email: admin@gmail.com
Password: Hello123!
```

# 📁 Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/
│   ├── client/        # Client-facing pages
│   └── admin/         # Admin panel pages
├── layout/            # Layout components
├── redux/             # Redux store & slices
├── services/          # API request services
├── types/             # TypeScript types
├── routes/            # Route configuration
└── assets/            # Images & static files
```

---

# 🔌 API Overview

The app uses a REST-style mock API.

## Users

* GET `/users`
* POST `/users`
* PATCH `/users/:id`
* DELETE `/users/:id`

## Products

* GET `/products`
* POST `/products`
* PATCH `/products/:id`
* DELETE `/products/:id`

## Orders / Messages / Reviews

Standard CRUD operations supported.

---

# 📜 License

This project is for **educational purposes only**.

---

# 👩‍💻 Author

Developed by **Gunel**

---

⭐ If you like this project, consider giving it a star!
