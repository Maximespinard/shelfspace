# ShelfSpace

A beautifully crafted personal collection manager. Built with **React**, **NestJS**, and a lot of 💙.

Create, organize, and explore your personal collection! With images, categories, filters, and a slick fullstack UX.

---

## Tech Stack

### Frontend (`/client`)

- React + Vite + TypeScript
- TailwindCSS + shadcn/ui + Framer Motion
- Zod + React Hook Form
- Zustand for state management

### Backend (`/server`)

- NestJS (TypeScript, REST API)
- MongoDB via Mongoose
- JWT Auth (Access + Refresh)
- MinIO (S3-compatible) for image storage
- Class-validator, class-transformer, Helmet, RateLimiter

---

## Features

- Auth (Login, Register)
- Full CRUD for items with image upload
- Full category CRUD system with color tags and in-place editing
- Filter & Search (price, date, category, name)
- Skeleton loading states, animated UI
- Responsive design + polished UX

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/Maximespinard/shelfspace.git
cd shelfspace
```

### 2. Create `.env` files

**Required `.env` files**:

- `/.env` (root) → MinIO config (used by Docker / backend integration)
- `/client/.env` → frontend environment variables
- `/server/.env` → backend (NestJS) config

You can find `.env.example` files in each folder to help you get started.  
Make sure to duplicate and fill them in before running the project.

### 3. Start with Docker (Mongo + MinIO)

```bash
docker compose up -d
```

### 4. Start the dev servers

**Backend**:

```bash
cd server
npm install
npm run start:dev
```

**Frontend**:

```bash
cd client
npm install
npm run dev
```

---

## 👤 Author

[@Maximespinard](https://github.com/Maximespinard)

Feel free to contact me if you’re hiring or want to collab!

---

## Why ShelfSpace exists

This is more than a CRUD project. It’s a complete, polished portfolio piece aimed at showcasing high-quality fullstack architecture, scalable frontend code, and smooth UX for real-world use cases.
