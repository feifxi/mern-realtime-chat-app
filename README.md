# 💬 MERN Realtime Chat App

A sleek, real-time chat application built with the MERN stack—perfect for learning modern web development while having fun!

![Chat App Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)

## ✨ Features

- **Real-time messaging** between users with Socket.io
- **User authentication** with JWT tokens
- **Responsive UI** built with React and Tailwind CSS
- **Image upload support** via Cloudinary integration
- **Modern design** with smooth user experience

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling and responsive design

### Backend
- **Node.js & Express** - Server framework
- **Socket.io** - Real-time communication
- **MongoDB** - Database
- **JWT** - Authentication
- **Cloudinary** - Image upload and storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/feifxi/mern-realtime-chat-app.git
   cd mern-realtime-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend/` directory:
   ```env
   NODE_ENV=development
   PORT=5001
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongo_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloudname
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

---
*Built for fun ❤️*
