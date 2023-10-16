import {config} from "dotenv";
import {TelegramBot} from "./app/TelegramBot/TelegramBot";
import express from 'express';
import {PrismaClient} from "@prisma/client";
// app configs
config()
const prismaClient = new PrismaClient()

const telegramBot = new TelegramBot(process.env.BOT_TOKEN!)
telegramBot.init()

const app = express()
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a route
app.post('/', async (req, res) => {
   if(req.body.status){
     const user = await  prismaClient.user.findFirst({where:{
           active_authority:req.body.active_authority
           }})
       if(user){

       if(req.body.status == "OK") {
       }else{

       }
       }else{
           console.log('user not exist');

       }
   }else{
       console.log('status not exist');
   }
   res.send(1)
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




