# 📚 ShelfSpace

> **🌐 [Live Demo](https://shelfspace-omega.vercel.app)** | **📡 [API](https://shelfspace-production.up.railway.app/api/docs)**

ShelfSpace is a beautifully crafted personal collection manager designed to help you create, organize, and explore your treasured items through an elegant and intuitive interface with advanced filtering, category management, and visual organization tools.

Built with a modern fullstack architecture, ShelfSpace combines a polished user experience with robust backend services to deliver a production-ready application for managing personal collections.

## 🚀 Tech Stack

### Frontend

- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development across the entire stack
- **Vite** - Lightning-fast build tool with hot module replacement
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautiful, accessible, and customizable component library
- **Framer Motion** - Smooth animations and interactive transitions
- **React Hook Form + Zod** - Type-safe form handling with schema validation
- **TanStack Query** - Powerful server state management with caching
- **Zustand** - Lightweight state management for client state
- **React Router v7** - Modern client-side routing
- **Axios** - Promise-based HTTP client with interceptors
- **React Dropzone** - Drag-and-drop file uploads
- **Lucide React** - Beautiful and consistent icon library

### Backend

- **NestJS v11** - Progressive Node.js framework for scalable applications
- **TypeScript** - Full-stack type safety
- **MongoDB** - NoSQL database for flexible data modeling
- **Mongoose ODM** - Elegant MongoDB object modeling
- **JWT Authentication** - Secure token-based auth with refresh tokens
- **bcrypt** - Industry-standard password hashing
- **Sharp** - High-performance image processing and optimization (resize + WebP conversion)
- **MinIO** - S3-compatible object storage for images
- **Class Validator** - Decorator-based validation for DTOs
- **Class Transformer** - Object transformation with decorators
- **Helmet** - Security middleware for HTTP headers
- **Throttler** - Rate limiting for API protection
- **Swagger** - Auto-generated API documentation

### Development Tools

- **ESLint** - Code linting and quality enforcement
- **Prettier** - Consistent code formatting
- **Docker Compose** - Local infrastructure orchestration
- **Git** - Version control
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
shelfspace/
├── client/                        # React frontend application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── layout/           # App layout components
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── PrivateLayout.tsx
│   │   │   │   ├── PublicLayout.tsx
│   │   │   │   └── UserNavbar.tsx
│   │   │   ├── toasts/           # Toast notification components
│   │   │   │   ├── ErrorToast.tsx
│   │   │   │   ├── SuccessToast.tsx
│   │   │   │   └── getToastContent helpers
│   │   │   └── ui/               # UI component library
│   │   │       ├── animated/     # Framer Motion components
│   │   │       ├── base/         # Base wrapper components
│   │   │       └── shadcn/       # shadcn/ui components
│   │   ├── constants/            # App constants
│   │   │   ├── colors.ts         # Color definitions
│   │   │   └── filters.ts        # Filter constants
│   │   ├── features/             # Feature-based modules
│   │   │   ├── auth/             # Authentication system
│   │   │   │   ├── api/          # Auth API calls
│   │   │   │   ├── components/   # Login/Register pages
│   │   │   │   ├── hooks/        # Auth form hooks
│   │   │   │   ├── schemas/      # Zod validation schemas
│   │   │   │   ├── store/        # Auth state (Zustand)
│   │   │   │   └── types/        # Auth TypeScript types
│   │   │   ├── categories/       # Category management
│   │   │   │   ├── api/          # Category API calls
│   │   │   │   ├── components/   # Category forms & lists
│   │   │   │   ├── hooks/        # Category hooks
│   │   │   │   ├── schemas/      # Category validation
│   │   │   │   ├── services/     # Category business logic
│   │   │   │   └── types/        # Category types
│   │   │   ├── dashboard/        # Main dashboard
│   │   │   │   ├── components/   # Dashboard UI components
│   │   │   │   └── hooks/        # Dashboard hooks
│   │   │   ├── items/            # Item CRUD operations
│   │   │   │   ├── api/          # Item API calls
│   │   │   │   ├── components/   # Item cards, forms, modals
│   │   │   │   ├── hooks/        # Item management hooks
│   │   │   │   ├── schemas/      # Item validation schemas
│   │   │   │   ├── services/     # Item business logic
│   │   │   │   ├── store/        # Item filters state
│   │   │   │   ├── types/        # Item TypeScript types
│   │   │   │   └── utils/        # Item utility functions
│   │   │   └── landing/          # Public landing page
│   │   │       └── components/   # Landing page sections
│   │   ├── hooks/                # Shared custom hooks
│   │   ├── lib/                  # Core utilities and configurations
│   │   │   ├── api/              # Axios setup & error handling
│   │   │   ├── react-query/      # React Query client & keys
│   │   │   ├── types/            # Common TypeScript types
│   │   │   └── utils/            # Utility functions
│   │   ├── services/             # Shared business logic
│   │   ├── styles/               # CSS organization
│   │   │   ├── base.css          # Base styles
│   │   │   ├── index.css         # Main stylesheet
│   │   │   ├── theme.css         # Theme variables
│   │   │   ├── typography.css    # Typography styles
│   │   │   └── utilities.css     # Utility classes
│   │   ├── types/                # Global TypeScript types
│   │   │   └── api/              # API response types
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # App entry point
│   │   └── vite-env.d.ts         # Vite type definitions
│   ├── public/                   # Static assets
│   │   ├── shelfspace-icon.svg   # App icons
│   │   └── item-placeholder.svg  # Placeholder images
│   ├── components.json           # shadcn/ui configuration
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite build configuration
│
├── server/                       # NestJS backend API
│   ├── src/
│   │   ├── auth/                 # Authentication module
│   │   │   ├── decorators/       # Custom decorators (@CurrentUser)
│   │   │   ├── dto/              # Auth DTOs (login, register, refresh)
│   │   │   ├── guards/           # JWT guards & strategies
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── categories/           # Categories module
│   │   │   ├── dto/              # Category DTOs
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   ├── categories.module.ts
│   │   │   └── category.schema.ts # Mongoose schema
│   │   ├── items/                # Items module
│   │   │   ├── dto/              # Item DTOs
│   │   │   ├── items.controller.ts
│   │   │   ├── items.service.ts
│   │   │   ├── items.module.ts
│   │   │   └── item.schema.ts    # Mongoose schema
│   │   ├── upload/               # File upload module
│   │   │   ├── upload.service.ts # MinIO integration
│   │   │   └── upload.module.ts
│   │   ├── user/                 # Users module
│   │   │   ├── user.service.ts
│   │   │   ├── user.module.ts
│   │   │   └── user.schema.ts    # Mongoose schema
│   │   ├── common/               # Shared resources
│   │   │   ├── dto/              # Common DTOs & responses
│   │   │   └── pipes/            # Custom pipes (sanitization)
│   │   ├── config/               # App configuration
│   │   │   ├── configuration.ts  # Environment config
│   │   │   └── validation.ts     # Config validation
│   │   ├── interfaces/           # TypeScript interfaces
│   │   ├── utils/                # Utility functions
│   │   ├── app.controller.ts     # Root controller
│   │   ├── app.service.ts        # Root service
│   │   ├── app.module.ts         # Root module
│   │   └── main.ts               # App entry point
│   ├── test/                     # Test files
│   │   └── app.e2e-spec.ts       # E2E tests
│   ├── package.json              # Dependencies & scripts
│   ├── tsconfig.json             # TypeScript configuration
│   └── nest-cli.json             # NestJS CLI configuration
│
├── docker-compose.yml            # Local infrastructure (MongoDB + MinIO)
├── .env.example                  # Environment template
└── README.md                     # Project documentation
```

## 🎯 Features

### 🔐 Authentication & Security

- **Secure Registration** - Email/username validation with password strength requirements
- **JWT Authentication** - Access tokens (15min) with refresh token rotation (7 days)
- **Protected Routes** - Frontend route guards and backend API protection
- **Password Security** - bcrypt hashing with salt rounds
- **Session Management** - Persistent login with secure token storage

### 📦 Item Management

- **Create Items** - Add items with title, category, description, price, acquisition date and an image
- **Optimized Images** - Automatic image compression and WebP conversion for fast loading
- **Edit Items** - Update any item property with optimistic UI updates
- **Delete Items** - Soft delete with confirmation dialogs
- **Item Cards** - Beautiful flip cards revealing details on tap
- **Quick Actions** - Edit and delete directly from card interface

### 🏷️ Category System

- **Dynamic Categories** - Create unlimited categories with custom names
- **Color Coding** - Color assignment for visual organization
- **In-place Editing** - Edit category names without leaving the page
- **Category Filtering** - Filter items by categories
- **Delete Protection** - Safe deletion with item reassignment options

### 🔍 Advanced Filtering

- **Multi-criteria Search** - Combine search terms, categories, price, date ranges and more
- **Real-time Updates** - Instant filtering with debounced search
- **Price Range** - Min/max price filtering with validation
- **Date Range** - Filter by acquisition date with calendar picker
- **Clear Filters** - One-click reset to view all items
- **URL State** - Shareable filter states via URL parameters

### 🎨 User Experience

- **Modern UI** - Clean, minimalist design with attention to detail
- **Dark Mode Ready** - Theme-aware components throughout
- **Smooth Animations** - Framer Motion for delightful interactions
- **Mobile-First** - Touch-optimized interface for all devices
- **Accessibility** - ARIA labels and keyboard navigation
- **Error Handling** - User-friendly error messages and recovery

## 📸 Screenshots

<div align="center">
  <h3>Dashboard</h3>
  <img src="https://i.imgur.com/2ywwf5x.png" alt="Dashboard Overview" width="800" />
  
  <h3>Advanced Filters</h3>
  <img src="https://i.imgur.com/2pXz6bt.png" alt="Advanced filters" width="800" />
  
  <h3>Category System</h3>
  <img src="https://i.imgur.com/Abyiavf.png" alt="Category Management" width="800" />
</div>

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB (via Docker)
- MinIO (via Docker)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Maximespinard/shelfspace.git
   cd shelfspace
   ```

2. **Create environment files**

   Copy the `.env.example` files and configure:

   ```bash
   # Root directory - MinIO configuration
   cp .env.example .env

   # Frontend configuration
   cp client/.env.example client/.env

   # Backend configuration
   cp server/.env.example server/.env
   ```

   **Root `.env`** (MinIO for Docker):

   ```env
   MINIO_ACCESS_KEY=minioadmin
   MINIO_SECRET_KEY=minioadmin
   MINIO_ENDPOINT=http://localhost:9001
   MINIO_BUCKET=covers
   ```

   **Frontend `client/.env`**:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

   **Backend `server/.env`**:

   ```env
   # App Configuration
   PORT=3000
   NODE_ENV=development

   # MongoDB
   MONGO_URI=mongodb://localhost:27017/shelfspace

   # JWT auth
   JWT_SECRET=your-super-secret-key-here
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   # MinIO
   MINIO_ACCESS_KEY=your-minio-access-key
   MINIO_SECRET_KEY=your-minio-secret-key
   MINIO_ENDPOINT=localhost
   MINIO_PORT=9000
   MINIO_USE_SSL=false
   MINIO_BUCKET=covers
   ```

3. **Start infrastructure services**

   ```bash
   docker compose up -d
   ```

   This starts:

   - MongoDB on `localhost:27017`
   - MinIO on `localhost:9000` (API) and `localhost:9001` (Console)

4. **Install dependencies**

   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

5. **Start development servers**

   In separate terminals:

   ```bash
   # Backend (http://localhost:3000)
   cd server
   npm run start:dev

   # Frontend (http://localhost:5173)
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - API Documentation: http://localhost:3000/api/docs
   - MinIO Console: http://localhost:9001 (minioadmin/minioadmin)

### Available Scripts

#### Frontend (`/client`)

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

#### Backend (`/server`)

```bash
npm run start:dev    # Start with hot reload
npm run start:prod   # Start production server
npm run build        # Build NestJS application
npm run lint         # Run ESLint with auto-fix
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Generate test coverage
```

## 🏗️ Architecture

### Frontend Architecture

ShelfSpace's frontend follows a **feature-based architecture** with clear separation of concerns:

- **Feature Modules** - Self-contained features with their own components, hooks, and types
- **Shared Components** - Reusable UI components based on shadcn/ui
- **State Management** - Zustand for client state, TanStack Query for server state
- **Type Safety** - Full TypeScript coverage with strict mode
- **API Layer** - Centralized Axios instance with interceptors
- **Form Handling** - React Hook Form with Zod schema validation

### Backend Architecture

The backend implements a **modular monolith** using NestJS best practices:

- **Module Pattern** - Each domain area is a self-contained module
- **Repository Pattern** - Services abstract database operations
- **DTO Pattern** - Input validation with class-validator
- **Guard Pattern** - JWT authentication guards protect routes
- **Exception Filters** - Centralized error handling
- **Interceptors** - Response transformation and logging

### Database Design

MongoDB collections with Mongoose schemas:

- **Users** - Authentication and profile data
- **Items** - Collection items with user reference
- **Categories** - User-specific categories
- **Relationships** - Items reference categories and users

## 📚 API Documentation

ShelfSpace provides comprehensive API documentation via Swagger/OpenAPI:

### Interactive Documentation

Access the full API documentation at http://localhost:3000/api/docs when running the backend.

### Main Endpoints

#### Authentication

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout and invalidate tokens

#### Items

- `GET /api/items` - Get all items (with filters)
- `POST /api/items` - Create new item
- `GET /api/items/:id` - Get specific item
- `PATCH /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

#### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

#### File Upload

- `POST /api/items` - Multipart upload with item data

### Request/Response Examples

All endpoints follow RESTful conventions with consistent response formats:

```json
// Success Response
{
  "data": { ... },
  "message": "Success",
  "statusCode": 200
}

// Error Response
{
  "error": "Bad Request",
  "message": ["Validation error details"],
  "statusCode": 400
}
```

## 🔒 Security

ShelfSpace implements multiple layers of security:

### Authentication & Authorization

- **JWT-based auth** with short-lived access tokens
- **Refresh token rotation** for enhanced security

### API Security

- **Helmet.js** for secure headers
- **Rate limiting** to prevent abuse
- **CORS protection** with whitelist
- **Input validation** on all endpoints
- **SQL injection prevention** via Mongoose
- **XSS protection** through React

### Data Protection

- **Password hashing** with bcrypt
- **Environment variables** for secrets
- **Secure file uploads** with type validation

## 📱 Responsive Design

ShelfSpace is built mobile-first and works beautifully across all devices:

- **📱 Mobile** (320px+) - Single column, touch-optimized
- **📱 Tablet** (768px+) - Two column grid, larger touch targets
- **💻 Laptop** (1024px+) - Three column grid, hover states
- **🖥️ Desktop** (1280px+) - Four+ column grid, full features

### Responsive Features

- **Adaptive Grid** - Column count adjusts to screen size
- **Touch Gestures** - Swipe and tap interactions on mobile
- **Drawer Navigation** - Mobile-friendly sidebar
- **Responsive Images** - Optimized loading for device size
- **Flexible Typography** - Scales appropriately across devices

## 🚢 Deployment

### Production Build

1. **Build frontend**

   ```bash
   cd client
   npm run build
   # Output in client/dist
   ```

2. **Build backend**
   ```bash
   cd server
   npm run build
   # Output in server/dist
   ```

### Environment Variables

Configure production environment variables for:

- Database connection (MongoDB Atlas)
- JWT secrets (generate secure random strings)
- MinIO/S3 credentials
- Frontend API URL

### Deployment Options

- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Railway, Render, AWS EC2, Heroku
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3, MinIO Cloud

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Maxime Spinard**

- GitHub: [@Maximespinard](https://github.com/Maximespinard)
- Portfolio: [maximespinard.dev](https://codebymax-dev.com)

---

<div align="center">
  <p>Built with ❤️ using React, ViteJs, and modern web technologies</p>
  <p>ShelfSpace - Your personal collection, beautifully organized 📚</p>
</div>
