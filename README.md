# 🤖 MindVault AI

An intelligent AI knowledge assistant built using **React.js, Node.js, Express.js, MongoDB Atlas, and Groq LLM**.

MindVault AI provides a ChatGPT-like conversational experience with persistent conversation memory, user-based chat management, file upload support, role-based administration, and a scalable architecture designed for future **RAG (Retrieval Augmented Generation)** implementation.

The objective of this project is to build a complete AI knowledge platform where users can communicate with AI, maintain conversations, manage personal information, and eventually retrieve intelligent answers from their own uploaded knowledge sources.

---

# 🚀 Project Overview

MindVault AI is a full-stack AI application combining:

- Conversational AI interface
- Large Language Model integration
- Persistent conversation memory
- User authentication system
- Role-based authorization
- Chat management system
- File upload foundation
- Admin management platform
- User profile management
- Scalable backend architecture
- Future document intelligence and RAG capabilities

---

# 🏗️ Application Architecture

```
User
 |
 |
React Frontend
 |
 |
Axios API Communication
 |
 |
Express.js Backend
 |
 |
Authentication Layer
 |
 |
AI Service Layer
 |
 |
Groq LLM (Llama 3.3)
 |
 |
MongoDB Atlas
(Database Storage)
```

---

# ✨ Features

# 🤖 AI Chat System

Implemented:

✅ Groq AI integration  
✅ Llama 3.3 model integration  
✅ Real-time AI responses  
✅ Context-aware conversations  
✅ Persistent chat memory  
✅ Professional AI assistant behavior  


The AI service maintains previous conversation history and uses stored messages as context while generating responses.

---

# 💬 Advanced Chat Management

Implemented:

✅ Create new conversations  
✅ Continue previous conversations  
✅ Store complete chat history  
✅ Chat sidebar system  
✅ Open previous conversations  
✅ Multiple chat sessions  


## Message Management

Implemented:

✅ Edit user messages  
✅ Retry AI responses  
✅ Regenerate AI answers  


## Chat Organization

Implemented:

✅ Rename conversations  
✅ Pin important chats  
✅ Archive conversations  
✅ Mark important conversations  
✅ Delete conversations  

---

# 👤 User Management System

Implemented:

✅ User registration  
✅ User login  
✅ JWT authentication  
✅ Protected routes  
✅ User-based data separation  
✅ Profile management  
✅ User settings structure  


Each user's conversations and personal information are stored independently.

---

# 🔐 Authentication & Authorization

Implemented:

✅ JWT token authentication  
✅ Secure password hashing using bcrypt  
✅ Protected frontend routes  
✅ Protected backend APIs  
✅ Role-based authorization  


User Roles:

```
user
admin
```

Admin users have additional access to the management dashboard.

---

# 🛠️ Admin Dashboard System

Implemented:

## Admin Portal

Features:

✅ Admin authentication  
✅ Professional admin layout  
✅ Sidebar navigation  
✅ Dashboard overview  
✅ User management  
✅ User chat monitoring  
✅ Profile management  
✅ Password update functionality  
✅ Theme preferences  


---

# 📊 Admin Dashboard Analytics

Dashboard provides:

```
Total Users
Total Chats
Total Documents
```

---

# 👥 User Management

Admin can view:

```
Name
Email
Role
Total Chats
Account Creation Date
```

Admin can access:

```
User Chat List
```

Privacy maintained:

✅ Admin can view chat titles and metadata  
❌ Admin cannot access private conversation content

---

# ⚙️ Admin Settings

Implemented:

✅ Update administrator profile  
✅ Change administrator password  
✅ Cancel unsaved changes  
✅ Save profile updates  
✅ Dark mode support  
✅ Light mode support  


---

# 📁 File Upload System

Implemented foundation for AI document interaction.

Supported:

✅ Image upload  
✅ Document upload foundation  
✅ File metadata storage  
✅ Attachment handling inside messages  


Stored information:

```
File Name
File Type
Mime Type
File Size
Upload Date
```

This system provides the foundation for future:

- PDF processing
- Document understanding
- Knowledge base creation
- RAG implementation

---

# 🗄️ Database Architecture

Database:

**MongoDB Atlas**

---

# Users Collection

Stores:

```
User Information
Authentication Data
Profile Details
User Settings
Role Information
```

Example:

```javascript
{
    name:"",
    email:"",
    password:"",
    role:"user/admin"
}
```

