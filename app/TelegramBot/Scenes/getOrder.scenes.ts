import {Scenes} from "telegraf";
import {ScenesIdsEnum} from "../Enums/ScenesIds.enum";
import {PrismaClient} from "@prisma/client";
import {Utils} from "../../../core/Utils";
import {TimeEnum} from "../../../core/Enums";
import axios from "axios";


const prismaClient = new PrismaClient()

export const getOrderScenes = new Scenes.WizardScene(
    ScenesIdsEnum.GET_ORDER_SCENES_ID, async (ctx: Record<string, any>) => {
        if (ctx.update.message.text == "سرویس های فعال") {
            const servicesResponse = await prismaClient.service.findMany(
                {
                    where: {
                        user_id: ctx.update.message.from.id
                    },
                })
            if (!servicesResponse.length) {
                ctx.reply("شما سرویس فعالی در حال حاضر ندارید", {
                    reply_markup: {
                        keyboard: [
                            [{text: "سرویس های فعال"}, {text: "ثبت سفارش جدید"}],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })
            } else {
                ctx.reply(`شما ${servicesResponse.length} فعال دارید`, {
                    reply_markup: {
                        keyboard: [
                            [{text: "سرویس های فعال"}, {text: "ثبت سفارش جدید"}],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })
                servicesResponse.map(async (service: Record<string, any>) => {
                    const expireTime = await Utils.timeDifference(service.start_time, new Date(), TimeEnum.DAY)

                    await ctx.reply(`حجم: ${service.size}
            تاریخ شروع: ${service.start_time}
            مهلت باقیمانده: ${expireTime}
            کانفیگ: ${service.key}`)
                })

            }
        }
        const response1 = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
                amount: 50_000,
                currency: "IRT",
                description: "سرویس یک",
                callback_url: "https://mr-mmd.ir"
            })

        const response2 = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
                amount: 85_000,
                currency: "IRT",
                description: "سرویس دو",
                callback_url: "https://mr-mmd.ir"
            })

        const response3 = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
                amount: 120_000,
                currency: "IRT",
                description: "سرویس سه",
                callback_url: "https://mr-mmd.ir"
            })

        const response4 = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
                amount: 180_000,
                currency: "IRT",
                description: "سرویس چهار",
                callback_url: "https://mr-mmd.ir"
            })

        const response5 = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
                amount: 300_000,
                currency: "IRT",
                description: "سرویس پنج",
                callback_url: "https://mr-mmd.ir"
            })

        const response6 = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
                amount: 450_000,
                currency: "IRT",
                description: "سرویس شش",
                callback_url: "https://mr-mmd.ir"
            })


        if (ctx.update.message.text == "ثبت سفارش جدید") {
            await ctx.reply("کانفیگ های پرسرعت", {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "یک ماهه 20 گیگ",
                            url: `https://www.zarinpal.com/pg/StartPay/${response1.data.data.authority}`,
                            callback_data: JSON.stringify({
                                userId: ctx.update.message.from.id,
                                authority: response1.data.data.authority
                            })
                        }],
                        [{
                            text: "یک ماهه 40 گیگ",
                            url: `https://www.zarinpal.com/pg/StartPay/${response2.data.data.authority}`,
                            callback_data: JSON.stringify({
                                userId: ctx.update.message.from.id,
                                authority: response2.data.data.authority
                            }) }],
                        [{
                            text: "یک ماهه نامحدود یک کاربره",
                            url: `https://www.zarinpal.com/pg/StartPay/${response3.data.data.authority}`,
                            callback_data: JSON.stringify({
                                userId: ctx.update.message.from.id,
                                authority: response3.data.data.authority
                            })
                        }],
                        [{
                            text: "یک ماهه نامحدود دو کاربره",
                            url: `https://www.zarinpal.com/pg/StartPay/${response4.data.data.authority}`,
                            callback_data: JSON.stringify({
                                userId: ctx.update.message.from.id,
                                authority: response4.data.data.authority
                            })
                        }],
                        [{
                            text: "سه ماهه نامحدود یک کاربره",
                            url: `https://www.zarinpal.com/pg/StartPay/${response5.data.data.authority}`,
                            callback_data: JSON.stringify({
                                userId: ctx.update.message.from.id,
                                authority: response5.data.data.authority
                            })
                        }],
                        [{
                            text: "سه ماهه نامحدود دو کاربره",
                            url: `https://www.zarinpal.com/pg/StartPay/${response6.data.data.authority}`,
                            callback_data: JSON.stringify({
                                userId: ctx.update.message.from.id,
                                authority: response6.data.data.authority
                            })
                        }],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            })
        }

    })


getOrderScenes.action(/.*/,(ctx)=>{
    console.log(JSON.stringify(ctx))
})

