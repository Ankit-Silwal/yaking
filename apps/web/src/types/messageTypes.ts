export type Message={
  id:string,
  chat_id:string,
  sender_id:string,
  content:string,
  type:"text"|"video"|"pdf"|"system",
  sequence_number:string,
  client_id:string,
  created_at:string,
  delivered_to:string
}