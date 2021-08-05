require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "!"
const servers = {
  'server': {
    connection: null,
    dispatcher: null
  }
}

client.on('ready', () => {
  console.log(`${client.user.username} chegou pra talaricar, ou ser corno ¯\_(ツ)_/¯`)

})

client.on('message', async (message) => {
  //filtro
  if (message.author.bot) return;


  //comandos
  if (message.content === PREFIX + 'join') {  //fazer entrar no canal de voz
    servers.server.connection = await message.member.voice.channel.join();
  }
  //play
  if (message.content === PREFIX + 'play') {
    servers.server.connection.play('./teste.mp3');
  }

  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('Você Não Aguenta Bater de Frente Pai, Esquece!');

      if (args.length === 0) return message.reply('Por Favor Forneça um ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} era um talarico e foi cortado!`))
          .catch((err) => message.channel.send('O Comando não deixou cortar o cara :('));
      } else {
        message.channel.send('O Cara deu a fuga, não conseguimos cortar')
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('Você Não Aguenta Bater de Frente Pai, Esquece!');
      if (args.length === 0) return message.reply('Por Favor Forneça um ID');
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('CPF foi deletado');
      } catch (err) {
        message.channel.send('O Cara deu a fuga, não conseguimos cortar');
      }

    }

  }
})

client.login(process.env.DISCORD_BOT_TOKEN);