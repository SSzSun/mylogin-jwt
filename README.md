# Login JWT

ระบบ Authentication ด้วย JWT ประกอบด้วย Go backend และ Angular frontend

## Tech Stack

| ส่วน | เทคโนโลยี |
|------|-----------|
| Backend | Go 1.26, Gin, GORM, PostgreSQL |
| Auth | JWT (golang-jwt/jwt v5), bcrypt |
| Frontend | Angular 21, TailwindCSS v4 |

## โครงสร้างโปรเจกต์

```
mylogin-jwt/
├── backend/
│   ├── config/          # เชื่อมต่อ DB และโหลด .env
│   ├── controllers/     # handler ของแต่ละ endpoint
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # User model (GORM)
│   ├── routes/          # กำหนด route และ CORS
│   ├── utils/           # bcrypt และ JWT helper
│   └── main.go
└── frontend/
    └── src/app/
        ├── guards/      # route guard (ป้องกัน /profile)
        ├── interceptors/ # แนบ Authorization header อัตโนมัติ
        ├── pages/       # login / register / profile
        └── services/    # AuthService (HTTP calls)
```

## API Endpoints

| Method | Path | Auth | คำอธิบาย |
|--------|------|------|----------|
| POST | `/register` | — | สมัครสมาชิก |
| POST | `/login` | — | เข้าสู่ระบบ รับ JWT token กลับ |
| GET | `/profile` | Bearer Token | ดึงข้อมูล user ที่ login อยู่ |

### ตัวอย่าง Request

**Register**
```json
POST /register
{ "username": "john", "password": "1234" }
```

**Login**
```json
POST /login
{ "username": "john", "password": "1234" }
```
```json
// Response
{ "token": "<jwt_token>" }
```

**Profile**
```
GET /profile
Authorization: Bearer <jwt_token>
```

## การติดตั้งและรัน

### ข้อกำหนด

- Go 1.21+
- Node.js 20+
- PostgreSQL

### 0. สร้างฐานข้อมูล
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 1. ตั้งค่า Environment

```bash
cp backend/.env.example backend/.env
```

แก้ไขค่าใน `backend/.env`:

```env
PORT=8080

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=mylogin_db

JWT_SECRET=your_secret_key
```

### 2. รัน Backend

```bash
cd backend
go mod tidy
go run main.go
```

Server จะรันที่ `http://localhost:8080`

### 3. รัน Frontend

```bash
cd frontend
npm install
npm start
```

เปิดที่ `http://localhost:4200`

## Validation Rules

| Field | Rule |
|-------|------|
| Username | อย่างน้อย 3 ตัวอักษร, ห้ามซ้ำ |
| Password | อย่างน้อย 8 ตัว มีพิมพ์ใหญ่และเล็กอย่างละ 1 ตัว |

## หมายเหตุ

- JWT มีอายุ **1 ชั่วโมง** หลังหมดอายุต้อง login ใหม่
- Password เก็บเป็น bcrypt hash (cost 14)
- CORS อนุญาตเฉพาะ `http://localhost:4200`

## Show Case

### 1. login
<img width="720" height="576" alt="Screenshot 2026-04-10 193741" src="https://github.com/user-attachments/assets/e4808eb4-7cd3-42f5-bee5-074f270c413a" /> 
<img width="720" height="576" alt="Screenshot 2026-04-10 193751" src="https://github.com/user-attachments/assets/04c285b1-7020-4c03-b074-4a4db4a4fea9" />
<img width="720" height="576" alt="Screenshot 2026-04-10 193759" src="https://github.com/user-attachments/assets/b01f5589-c89f-44d1-b988-6a2b63ca2df1" />

### 2.Register
<img width="720" height="576" alt="Screenshot 2026-04-10 194738" src="https://github.com/user-attachments/assets/20c0be73-0627-47b3-8e83-db923a065b8e" />
<img width="720" height="576" alt="Screenshot 2026-04-10 194810" src="https://github.com/user-attachments/assets/0ddccc21-52e1-4c5d-8ca4-f5822b3bfd55" />
<img width="720" height="576" alt="Screenshot 2026-04-10 195049" src="https://github.com/user-attachments/assets/791bcfdc-70c3-436f-a449-fb6c6f4b164b" />

### 3.Profile
<img width="720" height="576" alt="Screenshot 2026-04-10 193813" src="https://github.com/user-attachments/assets/c10854d8-48f0-4271-89c3-74493bd7ab9d" />
