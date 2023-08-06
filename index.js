const Discord = require('discord.js');
const client = new Discord.Client();

// your bot token here
const BOT_TOKEN = 'Your_Bot_Token';

// Suggestion Channel ID here
const Channel_ID = 'Channel_id';

// Put your auto line link here
const mediaURL = 'Auto_Line_Link';

let totalMembersCount = 0;

client.once('ready', () => {
  console.log('Bot is ready!');
  console.log('Code by 约 - Wick');

  totalMembersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

  // custom status for bot
  client.user.setActivity(`${totalMembersCount} server members`, {
    type: 'WATCHING'
  });
});

client.on('message', async (message) => {
  if (message.channel.id === Channel_ID && !message.author.bot) {
    message.delete().catch((err) => console.error('Error deleting message:', err));

    const mentionedUser = message.mentions.users.first();

    const embed = new Discord.MessageEmbed()
      .setTitle('New Suggestion:')
      .setDescription(`\`\`\`${message.content}\`\`\``)
      .setColor('#1da9ce')
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL());

    try {
      const sentEmbed = await message.channel.send(embed);

      // Reactions on embed of suggestion message
      await sentEmbed.react('✅');
      await sentEmbed.react('❎'); 

      sentEmbed.channel.send(mediaURL);
    } catch (err) {
      console.error('Error sending embed or media:', err);
    }
  }
});

client.login(BOT_TOKEN);
