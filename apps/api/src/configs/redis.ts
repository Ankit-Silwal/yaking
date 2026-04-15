import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

export async function setUpRedisAdapter(io:any){
   if (!process.env.REDIS_URL)
  {
    throw new Error("REDIS_URL not defined");
  }

  const pubClient=createClient({
    url:process.env.REDIS_URL
})
const subClient=pubClient.duplicate()
await pubClient.connect()
await subClient.connect()
io.adapter(createAdapter(pubClient,subClient));
console.log("Redis adapter is connected sir")
}