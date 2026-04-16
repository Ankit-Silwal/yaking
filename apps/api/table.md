CREATE TABLE users (
  id uuid PRIMARY KEY default gen_random_uuid(),
  google_id TEXT UNIQUE,
  email TEXT UNIQUE,
  name TEXT,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE chat_type AS ENUM ('direct', 'group');

CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  type chat_type NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE member_role AS ENUM ('admin', 'member');

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role member_role NOT NULL DEFAULT 'member',
  join_sequence_number BIGINT default 0,
  last_seen_sequence_number BIGINT default 0,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, chat_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,

  content TEXT,
  type TEXT DEFAULT 'text',

  sequence_number BIGINT NOT NULL,
  client_id UUID NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  delivered_to JSONB DEFAULT '[]'
  UNIQUE(client_id),
  UNIQUE(chat_id, sequence_number)
);

CREATE INDEX idx_messages_chat_id_seq
ON messages(chat_id, sequence_number);

CREATE INDEX idx_memberships_user
ON memberships(user_id);

CREATE INDEX idx_memberships_chat
ON memberships(chat_id);