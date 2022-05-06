module.exports = {
    name:'tony',
    data:{
        name:'tony',
        description: 'tony',
    },
    async execute(interaction){
        await interaction.reply({files:['tony.png']});
    }
}