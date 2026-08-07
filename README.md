# 🤖 MindVault AI

An intelligent MindVault-AI built using **React.js, Node.js, Express.js, MongoDB Atlas, and Groq LLM**.

This project provides a ChatGPT-like conversational experience with persistent conversation memory, user-based chat management, file upload support, and a scalable architecture designed for future **RAG (Retrieval Augmented Generation)** implementation.

The objective of this project is to build a complete AI knowledge platform where users can communicate with AI, maintain conversations, manage personal information, and later retrieve intelligent answers from their own uploaded knowledge sources.

---

# 🚀 Project Overview

MindVault AI is a full-stack AI application that combines:

- Modern conversational AI interface
- Large Language Model integration
- Persistent conversation memory
- User authentication architecture
- Chat management system
- File/document upload foundation
- Scalable backend API architecture


## Application Architecture

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
✅ Professional AI assistant behavior  
✅ Conversation memory support  


The AI service maintains previous conversation history and uses it as context while generating responses.

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
✅ Regenerate AI responses  
✅ Retry AI answers  


## Chat Organization

Implemented:

✅ Rename conversations  
✅ Pin important chats  
✅ Archive conversations  
✅ Mark important conversations  
✅ Delete conversations  

---

# 👤 User System

Implemented:

✅ User authentication architecture  
✅ User-based conversation storage  
✅ Profile management structure  
✅ User settings structure  


Each user's conversations and data are separated and managed independently.

---

# 📁 File Upload System

Implemented foundation for AI document interaction.

Supported:

✅ Image upload  
✅ Document upload  
✅ File metadata storage  
✅ Attachment handling inside messages  


Stored file information:

```
File Name
File Type
Mime Type
File Size
Upload Date
```


This feature provides the foundation for future:

- PDF processing
- Document understanding
- Knowledge base creation
- RAG implementation

---

# 🗄 Database Architecture

Database:

**MongoDB Atlas**


## Users Collection

Stores:

```
User Information
Authentication Data
Profile Details
User Settings
```


## Chats Collection

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


## Message Structure

```javascript
{
    role: "user",
    content: "message",
    attachment: {
        name: "",
        type: "",
        size: ""
    }
}
```

---

# 🛠 Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| Vite | Frontend Build Tool |
| Axios | API Communication |
| CSS3 | UI Styling |
| React Markdown | AI Response Formatting |
| Remark GFM | Markdown Support |


---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Backend Runtime |
| Express.js | REST API Framework |
| MongoDB | Database |
| Mongoose | Database Modeling |
| Multer | File Upload Handling |
| JWT | Authentication |


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
│   ├── src
│   │
│   ├── config
│   │
│   ├── controllers
│   │
│   ├── middleware
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

## Clone Repository

```bash
git clone https://github.com/yourusername/mindvault-ai.git
```

Navigate into project:

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
node src/server.js
```


Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:


Navigate:

```bash
cd frontend
```


Install dependencies:

```bash
npm install
```


Run application:

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


The following files should remain private:

```
.env
node_modules
uploads
```


Protected information:

✅ API Keys  
✅ Database credentials  
✅ Authentication secrets  

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

# 📸 Application Screenshots

Add screenshots of:

- Login Page
- Chat Interface
- Sidebar Conversations
- File Upload Feature
- Profile Section

---

# 🔮 Future Roadmap

# Phase 2 — mindvault-ai


## Vector Database Integration

Planned:

- MongoDB Vector Search
- Text embeddings generation
- Semantic search
- Knowledge retrieval system


Purpose:

Allow AI to search and answer questions from uploaded documents.

---

# RAG (Retrieval Augmented Generation)

Future workflow:

```
User Question

        |

Convert Question Into Embedding

        |

Search Relevant Documents

        |

Retrieve Knowledge

        |

Send Context To AI Model

        |

Generate Accurate Answer
```


Possible applications:

- University Information Assistant
- Company Knowledge Assistant
- Personal Document Assistant
- Research Assistant

---

# Additional Future Features

Planned:

🚀 Admin Dashboard

🚀 Document Management System

🚀 PDF Knowledge Base

🚀 Advanced File Understanding

🚀 Image Understanding

🚀 Voice Assistant

🚀 Cloud Deployment

🚀 Mobile Application


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
✅ User Profile Structure  
✅ File Upload Foundation  


---

# 🎯 Project Vision

The long-term goal is to transform this project into a complete AI knowledge platform where users and organizations can communicate with their own information using natural language.

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