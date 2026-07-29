# 🤖 Personal AI Knowledge Assistant

An AI-powered personal assistant built using **React.js, Node.js, Express.js, MongoDB Atlas, and Groq AI**.

This project provides a modern conversational AI interface where users can ask questions, receive intelligent responses, and maintain conversation memory.

---

# 🚀 Features

## AI Chat System
- AI-powered conversations using Groq LLM
- Llama 3.3 AI model integration
- Real-time AI responses
- Structured Markdown responses
- Professional AI assistant behavior

## Chat Interface
- Modern responsive chat UI
- Dark mode design
- User and AI message bubbles
- Typing animation
- New chat functionality

## Database & Memory
- MongoDB Atlas integration
- Conversation storage
- Chat memory architecture
- Scalable database structure

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- CSS3
- Axios
- React Markdown
- Remark GFM


## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API Architecture


## Artificial Intelligence

- Groq API
- Llama 3.3 Model


## Database

- MongoDB Atlas

---

# 📂 Project Structure

```
personal-ai-knowledge-assistant

│
├── backend
│
│   ├── src
│   │
│   ├── config
│   │
│   ├── controllers
│   │
│   ├── models
│   │
│   ├── routes
│   │
│   ├── services
│   │
│   └── server.js
│
│
├── frontend
│
│   ├── src
│   │
│   ├── components
│   │
│   ├── services
│   │
│   ├── styles
│   │
│   └── App.jsx
│
│
└── README.md

```

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/personal-ai-knowledge-assistant.git
```

Move into project:

```bash
cd personal-ai-knowledge-assistant
```

---

# 🔹 Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
GROQ_API_KEY=your_groq_api_key

MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
node src/server.js
```

Backend will run on:

```
http://localhost:5000
```

---

# 🔹 Frontend Setup

Open another terminal:

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🔒 Environment Variables

Sensitive information is stored inside `.env` files.

The following information should never be uploaded to GitHub:

- Groq API Keys
- MongoDB Connection Strings
- Database Credentials

These files are ignored using `.gitignore`.

---

# 🧠 Application Flow

```
User
 |
 |
React Frontend
 |
 |
Express Backend API
 |
 |
Groq AI Model
 |
 |
AI Response
 |
 |
MongoDB Atlas
(Storage)
```

---

# 📸 Application Preview

Add screenshots of the application here.

Example:

- Chat Interface
- AI Responses
- MongoDB Chat Storage

---

# 🔮 Future Improvements

## Authentication
- User registration
- Login system
- User-based conversations

## Advanced Chat System
- Multiple chat sessions
- Chat history sidebar
- Rename conversations
- Delete conversations

## AI Improvements
- Better memory management
- Context-aware conversations
- Personalized responses

## Knowledge Base
- PDF upload
- Document analysis
- Personal knowledge database
- RAG (Retrieval Augmented Generation)

## Additional Features
- Voice assistant
- Image understanding
- Cloud deployment
- Mobile application

---

# 👨‍💻 Author

## Faisal Iqbal

AI-powered learning and productivity assistant project.

---

# 📌 Project Status

Current Version:

```
Phase 1 - AI Chatbot MVP
```

Completed:

✅ React Frontend  
✅ Node.js Backend  
✅ Groq AI Integration  
✅ MongoDB Atlas Connection  
✅ Chat Memory System  
✅ Responsive UI  


Future:

🚀 Building a complete personal AI knowledge platform