# 🤖 MindVault AI

An intelligent AI knowledge assistant built with **React.js, Node.js, Express.js, MongoDB Atlas, Groq LLM, and RAG document intelligence**.

MindVault AI is a full-stack AI platform designed to provide ChatGPT-style conversations with personal knowledge management, document intelligence, and retrieval augmented generation capabilities.

---

# 📌 Overview

MindVault AI provides:

- ChatGPT-style conversations
- Persistent chat memory
- User authentication
- Role-based access control
- Admin dashboard
- File uploads
- Knowledge base management
- Document processing
- Retrieval Augmented Generation (RAG)

---

# ✨ Features

## 🤖 AI Chat System

Implemented:

- Groq AI integration
- AI assistant system prompt
- Context-aware conversations
- Persistent chat history
- Attachment awareness
- Intelligent document interaction

---

# 💬 Chat Management

Implemented:

- Create conversations
- Continue previous chats
- Edit messages
- Retry AI responses
- Rename chats
- Pin chats
- Archive chats
- Delete chats

---

# 🔐 Authentication System

Implemented:

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Role-based authorization


## User Roles

```
user
admin
```

---

# 🛠️ Admin Dashboard

Implemented:

- Admin portal
- Dashboard overview
- User management
- Chat monitoring
- Profile management
- Password updates
- Theme preferences

---

# 📁 Knowledge Base System

Implemented:

- Admin document upload
- Document listing
- Document view
- Document update workflow
- Document deletion
- PDF processing
- DOC/DOCX processing
- TXT processing


## Stored Document Information

```
Title
Filename
File Type
Mime Type
Content
Size
Processing Status
Embedding Status
Uploader
```

---

# 🧠 RAG Pipeline

## Workflow

```
Upload Document
        |
        |
Text Extraction
        |
        |
Chunk Creation
        |
        |
Generate Embeddings
        |
        |
Store Document Chunks
        |
        |
User Question
        |
        |
Semantic Retrieval
        |
        |
Send Context To AI
        |
        |
Generate Answer
```

---

## Implemented Components

- Document Model
- DocumentChunk Model
- Document extraction service
- Chunking service
- Embedding service
- Vector storage foundation
- Retrieval workflow

---

# 🗄️ Database Architecture

## Users Collection

Stores:

- User information
- Authentication data
- User roles
- Settings


---

## Chats Collection

Stores:

- User ID
- Messages
- Attachments
- Conversation data
- Chat status


---

## Documents Collection

Stores:

- Uploaded files
- Extracted content
- Processing status
- Embedding information


---

## DocumentChunks Collection

Stores:

- Document reference
- Chunk content
- Chunk order
- Metadata
- Embedding vectors

---

# 🚀 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | User Interface |
| Vite | Frontend Build Tool |
| Axios | API Communication |
| React Router | Routing |
| CSS3 | Styling |
| React Markdown | AI Response Formatting |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB Atlas | Database |
| Mongoose | Database Modeling |
| JWT | Authentication |
| bcrypt | Password Security |
| Multer | File Upload Handling |

---

## Artificial Intelligence

| Technology | Purpose |
|---|---|
| Groq API | AI Response Generation |
| LLM Models | Natural Language Processing |
| HuggingFace | Text Embeddings |

---

# 📂 Project Structure

```
MindVault-AI

backend
│
├── controllers
├── middleware
├── models
├── routes
├── services
└── server.js


frontend
│
└── src
    │
    ├── components
    ├── pages
    ├── admin
    ├── services
    └── styles
```

---

# ⚙️ Installation

## Backend Setup

```bash
cd backend

npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GROQ_API_KEY=your_groq_key

HF_API_KEY=your_huggingface_key

HF_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

Run backend:

```bash
node src/server.js
```

Backend will run:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run:

```
http://localhost:5173
```

---

# 🔒 Security

Never commit:

```
.env
node_modules
API keys
Database credentials
JWT secrets
```

---

# 📊 Development Status

## Phase 1 Completed

✅ AI Chat System  
✅ Authentication  
✅ User System  
✅ Chat Memory  

---

## Phase 2 Completed

✅ Admin Dashboard  
✅ User Management  
✅ Chat Monitoring  
✅ Admin Settings  

---

## Phase 3 Completed / Active

✅ Knowledge Base  
✅ Document Upload  
✅ Document Processing  
✅ Document Chunking  
✅ Embedding Architecture  
✅ RAG Pipeline Foundation  

---

# 🔮 Future Roadmap

- Advanced vector database integration
- Improved semantic search
- Voice assistant
- Image understanding
- Cloud deployment
- Mobile application
- Enterprise knowledge assistant

---

# 🎯 Project Vision

MindVault AI aims to become a complete personal and organizational knowledge assistant where users can communicate with their own information using natural language.

Possible applications:

- Personal AI Assistant
- Company Knowledge Bot
- Research Assistant
- Document Intelligence Platform

---

# 👨‍💻 Author

**Faisal Iqbal**

---

# 🚀 Project Status

Active Development