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
login-jwt/
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
