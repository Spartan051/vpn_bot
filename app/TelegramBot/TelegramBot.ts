import {Context, Scenes, session, Telegraf} from "telegraf";
import {WELCOME_MESSAGE} from "./Constants/Messages.constant";
import {ScenesIdsEnum} from "./Enums/ScenesIds.enum";
import {getOrderScenes} from "./Scenes/getOrder.scenes";

export class TelegramBot{
    bot: Telegraf<Context>

    constructor(token: string) {
        this.bot = new Telegraf(token)
    }

    async init(){

    // bot actions
        // @ts-ignore
        const stage = new Scenes.Stage([getOrderScenes]);
        this.bot.use(session());
        // @ts-ignore
        this.bot.use(stage.middleware());



         this.start()

        // launch bot
        await this.bot.launch()

        // Enable graceful stop
        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }

    private  start(){
        this.bot.start((ctx)=>{
            ctx.reply(WELCOME_MESSAGE,{
                reply_markup:{
                    keyboard: [
                        [{ text: "سرویس های فعال" }, { text: "ثبت سفارش جدید" }],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            })
            // @ts-ignore
            ctx.scene.enter(ScenesIdsEnum.GET_ORDER_SCENES_ID)
        })
    }
}