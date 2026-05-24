# System Architecture

This project is a lightweight LLM inference logging system built around asynchronous ingestion and queue-based processing.

The system consists of 3 main services:

- Frontend → React chat application
- Backend → Handles chat APIs, streaming responses, SDK integration, and ingestion producer logic
- Worker → Consumes ingestion jobs from Redis queue and stores processed logs into PostgreSQL

---

# High Level Flow

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
BullMQ Queue (Redis)
   ↓
Worker Service
   ↓
PostgreSQL
```

---

# Request Lifecycle

1. User sends a message from the frontend
2. Backend receives the request through `/chat`
3. Backend calls the lightweight LLM SDK
4. SDK streams the response from Gemini
5. Response is streamed back to the frontend in real time
6. SDK captures inference metadata such as:
   - provider
   - model
   - latency
   - status
   - timestamps
   - input preview
7. SDK sends telemetry asynchronously to `/ingest`
8. Backend pushes ingestion jobs into BullMQ
9. Worker consumes jobs and stores logs in PostgreSQL

---

# Why Queue-Based Ingestion?

Inference logging was intentionally separated from the main request lifecycle.

Instead of directly writing logs to the database during inference requests, logs are pushed into a Redis-backed BullMQ queue.

This provides a few advantages:

- user-facing latency remains low
- inference requests are not blocked by database operations
- backend and workers can scale independently
- ingestion becomes more reliable under burst traffic
- failed jobs can be retried separately

The queue acts as a buffer between inference serving and telemetry processing.

---

# Streaming Design

The backend uses streaming responses from the Gemini API.

Instead of waiting for the entire response to complete, chunks are streamed progressively to the frontend.

The frontend reads streamed chunks using the browser `ReadableStream` API and updates the UI incrementally.

This improves perceived responsiveness and creates a real-time chat experience.

---

# Database Design

The database contains 3 main tables:

## Conversation

Stores chat sessions.

## Message

Stores user and assistant messages for multi-turn context.

## InferenceLog

Stores inference telemetry such as:
- provider
- model
- latency
- request status
- timestamps
- conversation id
- input preview

---

# Scaling Considerations

The current architecture is intentionally lightweight, but designed to scale reasonably well.

Possible scaling improvements:

- multiple worker replicas can consume from the same BullMQ queue
- backend services can scale independently from workers
- Redis acts as a shared queue layer
- PostgreSQL indexes can be added for telemetry-heavy workloads
- ingestion services can later be extracted into separate microservices

---

# Failure Handling

A few basic failure handling assumptions were made:

- telemetry failures should not break inference responses
- ingestion is asynchronous and fire-and-forget
- worker failures are isolated from chat requests
- queue-based buffering helps absorb temporary spikes

Currently retry policies and dead-letter queues are not fully implemented, but BullMQ makes this easy to extend later.

---

# Tradeoffs

A few tradeoffs were made to keep the system lightweight and focused:

- token accounting was partially scaffolded but not fully implemented
- Prisma schema generation is centralized for simplicity
- frontend streaming implementation is intentionally lightweight
- authentication and authorization were skipped to focus on core infrastructure

---

# Future Improvements

Possible future improvements include:

- full multi-provider support
- token usage tracking
- retries + dead-letter queues
- inference dashboards
- PII redaction
- OpenTelemetry integration
- Kubernetes deployment
- authentication and rate limiting

---
<img width="1474" height="579" alt="image" src="https://github.com/user-attachments/assets/8d013a5f-96c0-446f-8909-cd50c9548440" />
