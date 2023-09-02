# Simple Book Catallog Backend Assignment

<hr>

### Description:

This is a simple backend for a Book Listing Application. The main focus of this project is to implement CRUD operations, pagination and filtering using Prisma, Postgres and Express and Typescript.

### Technology Stack:

- TypeScript as the Programming Language.
- Express.js as the web framework.
- Prisma as the Object Realtion Model (ORM)
- postgreSQL as the database

### Live Link: https://a8-book-catalog-backend.vercel.app/

## List OF Model:
- User
- Category
- Book
- ReviewAndRating
- Order

## Application Routes:

### User
- api/v1/auth/signup (POST) `[open]`
- api/v1/auth/signin (POST) `[open]`
- api/v1/users (GET) `[admin]`
- api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) `[admin]`
- api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH) `[admin]`
- api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) `[admin]`
- api/v1/profile (GET) `[admin(specific),customer(specific)]`

### Category
- api/v1/categories/create-category (POST) `[admin]`
- api/v1/categories (GET) `[open]`
- api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET) `[open]`
- api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH) `[admin]`
- api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) `[admin]`

### Books
- api/v1/books/create-book (POST) `[admin]`
- api/v1/books (GET) `[open]`
- api/v1/books/:categoryId/category (GET) `[open]`
- api/v1/books/:id (GET) `[open]`
- api/v1/books/:id (PATCH) `[admin]`
- api/v1/books/:id (DELETE) `[admin]`

### Orders
- api/v1/orders/create-order (POST) `[customer]`
- api/v1/orders (GET) `[admin,customer(specific)]`
- api/v1/orders/:orderId (GET) `[admin,customer(specific)]`
