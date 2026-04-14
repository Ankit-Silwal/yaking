import "dotenv/config"
import { createServer } from "http";
import app from "./app.js"
const PORT=process.env.PORT;
import { initilizeSocket } from "./socket.js";
app.get("health",(req,res)=>{
  return res.json({
    success:true
  })
})

const http=createServer(app);
initilizeSocket(http)

http.listen(PORT,()=>{
  console.log(`Backend server has begun at port ${PORT}`)
})
