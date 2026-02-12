# 📝 InfoApp - A Simple Blog App

Welcome to **InfoApp**, a full-stack blog application that allows users to:

- 🔐 Register and log in
- ✍️ Create, edit, and delete their own blogs
- 🌐 Read blogs posted by other users (publicly visible)

---

## 🔧 Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- Redux 
- vite 

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for Authentication

---

## 🚀 Features

- 🔐 **Authentication**
  - User registration and login
  - JSON Web Tokens (JWT) for secure API access

- 📝 **Blog Management**
  - Authenticated users can create, edit, and delete their blogs
  - Each blog contains a title, body, author, and timestamp

- 🌍 **Public Read Access**
  - All users (authenticated or not) can view published blogs

- 💡 **Responsive Design**
  - Mobile and desktop-friendly UI using Tailwind CSS

---

## 📂 Project Structure
 - /client --> React frontend
 - /server --> Node/Express backend
 - .gitignore --> Ignores node_modules, build files, etc.
 - README.md --> You're reading this!


---

## 🛠️ Setup Instructions

### Clone the repository:
```bash
git clone https://github.com/Neelabh-Sharma/BlogApp.git
cd blogApp
```

### SETUP BACKEND:
```
cd server
npm install
```
# create a .env file with the following variables:
```
# PORT=5000
# MONGODB_URI=your_mongo_uri
# JWT_SECRET=your_jwt_secret
npm start
```

### SETUP Frontend:
```
cd client
npm install
npm run dev  # or npm start depending on your config
```
### Deploy Links :
```
backend API : https://infoappp.onrender.com
frontend URL :https://blog-app-rosy-nine.vercel.app
```

### Author
 - Neelabh sharma
 - Kartik Joshi

#License

---

Let me know if you're deploying this somewhere (like Vercel or Render), or if you want badges, environment sample files, or database schema explanations added.




