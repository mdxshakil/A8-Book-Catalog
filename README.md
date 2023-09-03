# Simple Book Catalog Backend Project

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
- Order
- ReviewAndRating

## Application Routes:

### User
- api/v1/auth/signup (POST) `[open]`
- api/v1/auth/signin (POST) `[open]`
- api/v1/users (GET) `[admin]`
- api/v1/users/6b8325ad-8cb2-47f9-abd1-424ef6d4ec4e (Single GET) `[admin]`
- api/v1/users/6b8325ad-8cb2-47f9-abd1-424ef6d4ec4e (PATCH) `[admin]`
- api/v1/users/6b8325ad-8cb2-47f9-abd1-424ef6d4ec4e (DELETE) `[admin]`
- api/v1/profile (GET) `[admin(specific),customer(specific)]`

### Category
- api/v1/categories/create-category (POST) `[admin]`
- api/v1/categories (GET) `[open]`
- api/v1/categories/7f5432e2-7438-45b3-8c23-a92641f69909 (Single GET) `[open]`
- api/v1/categories/7f5432e2-7438-45b3-8c23-a92641f69909 (PATCH) `[admin]`
- api/v1/categories/7f5432e2-7438-45b3-8c23-a92641f69909 (DELETE) `[admin]`

### Books
- api/v1/books/create-book (POST) `[admin]`
- api/v1/books (GET) `[open]`
- api/v1/books/e42778e2-8143-4bc5-a47b-152e56156aa9/category (GET) `[open]`
- api/v1/books/69937774-0b8a-4e17-8732-7100a1dd18a8 (GET) `[open]`
- api/v1/books/69937774-0b8a-4e17-8732-7100a1dd18a8 (PATCH) `[admin]`
- api/v1/books/69937774-0b8a-4e17-8732-7100a1dd18a8 (DELETE) `[admin]`

### Orders
- api/v1/orders/create-order (POST) `[customer]`
- api/v1/orders (GET) `[admin,customer(specific)]`
- api/v1/orders/45595c66-c422-4038-ac74-4a2192bbdc17 (GET) `[admin,customer(specific)]`
