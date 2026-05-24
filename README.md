# Ollive Assignment — LLM Inference Logging System

A lightweight LLM chatbot platform with streaming responses, multi-turn conversations, asynchronous inference logging, and queue-based ingestion architecture.

Built using Bun, React, PostgreSQL, Redis, BullMQ, and Gemini.

---

# Features

- Multi-turn chatbot conversations
- Streaming LLM responses
- Conversation persistence
- Resume previous conversations
- Lightweight LLM SDK abstraction
- Inference telemetry logging
- Async ingestion pipeline using BullMQ + Redis
- Worker-based background processing
- Docker Compose one-command setup
- Multi-provider-ready architecture

---

# Tech Stack

## Frontend
- React
- TailwindCSS

## Backend
- Bun
- Express

## Infrastructure
- PostgreSQL
- Redis
- BullMQ
- Docker Compose

## LLM
- Gemini API

## ORM
- Prisma

---

# Architecture Overview

```txt
Frontend
   ↓
Backend API
   ↓
LLM SDK
   ↓
Gemini API

SDK
   ↓
/ingest
   ↓
BullMQ Queue
   ↓
Worker Service
   ↓
PostgreSQL
```

The inference logging pipeline is asynchronous and decoupled from the user-facing request lifecycle to minimize latency impact.

---

# Project Structure

```txt
apps/
  frontend/
  backend/
  worker/
```

- frontend → React chat UI
- backend → APIs, SDK integration, ingestion producer
- worker → BullMQ consumer + DB ingestion

---

# Setup

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd ollive-assignment-1
```

---

## 2. Create `.env`

Create a `.env` file at the project root:

```env
GEMINI_API_KEY=your_api_key
```

---

## 3. Start Everything

```bash
docker compose up --build
```

---

# Services

## Frontend
```txt
http://localhost:3001
```

## Backend
```txt
http://localhost:3000
```

---

# Prisma Studio

```bash
cd apps/backend
bunx prisma studio
```

---

# Database Schema

## Conversation
Stores chat sessions.

## Message
Stores user and assistant messages.

## InferenceLog
Stores:
- provider
- model
- latency
- request status
- conversation id
- input preview
- timestamps

---

# Ingestion Flow

1. User sends message
2. Backend calls SDK
3. SDK streams response from Gemini
4. SDK captures inference metadata
5. Metadata sent to `/ingest`
6. BullMQ pushes event to Redis queue
7. Worker consumes jobs asynchronously
8. Worker stores processed logs in PostgreSQL

---

# Scaling Considerations

- Backend and worker are independently scalable
- Queue-based ingestion prevents logging from blocking inference requests
- Redis decouples producers and consumers
- Worker concurrency can be increased horizontally
- Database indexing can be added for high-volume telemetry workloads

---

# Tradeoffs

- Token usage extraction was partially scaffolded but not fully implemented due to provider-specific differences and time constraints
- Prisma schema is currently centralized in the backend service for simplicity
- Frontend streaming implementation is intentionally lightweight

---

# Future Improvements

- Full multi-provider support
- Token accounting
- Retry queues + DLQs
- Real-time inference dashboards
- PII redaction
- OpenTelemetry integration
- Kubernetes deployment
- Authentication + user management

---

# Screenshot

<img width="1917" height="947" alt="Screenshot 2026-05-24 181109" src="https://github.com/user-attachments/assets/105306fb-1be2-4cac-bf6e-a97e7f97b243" />

<img width="1474" height="579" alt="image" src="https://github.com/user-attachments/assets/6086503a-5853-4e92-b6c8-303b4b20dbdf" />



---

# Notes

This project was optimized for rapid iteration and clarity of architecture under limited development time.
