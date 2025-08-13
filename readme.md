 # Code Grow Communty Bot
 ### Installation

 ###  Install all the dependecies needed
 ```shell
 npm install
 ```

 ### Fill up the .env file
```js
token=
betatoken=
id=
betaID=
mongorul=
```

 -----
## Guide

 * ### Custom Database , good clone of QuickDB , since this template is made for beginners
 ```js
  client.db.set(key, value)
  
  client.db.get(key)
  
  client.db.add(key, value)
  
  client.db.delete(key)
  
  client.db.push(key, value)
  
  client.db.pull(key, value)
  
  client.db.has(key)  
   
  ```
 -----

## Creating Commands using SlashCommandBuilder

* ### Slash Commands are always created within folders of slashCommands , you can find it at src/slashCommands/xxx 
```js 
const { SlashCommandBuilder } = require("discord.js"); // make sure to define SlashCommandBuilder
module.exports = {
  data: new SlashCommandBuilder()
    .setName("commandName") 
    .setDescription("CommandDescription")
    ,
    async execute(interaction, client) {
    }
}
// You will need to check https://discordjs.guide if you find it hard to create commands 
```
## Interactive buttons 
* ### Optional, but in case you create a button thats used repeatly go to utils/buttons/xx and create a file for your button 
> example: 
```js
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
module.exports = {
  customId: "test-button", // custom id of the button
  label: "Testing Button", // button label 
  execute: async (interaction, client) => {
    // in this case I am using a modal, which is also handled in utils/modals/test.js 
    const bug = new ModalBuilder()
      .setCustomId("test-modal")
      .setTitle("Title")
      .addComponents([
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("test-input")
            .setLabel("Label")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(69)
            .setMaxLength(420)
            .setPlaceholder("Placeholder")
            .setRequired(true)
        ),
      ]);

    await interaction.showModal(bug);
  },
};
```









> This Template is free to use, if you need support join my [Discord](https://theauto.dev/discord) and feel free to tag me! 

> No credits required to use this template, the only thing you could do to help me out is to invite my bot in your server ;) [Invite Sigma Bot](https://theauto.dev/bots/sigmabot)
