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
bot.help((ctx) => ctx.reply('/start - запуск бота \n/help - помощь \n/about - о боте  \n/admins - о разработчиках \n/add - добавить продукт в магазин "Беларусского трикотажа". Формат: имя цена в ведрах картошки \n/list - описание товаров')) //ответ бота на команду /help
bot.command('devs', ctx => ctx.reply("Бота создали: @vokul_yolos и @FantomDOOOM"))
bot.command('about', ctx => ctx.reply(`Официальный мерч "Беларусского трикотажа".`))

// инициализация объекта-хранилища
const items = [];
  
  // команда для добавления товара
  bot.command('add', ctx => {
    const [name, price ] = ctx.message.text
    .replace('/add ', '')
    .split(' ')

    const castedPrice = Number(price) ?? 0;

    items.push({
      name,
      price: castedPrice
    });

    ctx.reply(`Item added: ${name}`);
  });
  
  // команда для получения списка товаров со стоимостью и описанием
  bot.command('list', ctx => {
    items.forEach((item, index) => {
      ctx.reply(`Item #${index + 1}: ${item.name} - ${item.price}`);
    })
  });

bot.command('types', ctx => ctx.reply("Now you can see types programms", {
  reply_markup: {
      inline_keyboard: [
      [   
          {
              text: 'Promotional programs',
              callback_data: 'test_button'
          },
          {
              text: 'Spyware',
              callback_data: 'test_button1'
          },
          {
              text: 'Ransomware',
              callback_data: 'test_button2'
          }
      ],
      [   
          {
              text: 'Trojan programs',
              callback_data: 'test_button3'
          },
          {
              text: 'Worms',
              callback_data: 'test_button4'
          },
          {
              text: 'Bots and botnets',
              callback_data: 'test_button'
          }
      ],
      [
          {
              text: 'Logic bombs',
              callback_data: 'test_button'
          }
      ]
  ]
}
}))
 bot.launch();// запуск бота