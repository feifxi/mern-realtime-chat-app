# MERN Real-Time Chat App

A sleek, real-time chat application built with the MERN stack—perfect for learning modern web development while having fun!

---

## 🚀 Features
- Real-time messaging between users
- User authentication with JWT
- Responsive UI with React and Tailwind CSS
- Image upload support (via Cloudinary)

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, Socket.io, MongoDB, JWT, Cloudinary

---

## ⚙️ Getting Started

To run this project locally:

```bash
# 1. Clone the repository
git clone https://github.com/feifxi/mern-realtime-chat-app.git
cd mern-realtime-chat-app

# 2. Install dependencies
npm install

# 3. Create an .env file in backend/ and add:
NODE_ENV=development
PORT=5001
JWT_SECRET=your_secret_key
MONGO_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloudname
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# 4. Start the app in development mode
npm run dev

# (Optional) Build for production
npm run build

# (Optional) Run in production mode
npm start
