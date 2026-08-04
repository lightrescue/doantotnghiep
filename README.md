# ViQiTech — Website bán điện thoại, laptop & máy tính bảng

Đồ án tốt nghiệp — Website thương mại điện tử với React (frontend) + Node.js/Express (backend) + MySQL.

## Tính năng chính

### Khách hàng
- Đăng ký / đăng nhập / quên mật khẩu / đổi mật khẩu (email reset qua SMTP)
- Duyệt sản phẩm theo danh mục, brand, khoảng giá; tìm kiếm + sắp xếp
- Xem chi tiết sản phẩm với gallery, phiên bản, màu sắc, voucher đi kèm
- Quản lý giỏ hàng, thanh toán (COD / chuyển khoản / thẻ / MoMo / ZaloPay)
- Áp dụng voucher giảm giá
- Theo dõi đơn hàng, hủy đơn, đánh giá sản phẩm sau khi mua
- Chatbot AI tư vấn (Google Gemini)

### Quản trị viên
- Dashboard tổng quan + thống kê doanh thu
- CRUD sản phẩm, danh mục, thương hiệu, voucher
- Quản lý đơn hàng (đổi trạng thái), người dùng (khóa/mở khóa)
- Cấu hình chatbot (lời chào, quick replies, rules)

## Stack

| | |
|---|---|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express, mysql2, bcryptjs, jsonwebtoken |
| Database | MySQL 8 |
| AI | Google Gemini API (chatbot) |
| Email | Nodemailer + Gmail SMTP |

## Cấu trúc

```
.
├── backend/          # API server (Express + MySQL)
│   ├── database/schema.sql
│   ├── src/
│   ├── .env.example
│   └── package.json
├── frontend/         # React app (Vite)
│   ├── src/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Hướng dẫn cài đặt chi tiết

### Yêu cầu hệ thống (Prerequisites)
- **Node.js** (Khuyến nghị phiên bản 18.x trở lên)
- **MySQL** (Phiên bản 8.x) đã được cài đặt và đang chạy trên máy tính.

### 1. Thiết lập Database & Backend
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt các thư viện cần thiết
npm install

# Tạo file biến môi trường (Môi trường Windows sử dụng lệnh copy, trên Mac/Linux dùng cp)
copy .env.example .env

# MỞ FILE .env VÀ ĐIỀN THÔNG TIN CƠ SỞ DỮ LIỆU CỦA BẠN:
# - DB_PASSWORD: Mật khẩu MySQL của bạn
# - (Và các thông tin khác nếu cần như SMTP, Gemini API Key)

# Khởi tạo database và dữ liệu mẫu (seed admin)
npm run seed

# Khởi động server backend
npm run dev
# Server sẽ chạy tại: http://localhost:4000
```

### 2. Thiết lập Frontend
Mở một terminal mới (giữ terminal backend đang chạy) và thực hiện:

```bash
# Di chuyển vào thư mục frontend từ thư mục gốc
cd frontend

# Cài đặt các thư viện cần thiết
npm install

# Tạo file biến môi trường
copy .env.example .env
# File .env này mặc định đã trỏ API URL về http://localhost:4000

# Khởi động ứng dụng React
npm run dev
# Mở trình duyệt và truy cập: http://localhost:5173
```

## Tài khoản mặc định

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@viqitech.vn | admin123 |

## Tài liệu chi tiết

- [Backend README](backend/README.md) — API endpoints, cấu hình SMTP, Gemini, v.v.
- [Database schema](backend/database/schema.sql) — bảng + view + trigger

## License

Đồ án giáo dục — sử dụng tự do cho mục đích học tập.
