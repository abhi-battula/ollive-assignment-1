import Express, { type NextFunction, type Request, type Response }  from "express";
import { appRouter } from "./src/routes/router";
import cors from "cors";
const app = Express();
app.use(Express.json())
app.use(cors())
app.use(appRouter)

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.status(500).json({
      message: err.message
   })
})

app.get("/",(req,res)=>{
    return res.send("i am working , cool.")
})

app.listen(3000)