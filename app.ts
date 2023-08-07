import {Telegraf} from "telegraf";
import {config} from "dotenv";
import {TelegramBot} from "./app/TelegramBot/TelegramBot";

const App = async ()=>{
    // app configs
    config()

    const telegramBot = new TelegramBot(process.env.BOT_TOKEN!)

   await telegramBot.init()






}

App()