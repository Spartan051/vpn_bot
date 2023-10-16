import {Scenes} from "telegraf";
import {ScenesIdsEnum} from "../Enums/ScenesIds.enum";
import {Utils} from "../../../core/Utils";
import {TimeEnum} from "../../../core/Enums";
import axios from "axios";
import {PrismaClient} from "@prisma/client";

const prismaClient = new PrismaClient()
const services = [
    "یک ماهه 20 گیگ",
     "یک ماهه 40 گیگ",
     "یک ماهه نامحدود یک کاربره",
     "یک ماهه نامحدود دو کاربره",
     "سه ماهه نامحدود یک کاربره",
     "سه ماهه نامحدود دو کاربره",
]

export const getOrderScenes = new Scenes.WizardScene(
    ScenesIdsEnum.GET_ORDER_SCENES_ID, async (ctx: Record<string, any>) => {
        if (ctx.update?.message?.text == "سرویس های فعال") {
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


        if (ctx.update?.message?.text == "ثبت سفارش جدید") {
            await ctx.reply("کانفیگ های پرسرعت", {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "یک ماهه 20 گیگ",
                            callback_data: "service_" + JSON.stringify({
                                amount: 50_000,
                                serviceIndex:0 ,
                            })
                        }],
                        [{
                            text: "یک ماهه 40 گیگ",
                            callback_data: "service_" +  JSON.stringify({
                                amount: 85_000,
                                serviceIndex:1 ,


                            })
                        }],
                        [{
                            text: "یک ماهه نامحدود یک کاربره",
                            callback_data: "service_" +  JSON.stringify({
                                amount: 120_000,
                                serviceIndex:2 ,


                            })
                        }],
                        [{
                            text: "یک ماهه نامحدود دو کاربره",
                            callback_data: "service_" +  JSON.stringify({
                                amount: 180_000,
                                serviceIndex:3 ,


                            })
                        }],
                        [{
                            text: "سه ماهه نامحدود یک کاربره",
                            callback_data: "service_" +  JSON.stringify({
                                amount: 300_000,
                                serviceIndex:4 ,


                            })
                        }],
                        [{
                            text: "سه ماهه نامحدود دو کاربره",
                            callback_data: "service_" +  JSON.stringify({
                                amount: 450_000,
                                serviceIndex:5 ,

                            })
                        }],
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            })
        }

    })


getOrderScenes.action(/service_.*/, async (ctx) => {
    const data = JSON.parse(ctx.match[0].split("_")[1])
    const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/request.json",
        {
            merchant_id: "17b885b3-530a-4164-8311-887627e4db4f",
            currency: "IRT",
            callback_url: "https://mr-mmd.ir",
            description: "سرویس",
            amount: data.amount,

        })
    ctx.editMessageText(services[data.serviceIndex], {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "پرداخت",
                    url: `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`,
                }],
            ]
        }
    })

    prismaClient.user.create({data:{
        user_id:ctx.callbackQuery.from.id,
            active_authority:response.data.data.authority,
        }})

})

