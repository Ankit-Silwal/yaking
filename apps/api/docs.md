# Gatherly Premium – API Documentation

## Overview

Gatherly Premium is a monorepo project built with Turborepo. It features a modular architecture with separate applications for the API and the web frontend, along with shared packages for common functionality like database connections, UI components, and configurations.

The backend is a robust system built with Node.js and Express.js, utilizing TypeScript for type safety. It integrates with PostgreSQL for the primary database, Supabase for file storage, Redis for caching and real-time user status, and Socket.IO for WebSocket-based communication. Authentication is handled using Passport.js with a Google OAuth 2.0 strategy and JWTs for session management.

---

## Technologies Used

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via `pg`)
- **File Storage:** Supabase Storage
- **Authentication:** Passport.js (Google OAuth 2.0), JSON Web Tokens (JWT)
- **File Uploads:** Multer (memory storage)
- **Real-time Communication:** Socket.IO
- **Caching & Presence:** Redis (via `ioredis`)
- **Monorepo Management:** Turborepo
- **Development:** ESLint, Prettier, TypeScript

---

## API Endpoints

All endpoints that require authentication expect a `Bearer` token in the `Authorization` header.
`Authorization: Bearer <YOUR_JWT_TOKEN>`

---

### Authentication (`/auth`)

Handles user authentication via Google OAuth.

- **`GET /auth/google`**
  - **Description:** Initiates the Google OAuth 2.0 login flow. Redirects the user to the Google consent screen.
  - **Response:** Redirects to Google's authentication service.

- **`GET /auth/google/callback`**
  - **Description:** Handles the callback from Google after successful authentication. If the user is new, it creates a new user record. It issues a JWT and redirects the user to the frontend application.
  - **Response:** Redirects to the frontend with the JWT.

- **`GET /auth/me`**
  - **Description:** Retrieves the profile of the currently authenticated user.
  - **Authentication:** Required (JWT).
  - **Response:**
    ```json
    {
      "message": "You are authenticated",
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      }
    }
    ```

---

### Chat Management (`/chat`)

Manages chat rooms, memberships, and user interactions within chats.
**All endpoints require authentication.**

- **`POST /`**
  - **Description:** Creates a new chat. The creator is automatically added as an admin member.
  - **Body:**
    ```json
    {
      "name": "string",
      "isPrivate": "boolean"
    }
    ```
  - **Response:** The newly created chat object.

- **`POST /:chatId/members`**
  - **Description:** Adds a new member to a specified chat. Only an admin of the chat can perform this action.
  - **URL Params:** `chatId` (string)
  - **Body:**
    ```json
    {
      "targetUserId": "string"
    }
    ```
  - **Response:** Success message.

- **`DELETE /:chatId/members`**
  - **Description:** Removes a member from a chat. Only an admin of the chat can perform this action.
  - **URL Params:** `chatId` (string)
  - **Body:**
    ```json
    {
      "targetUserId": "string"
    }
    ```
  - **Response:** Success message.

- **`POST /:chatId/leave`**
  - **Description:** Allows an authenticated user to leave a chat. An admin cannot leave if they are the sole admin of the chat.
  - **URL Params:** `chatId` (string)
  - **Response:** Success message.

---

### Messages & Files (`/messages`)

Handles sending, retrieving, and managing messages and file uploads.
**All endpoints require authentication.**

- **`POST /upload`**
  - **Description:** Uploads a file (image or PDF) to Supabase storage.
  - **Form Data:** `file` (single file, max 5MB, must be an image or PDF).
  - **Response:**
    ```json
    {
      "url": "string",
      "type": "image" | "pdf"
    }
    ```

- **`GET /:chatId/messages`**
  - **Description:** Retrieves messages for a specific chat with cursor-based pagination.
  - **URL Params:** `chatId` (string)
  - **Query Params:**
    - `cursor` (optional, number): The sequence number to start fetching messages from (exclusive).
    - `limit` (optional, number): The maximum number of messages to return (default: 50, max: 100).
  - **Response:**
    ```json
    {
      "messages": [
        /* Message objects */
      ]
    }
    ```
  - **Errors:**
    - `401 Unauthorized`: If the user is not authenticated.
    - `400 Bad Request`: If `chatId` is missing or params are invalid.
    - `403 Forbidden`: If the user is not a member of the chat.

