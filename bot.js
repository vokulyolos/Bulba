const axios = require('axios');

const { Telegraf } = require('telegraf')
const bot = new Telegraf(`5966460913:AAGAWW1QqdRhjRJ6ZYu1WHvFTw0ES8zyJKI`)

bot.start((ctx) => ctx.reply('Привет, это бот заказа "Беларусского трикотажа". Введи /help для просмотра комманд.', {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Акции",
                    callback_data: "sales"
                },
                {
                    text: "Сделать заказ",
                    callback_data: "make_order"
                }
            ]
        ]
    }
}))
bot.help((ctx) => ctx.reply('/start - запуск бота \n/help - помощь \n/about - о боте  \n/devs - о разработчиках')) //ответ бота на команду /help
bot.command('devs', ctx => ctx.reply("Бота создали: @vokul_yolos и @FantomDOOOM"))
bot.command('about', ctx => ctx.reply(`Официальный мерч "Беларусского трикотажа".`))

// инициализация объекта-хранилища
const items = [
    {
        id: 1,
        title: "Колпачок для дурачков",
        price: 1.6
    },
    {
        id: 2,
        title: "Контуш",
        price: 4.7
    },
    {
        id: 3,
        title: "Жупане хороший жиесть",
        price: 140
    }
    ,{
        id: 4,
        title: "Поршни ручной работы",
        price: 19
    }
];

//хз какие акции, потом придумаем, с 37.5 плохо думается
const sales = [
    "",
    "",
    ""
]

bot.command("sales", ctx => {
    ctx.reply(sales.join('\n'))
})
  

bot.command('make_order', ctx => {
    ctx.reply("Список товаров", {
        reply_markup: {
            inline_keyboard: {
                ...items.map(item => [{
                    text: `${item.title} - ${item.price} килограмм картошки`,
                    callback_data: `order_item_${item.id}`
                }])
            }
        }
    })
  });
  
  // команда для получения списка товаров со стоимостью и описанием
  bot.action(/order_item_(.*)/, ctx => {
   const id = Number((ctx.callbackQuery.data).replace('order_iten_', ''));

   console.log(ctx.callbackQuery.data)
   console.log('id:', id)

   ctx.reply(`Вы выбрали товар: ${items.find(item => item.id === id)?.title ?? "not found"}`,{
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Количество: 1",
                    callback_data: `order_count_${id}_1`
                }
            ],
            [
                {
                    text: "Количество: 2",
                    callback_data: `order_count_${id}_2`
                }
            ],
            [
                {
                    text: "Количество: 3",
                    callback_data: `order_count_${id}_3`
                }
            ]
        ]
    }
   })
  });

bot.action(/order_count(.*)/, (ctx) => {
    const [id, count] = (ctx.callbackQuery.data)
    .replace('order_count', '')
    .split('_')
    .map(Number)

    const userId = ctx.from?.id ?? 0;

    (order[userId] = order[userId || []]).push({
        id,
        count,
    });

    ctx.reply("Товар добавлен!", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Акции",
                        callback_data: "sales"
                    },
                    {
                        text: "Сделать заказ",
                        callback_data: "make_order"
                    },
                    {
                        text: "Корзина",
                        callback_data: "items"
                    }
                ]
            ]
        }
    })
})

bot.action('items', ctx => {
    const userId = ctx.from?.id ?? 00;

    ctx.reply(order[userId].map(item =>{
        const found = items[item.id];
        const title = found.title;
        const count = item.count;

        return `${title} (${found.price * count} кг картошки) - в количестве ${count}`
    }))
    .join('\n')
})
 bot.launch();// запуск бота