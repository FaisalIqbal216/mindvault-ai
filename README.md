🤖 MindVault AI

An intelligent AI knowledge assistant built with React.js, Node.js,
Express.js, MongoDB Atlas, Groq LLM and RAG document intelligence.

Overview

MindVault AI is a full-stack AI platform providing:

ChatGPT-style conversations

Persistent chat memory

User authentication

Role based access

Admin dashboard

File uploads

Knowledge base management

Document processing

Retrieval Augmented Generation (RAG)

Features

AI Chat System

Implemented:

Groq AI integration

AI assistant system prompt

Context aware conversations

Persistent chat history

Attachment awareness

Chat Management

Create conversations

Continue previous chats

Edit messages

Retry AI responses

Rename chats

Pin chats

Archive chats

Delete chats

Authentication

Registration

Login

JWT authentication

bcrypt password hashing

Protected routes

Admin/user roles

Roles:

user
admin

Admin Dashboard

Implemented:

Admin portal

Dashboard overview

User management

Chat monitoring

Profile management

Password updates

Theme preferences

Knowledge Base System

Implemented:

Admin document upload

Document listing

Document view

Document update workflow

Document deletion

PDF/DOCX/TXT processing

Stored document information:

Title
Filename
File Type
Mime Type
Content
Size
Status
Embedding Status
Uploader

RAG Pipeline

Workflow:

Upload Document
      |
Text Extraction
      |
Chunk Creation
      |
Generate Embeddings
      |
Store Document Chunks
      |
User Question
      |
Semantic Retrieval
      |
Send Context To AI
      |
Generate Answer

Implemented:

Document model

DocumentChunk model

Chunking service

Embedding service

Vector storage foundation

Retrieval workflow

Database Architecture

Users

Stores:

User information

Authentication data

Roles

Settings

Chats

Stores:

User ID

Messages

Attachments

Conversation data

Chat status

Documents

Stores:

Uploaded files

Extracted content

Processing status

Embedding information

DocumentChunks

Stores:

Document reference

Chunk content

Chunk order

Metadata

Embedding vectors

Technology Stack

Frontend

React.js

Vite

Axios

React Router

CSS3

React Markdown

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT

bcrypt

Multer

AI

Groq API

LLM integration

HuggingFace embeddings

Project Structure

MindVault-AI

backend
 ├── controllers
 ├── middleware
 ├── models
 ├── routes
 ├── services
 └── server.js

frontend
 └── src
     ├── components
     ├── pages
     ├── admin
     ├── services
     └── styles

Installation

Backend

cd backend
npm install

Environment:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_key
HF_API_KEY=your_huggingface_key
HF_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

Run:

node src/server.js

Frontend

cd frontend
npm install
npm run dev

Security

Never commit:

.env
node_modules
API keys
Database credentials
JWT secrets

Development Status

Phase 1 Completed

AI Chat

Authentication

User system

Chat memory

Phase 2 Completed

Admin dashboard

User management

Chat monitoring

Admin settings

Phase 3 Completed / Active

Knowledge Base

Document upload

Document processing

Document chunks

Embedding architecture

RAG pipeline foundation

Roadmap

Advanced vector database

Better semantic search

Voice assistant

Image understanding

Cloud deployment

Mobile application

Author

Faisal Iqbal

Status

Active Development 🚀