---

# Chats Collection

Stores:

```
User ID
Conversation Title
Messages
Attachments
Created Date
Updated Date
Chat Status
```

---

# Message Structure

```javascript
{
    role:"user",
    content:"message",
    attachment:{
        name:"",
        type:"",
        size:""
    }
}
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| Vite | Frontend Build Tool |
| Axios | API Communication |
| CSS3 | Responsive Styling |
| React Markdown | AI Response Formatting |
| Remark GFM | Markdown Support |


---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Backend Runtime |
| Express.js | REST API Framework |
| MongoDB Atlas | Database |
| Mongoose | Database Modeling |
| Multer | File Upload Handling |
| JWT | Authentication |
| bcrypt | Password Security |


---

## Artificial Intelligence

| Technology | Purpose |
|------------|---------|
| Groq API | AI Inference |
| Llama 3.3 | Language Model |

---

# 📂 Project Structure

```
MindVault AI

│
├── backend
│
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
│
├── frontend
│
│   ├── src
│   │
│   ├── components
│   ├── admin
│   ├── pages
│   ├── services
│   ├── styles
│   └── App.jsx
│
│
└── README.md
```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/mindvault-ai.git
```

Navigate:

```bash
cd mindvault-ai
```

---

# Backend Setup

Navigate:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key

JWT_SECRET=your_secret_key
```

Start backend:

```bash
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Security

Sensitive information should never be uploaded to GitHub.

Private files:

```
.env
node_modules
uploads
```

Protected information:

✅ API Keys  
✅ Database credentials  
✅ JWT secrets  
✅ Authentication information  

---

# 🧠 Application Workflow

```
User Message

      |

React Chat Interface

      |

Axios API Request

      |

Express Controller

      |

Authentication Layer

      |

Chat Memory Service

      |

AI Service

      |

Groq LLM

      |

AI Response

      |

MongoDB Storage
```

---

# 🔮 Future Roadmap

# Phase 3 — Document Intelligence & RAG System

Upcoming:

## Admin Knowledge Base

Planned:

✅ Admin document upload

✅ Document management panel

✅ PDF/DOCX processing

✅ Knowledge source management


---

# 📚 RAG (Retrieval Augmented Generation)

Future workflow:

```
Admin Uploads Document

        |

Text Extraction

        |

Document Chunking

        |

Generate Embeddings

        |

Store Vectors

        |

User Question

        |

Semantic Search

        |

Retrieve Relevant Knowledge

        |

Send Context To AI Model

        |

Generate Accurate Answer
```

---

# 🎓 Future Applications

MindVault AI can become:

- University Information Assistant
- Company Internal Knowledge Assistant
- Personal Document Assistant
- Research Assistant
- Enterprise Knowledge Platform


Example:

Admin uploads:

```
Foundation University Prospectus
```

Student asks:

```
What are the admission requirements for BS Computer Science?
```

AI retrieves information from the uploaded document and provides an accurate answer.

---

# 🚀 Additional Future Features

Planned:

✅ Advanced Document Management

✅ Vector Database Integration

✅ PDF Knowledge Base

✅ Image Understanding

✅ Voice Assistant

✅ Advanced Analytics

✅ Cloud Deployment

✅ Mobile Application

---

# 📌 Current Development Status

## Phase 1 Completed

✅ AI Chat System  
✅ Groq LLM Integration  
✅ MongoDB Memory System  
✅ Chat History  
✅ Sidebar Management  
✅ Message Editing  
✅ AI Retry System  
✅ User Authentication  
✅ User Profile System  
✅ File Upload Foundation  


---

## Phase 2 Completed

✅ Admin Authentication  
✅ Role Based Access Control  
✅ Admin Dashboard  
✅ User Management  
✅ User Chat Monitoring  
✅ Admin Settings  
✅ Password Management  
✅ Theme Preferences  


---

# 🎯 Project Vision

The long-term goal is to transform MindVault AI into a complete AI knowledge platform where users and organizations can communicate with their own information using natural language.

Potential implementations:

- University AI Assistant
- Company Internal Knowledge Bot
- Personal Research Assistant
- Document Intelligence Platform

---

# 👨‍💻 Author

## Faisal Iqbal

Full-stack AI application development project.

---

# ⭐ Project Status

Active Development 🚀

Building toward a complete RAG-powered MindVault-AI.