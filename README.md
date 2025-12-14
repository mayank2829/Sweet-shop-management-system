🍬 Sweet Shop Management System

A full-stack web application designed to manage sweet shop operations such as user authentication, product management, cart, and orders.
Built using the MERN stack, this project simplifies shop workflows and provides a smooth user experience.

 **Live Demo:** https://sweet-shop-frontend-4q4p.onrender.com

🧱 Core Features (As per TDD Kata Requirements)
🔐 Authentication (JWT Based)

- User registration
- User login
- Token-based protected routes

🍩 Sweet Management (Protected APIs)

- Add new sweets
- View all sweets
Search sweets by:
- Name
- Category
- Price range
- Update sweet details
- Delete sweets (Admin only)

📦 Inventory Management

- Purchase sweets (quantity decreases)
- Restock sweets (Admin only)
- Automatic stock validation (purchase disabled if quantity = 0)
- Each sweet contains:
- Unique ID
- Name
- Category
- Price
- Quantity in stock

## 🌐 Live Demo

Frontend (Render):  
👉 https://sweet-shop-frontend-4q4p.onrender.com

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

🤖 My AI Usage 

🔧 AI Tools Used

- ChatGPT
- GitHub Copilot

🧠 How AI Was Used

- Brainstorming API endpoint structure
- Generating initial boilerplate code
- Writing unit and integration test templates
- Debugging failing test cases
- Improving code readability and refactoring suggestions

✍️ Human Responsibility

- All AI-generated code was reviewed, modified, and validated
- Business logic and architectural decisions were made manually
- Tests were analyzed and adjusted to ensure correctness

🪞 Reflection

AI significantly improved development speed and learning efficiency, but core problem-solving, TDD discipline, and final implementation decisions remained human-driven.

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
