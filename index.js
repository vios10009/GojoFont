/* eslint-disable no-inline-comments */
const {
    Client,
    Intents,
    MessageEmbed,
} = require('discord.js');
const {
    token,
} = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('http');
/**
 * 客戶端指令
 * */
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

const commandToRegister = [
    {
        name: '五條體',
        description: '撰寫五/條體',
        options: [
            {
                name: 'person_a',
                description: '要輸入的文字:人物A(凡夫)',
                type: 3,
                required: true,
            },
            {
                name: 'person_b',
                description: '要輸入的文字:人物B(對手)',
                type: 3,
                required: true,
            },
            {
                name: 'ability_or_skill',
                description: '要輸入的文字:能力或技能',
                type: 3,
                required: true,
            },
            {
                name: 'event_a',
                description: '要輸入的文字:事件A',
                type: 3,
                required: true,
            },
            {
                name: 'event_b',
                description: '要輸入的文字:事件B',
                type: 3,
                required: true,
            },
            {
                name: 'image',
                description: '圖片',
                type: 3,
            },
        ],
    },
];


const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', async () => {
    console.log(`Ready！ 成功登入，BOT名稱為：${client.user.tag}`);

    // 註冊全域指令
    await rest.put(Routes.applicationCommands(client.user.id), { body: commandToRegister });

    // 顯示BOT的動態
    client.user.setActivity('五條體');

    // 獲取機器人所在的伺服器（公會）列表
    const guilds = client.guilds.cache;

    // 迴圈遍歷伺服器並記錄它們的名稱和 ID
    guilds.forEach(async (guild) => {
        console.log(`伺服器名稱：${guild.name}，伺服器 ID：${guild.id}`);
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    try {
        if (interaction.commandName === '五條體') {
            // 讀取使用者輸入的文字
            const person_a = interaction.options.getString('person_a');
            const person_b = interaction.options.getString('person_b');
            const ability_or_skill = interaction.options.getString('ability_or_skill');
            const event_a = interaction.options.getString('event_a');
            const event_b = interaction.options.getString('event_b');
            const image = interaction.options.getString('image');

            if (image) {
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setThumbnail(image)
                    .addFields({
                        name: `${person_a}：${person_b}太強了`,
                        value: `而且${person_b}還沒有使出全力的樣子
對方就算沒有${ability_or_skill}也會贏
我甚至覺得有點對不起他
我沒能在這場戰鬥讓${person_b}展現他的全部給我
殺死我的不是${event_a}或${event_b}
而是比我更強的傢伙，真是太好了`,
                    });
                await interaction.reply({ embeds: [embed] });
            }
            else {

                await interaction.reply(`
${person_a}：${person_b}太強了
而且${person_b}還沒有使出全力的樣子
對方就算沒有${ability_or_skill}也會贏
我甚至覺得有點對不起他
我沒能在這場戰鬥讓${person_b}展現他的全部給我
殺死我的不是${event_a}或${event_b}
而是比我更強的傢伙，真是太好了`);
            }
        }
    }
    catch (error) {
        console.error(error);
        return interaction.reply({ content: '執行此命令時出錯！', ephemeral: true });
    }
});

client.login(token);