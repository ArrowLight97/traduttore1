module.exports = {
    name:'ping',
    data:{
        name:'ping',
        description: 'pong',
    },
    execute(interaction){
        interaction.reply('pong!');
    }
}