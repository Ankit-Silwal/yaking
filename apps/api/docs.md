# Gatherly Premium – API Documentation

## Overview

Gatherly Premium is a monorepo project using Turborepo, featuring a modular architecture with separate apps for API and web, shared packages, and internal libraries. The backend is built with Express.js, PostgreSQL, Supabase, Redis, Socket.IO, and Passport.js for authentication.

---

## Technologies Used

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via `pg`), Supabase (file storage)
- **Authentication:** Passport.js (Google OAuth 2.0), JWT
- **File Uploads:** Multer (memory storage)
- **Real-time:** Socket.IO
- **Cache/Queue:** Redis (via `ioredis`)
- **Frontend:** Next.js, React
- **Monorepo:** Turborepo
- **Linting/Formatting:** ESLint, Prettier
- **Other:** uuid, dotenv

---

## API Endpoints

### Auth (`/auth`)

- `GET /auth/google`  
	Initiates Google OAuth login.

- `GET /auth/google/callback`  
	Handles Google OAuth callback, issues JWT, and redirects to frontend.

- `GET /auth/me`  
	Returns authenticated user info.  
	**Auth required:** Yes (JWT Bearer token)

---

### Chat (`/chat`)  
**All endpoints require authentication (JWT Bearer token).**

- `POST /chat/`  
	Create a new chat.  
	**Body:** `{ name?: string, type: "direct" | "group", memberIds?: string[] }`

- `POST /chat/:chatId/members`  
	Add a member to a chat.  
	**Body:** `{ chatId: string, targetUserId: string }`  
	**Only admin can add.**

- `DELETE /chat/:chatId/members`  
	Remove a member from a chat.  
	**Body:** `{ chatId: string, targetUserId: string }`  
	**Only admin can remove.**

- `POST /chat/:chatId/leave`  
	Leave a chat.  
	**Body:** `{ chatId: string }`  
	**Admin cannot leave if they are the only admin.**

---

### Messages (`/messages`)  
**All endpoints require authentication (JWT Bearer token).**

- `POST /messages/upload`  
	Upload a file (image or PDF) to Supabase storage.  
	**Form Data:** `file` (single file, max 5MB, image or PDF only)  
	**Returns:** `{ url: string, type: "image" | "pdf" }`

---


## Real-time (Socket.IO) Events

### Connection

- Clients connect to the backend via Socket.IO (usually at the same host/port as the API, e.g., `ws://localhost:5000`).
- Authentication is handled via a JWT token sent in the `auth` payload during connection:
	```js
	const socket = io("http://localhost:5000", {
		auth: { token: "JWT_TOKEN_HERE" }
	});
	```

### Events

#### Client → Server

- **send-message**
	- Description: Send a message to a chat.
	- Payload:
		```json
		{
			"chatId": "string",
			"content": "string",
			"clientId": "string",
			"type": "text" | "image" | "pdf"
		}
		```
	- Callback: `{ success: true, message }` or `{ error: "error message" }`

#### Server → Client

- **new-message**
	- Description: Broadcast to all users in the chat when a new message is sent.
	- Payload: The message object.

- **added_to_chat**
	- Description: Notifies a user when they are added to a chat.
	- Payload: `{ chatId: "string" }`

- **removed_from_chat**
	- Description: Notifies a user when they are removed from a chat.
	- Payload: `{ chatId: "string" }`

---

## Shared Packages

- **@repo/shared:** Database (PostgreSQL), Redis connection, environment config
- **@repo/ui:** Shared React UI components
- **@repo/eslint-config:** Shared ESLint config
- **@repo/typescript-config:** Shared TypeScript config

---

## Environment Variables

- `PORT` – API server port
- `DB_URL` – PostgreSQL connection string
- `SUPABASE_URL`, `SUPABASE_SECRET`, `BUCKET_NAME` – Supabase storage
- `REDIS_URL` – Redis connection string
- `JWT_SECRET` – JWT signing key
- `FPORT` – Frontend port for OAuth redirect

---
