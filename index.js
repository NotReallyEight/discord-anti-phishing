const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const scam = require('./json/scam.json')
const fetch = require('node-fetch')

client.on('messageCreate', function (message) {
    fetch('https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json')
  .then(response => response.json())
  .then(data => {
      let t;
      data.domains.forEach(domain => {
         if (message.content.includes(domain)) {
             let f = new Discord.MessageEmbed()
             .setTitle('Found phishing links')
             .setDescription("Phishing link found! ||("+domain+")||")
             .addField("Author", message.author.tag + " (" + message.author.id + ")", true)
             .setColor("RED")
             try {
                message.delete() 
                message.channel.send({ embeds: [f] })
            } catch {
                message.channel.send({ embeds: [f] })
            }
            return
         }
      })
  });

  fetch('https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/suspicious-list.json')
  .then(response => response.json())
  .then(data => {
      let t;
      data.domains.forEach(domain => {
         if (message.content.includes(domain)) {
             let f = new Discord.MessageEmbed()
             .setTitle('Found suspicious links')
             .setDescription("Suspicious link found! ||("+domain+")||")
             .addField("Author", message.author.tag + " (" + message.author.id + ")", true)
             .setColor("RED")
             try {
                message.delete() 
                message.channel.send({ embeds: [f] })
            } catch {
                message.channel.send({ embeds: [f] })
            }
            return
         }
      })
  });
})

client.login("")