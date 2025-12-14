🍬 Sweet Shop Management System

A full-stack web application designed to manage sweet shop operations such as user authentication, product management, cart, and orders.
Built using the MERN stack, this project simplifies shop workflows and provides a smooth user experience.

🚀 Features
👤 User Features

1. User registration & login (JWT authentication)
2. View sweets and categories
3. Add items to cart
4. Place orders
5. View order history
   
🛠️ Admin Features

1. Add, update, and delete sweets
2. Manage categories
3. View all orders
4. Secure admin routes

🧱 Tech Stack

Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

Tools

- Git & GitHub
- Postman / Thunder Client

📂 Project Structure
```
Sweet-shop-management-system/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│
└── README.md
```


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/mayank2829/Sweet-shop-management-system.git

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:
npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔐 API Testing

You can test backend APIs using:
Postman
Thunder Client (VS Code)

🧪 Sample Credentials (Optional)
Admin:
email: admin@sweetshop.com
password: admin123

User:
email: user@sweetshop.com
password: user123


📌 Future Enhancements

- Online payment integration
- Order status tracking
- Sales analytics dashboard
- Image upload for products
