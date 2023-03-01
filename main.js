const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const client = new Discord.Client();
client.login('your-bot-token-goes-here');
client.on('message', async message => {
  if (message.content === '!join') {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
client.on('message', async message => {
  if (message.content.startsWith('!play')) {
    const query = message.content.substring(6);
    const searchResults = await ytsr(query, { limit: 1 });
    const videoUrl = searchResults.items[0].url;
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const stream = ytdl(videoUrl, { filter: 'audioonly' });
      const dispatcher = connection.play(stream);

      dispatcher.on('start', () => {
        console.log('Music started playing!');
      });

      dispatcher.on('finish', () => {
        console.log('Music finished playing!');
      });

      dispatcher.on('error', console.error);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
