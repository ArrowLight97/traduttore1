const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed} = require('discord.js');
const translate = require('@iamtraction/google-translate');
require('dotenv').config();
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_INTEGRATIONS
]});

client.once('ready', ()=> {
   console.log('bot online');
   client.guilds.cache.forEach(guild =>{
       client.commands.forEach(command =>{
           guild.commands.create(command.data)
       })
   })
});

client.on("messageCreate", message =>
{
    const embed_ch = new MessageEmbed()
        .setTitle("Rip Bot, Fast asleep")

    var ch = "951459271231537232"
    var canale_bot = client.channels.cache.get(ch)
    if(message.author.bot) return
    if(message.channel.id == ch){
    message.delete()
    canale_bot.send({embeds: [embed_ch]})
    console.log("rip")
    }  
})

client.commands = new Collection();

const commandFolder = fs.readdirSync(`./commands`);
for(const folder of commandFolder){
const fileComandi = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
for(const file of fileComandi) {
    const comando = require(`./commands/${folder}/${file}`);
    client.commands.set(comando.data.name, comando)
}};

client.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    command.execute(interaction)
});

client.on('messageCreate', message => {
    const prefix = "";
       if(!message.content.startsWith(prefix) ||  message.author.bot)return
    
       const args = message.content.slice(prefix.length).trim().split(/ + /);
       const command = args.shift().toLowerCase();
    
       if(!client.commands.has(command)&& !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return
    
       var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    
       if(comando.onlyStaff == true){
          if(!message.member.hasPermission("AdMINISTRATOR")){
             message.channel.send("non hai il permesso")
             return
          }
       }
    comando.execute(message,args);
    });

client.on("messageCreate", message =>
{
    var it  = "965603647989882951";
    var de  = "965603917448769546"
    var es  = "965603864277565460" 
    var en  = "965604012722368602"
    var canale_it = client.channels.cache.get(it)
    var canale_de = client.channels.cache.get(de)
    var canale_es = client.channels.cache.get(es)
    var canale_en = client.channels.cache.get(en)

    const text = message
    const translation_it =   translate(text,{from: 'auto', to: 'it'})
    const translation_de =   translate(text,{from: 'auto', to: 'de'})
    const translation_es =   translate(text,{from: 'auto', to: 'es'})
    const translation_en =   translate(text,{from: 'auto', to: 'en'});
   
const embed_it = new MessageEmbed()
    embed_it.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    embed_it.setDescription(translation_it.text)

const embed_de = new MessageEmbed()
    embed_de.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    embed_de.setDescription(translation_de.text)

const embed_es = new MessageEmbed()
    embed_es.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    embed_es.setDescription(translation_es.text)

const embed_en = new MessageEmbed()     
    embed_en.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
    embed_en.setDescription(translation_en.text)

    if(message.author.bot) return
    
    if(message.channel.id == it) 
    {
        canale_de.send({embeds: [embed_de]})
        canale_en.send({embeds: [embed_en]})    
        canale_es.send({embeds: [embed_es]})
    }
    if(message.channel.id == de) 
    {
        canale_it.send({embeds: [embed_it]})
        canale_en.send({embeds: [embed_en]})
        canale_es.send({embeds: [embed_es]})
    }
    if(message.channel.id == en) 
    {
        canale_it.send({embeds: [embed_it]})
        canale_de.send({embeds: [embed_de]})
        canale_es.send({embeds: [embed_es]})
    }
    if(message.channel.id == es) 
    {
        canale_it.send({embeds: [embed_it]})
        canale_de.send({embeds: [embed_de]})
        canale_en.send({embeds: [embed_en]})
    }
})


client.login(process.env.TOKEN);
