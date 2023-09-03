require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const {EmbedBuilder, PermissionsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
});
client.on('ready', () => {
    console.log(`${client.user.username} is online.`);
    client.user.setActivity(`no more league`,{type: 'Playing'});
    setInterval(() =>{
        const member_list = client.guilds.cache.get('1053840906958143508');
        member_list.members.cache.each(r =>{
            (async() => {
                let member = await member_list.members.fetch(r.user.id);
                if(member.presence!==null){
                    var userStatus = member.presence.activities;
                    if((`${userStatus}`)=='League of Legends'){
                        const dmEmbed = new EmbedBuilder()
                        .setColor('Blue')
                        .setDescription(`:white_check_mark: You have been **banned** | Reason: Playing League of Legends`)
                        member.send({embeds: [dmEmbed]}).catch(err => {
                            console.log(`${member.user.tag} has their dms off and cannot receive the ban message`);
                        })
                        member.ban().catch(err => {
                            console.log('Error banning' + member.user.username);                       
                        })
                    }
                }
            })()
        })
    }, 5000);
});
client.on('messageCreate', (message) =>{
    if(message.author.bot) return;
    message.reply('no more league');
    console.log(message.content);
})
client.login(process.env.TOKEN);