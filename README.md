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

## 🌐 Live Demo & Deployment

### Recommended Deployment: Render.com

For easy and free deployment of this chat application, I recommend using **Render.com**:

1. **Create a Render account** at [render.com](https://render.com)

2. **Deploy Application:**
   - Create a new "Web Service" on Render
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set start command: `npm start`
   - Add environment variables in Render dashboard

3. **Database:**
   - Use MongoDB Atlas (free tier) for cloud database
   - Update your MongoDB connection string in environment variables

**Why Render.com?**
- ✅ Free tier available
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Built-in SSL certificates
- ✅ Perfect for student projects like this one

---
*Built for fun ❤️*