- **`GET /unread-counts`**
  - **Description:** Gets the unread message counts for all chats the authenticated user is a member of.
  - **Response:**
    ```json
    {
      "unread": {
        "[chatId]": "number"
      }
    }
    ```

---

## Real-time (Socket.IO) Events

### Connection & Authentication

Clients connect to the backend via Socket.IO. Authentication is required and is performed by sending a JWT in the `auth` payload of the connection options.

```javascript
const socket = io("http://localhost:5000", {
  auth: {
    token: "YOUR_JWT_TOKEN"
  }
});
```

### Client → Server Events

Events emitted from the client to the server.

- **`send-message`**
  - **Description:** Sends a message to a chat. The server then broadcasts it to all members of the chat.
  - **Payload:**
    ```json
    {
      "chatId": "string",
      "content": "string",
      "clientId": "string", // A unique ID generated by the client for optimistic UI updates
      "type": "text" | "image" | "pdf"
    }
    ```
  - **Callback:** Returns the created message object on success or an error object on failure.
    - `(response: { success: true, message: Message } | { error: string }) => void`

- **`join-chat`**
  - **Description:** Allows a user to join a specific chat room to receive real-time updates for that chat.
  - **Payload:** `{ "chatId": "string" }`

- **`message-delivered`**
  - **Description:** Sent by the client to confirm that a message has been delivered to them.
  - **Payload:** `{ "messageId": "string" }`

- **`sync-messages`**
  - **Description:** Requests a sync of messages for a given chat.
  - **Payload:** `{ "chatId": "string" }`

### Server → Client Events

Events broadcasted from the server to clients.

- **`new-message`**
  - **Description:** Broadcasts a new message to all members of a chat.
  - **Payload:** The full message object.

- **`added_to_chat`**
  - **Description:** Notifies a user that they have been added to a new chat.
  - **Payload:** `{ "chatId": "string" }`

- **`removed_from_chat`**
  - **Description:** Notifies a user that they have been removed from a chat.
  - **Payload:** `{ "chatId": "string" }`

- **`user-online` / `user-offline`**
  - **Description:** Broadcasts the online/offline status of users to the chats they are members of.
  - **Payload:** `{ "userId": "string" }`

- **`unread-update`**
  - **Description:** Sent to a user to notify them of a new unread message, incrementing their count for a specific chat.
  - **Payload:** `{ "chatId": "string", "increment": 1 }`

- **`message-delivered-update`**
  - **Description:** Notifies the sender that a message has been delivered to a recipient.
  - **Payload:** `{ "messageId": "string", "userId": "string" }`

---

## Shared Packages

- **`@repo/shared`:** Contains shared utilities, including the database (PostgreSQL) connection pool and Redis client.
- **`@repo/ui`:** A library of shared React UI components used in the web application.
- **`@repo/eslint-config`:** Shared ESLint configurations to enforce consistent coding standards.
- **`@repo/typescript-config`:** Shared TypeScript `tsconfig.json` files for consistent compiler options.

---

## Environment Variables

The following environment variables are required to run the API server.

- `PORT`: The port for the API server (e.g., `5000`).
- `DB_URL`: The connection string for the PostgreSQL database.
- `SUPABASE_URL`: The URL for your Supabase project.
- `SUPABASE_SECRET`: The secret key for your Supabase project.
- `BUCKET_NAME`: The name of the Supabase Storage bucket for file uploads.
- `REDIS_URL`: The connection string for the Redis instance.
- `JWT_SECRET`: A secret key for signing and verifying JWTs.
- `FPORT`: The URL of the frontend application for OAuth redirects (e.g., `http://localhost:3000`).

---
