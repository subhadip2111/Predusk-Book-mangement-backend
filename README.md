# Books Management API

A NestJS-based RESTful API for managing books, users, authentication, and reviews.

---

## 🏗️ Project Structure

- **src/auth**: Authentication (JWT, login, register)
- **src/books**: Books CRUD and filtering
- **src/user**: User management
- **src/review**: Book reviews

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd books-management
```

### 2. Install dependencies

```bash
npm install
```

> **Note:**  
> If you face installation issues, use:
> ```bash
> npm install --legacy-peer-deps
> ```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
# Example .env Configuration

```env
PORT=4040
EXP="30d"
JWT_SECRET="your_jwt_secret_key"
# PostgreSQL Database Config
DB_TYPE=postgres
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_SYNC=true
DB_LOGGING=true
DB_SSL=true
DATABASE_URL=postgresql://your-db-username:your-db-password@your-db-host:your-db-port/your-db-name
```

> **Replace** all `your-db-*` values with your actual database credentials.


### 4. Run Database Migrations (if using TypeORM migrations)

```bash
npm run typeorm migration:run
```

### 5. Start the Application

```bash
npm run start:dev
```

### 6. Access Swagger API Docs

Visit: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🗄️ Database Diagram

```plaintext
+---------+        +---------+        +--------+
|  User   |        |  Book   |        | Review |
+---------+        +---------+        +--------+
| id      |<-----+ | id      |<-----+ | id     |
| name    |      | | title   |      | | rating |
| email   |      | | ...     |      | | comment|
| password|      | | authorId|      | | userId |
| role    |      | +---------+      | | bookId |
+---------+      +------------------+ +--------+
      ^                ^                  ^
      |                |                  |
      +----------------+------------------+
```

- **User**: Can be an author or reader.
- **Book**: Created by a user (author).
- **Review**: Linked to both a user and a book.

---

## 📒 Notes

- Use the Swagger UI to test endpoints and pass Bearer tokens for authentication.
- If you encounter dependency installation issues, use `--legacy-peer-deps` with `npm install`.
- Make sure your database is running and accessible with the credentials in your `.env`.

-

