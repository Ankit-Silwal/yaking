export type Chat={
  id:string,
  name:string,
  type:"group" |"direct",
  role:"admin"|"member",
  created_at:string,
  last_message_content:string,
  last_message_at:string
}