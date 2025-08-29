const config = require('../../config.js');
const { welcome } = require('../../utils/welcome.js');
module.exports = {
  name: 'guildMemberAdd',
  execute(client, member) {
    try { 
      const channel = client.guild.channels.cache.get("1074706979404124170") // welcome channel id
      welcome(client.guild, client.user, channel) // welcome function 
    } catch (e) { 
      console.log(e); 
      return;
    }

  }
};

















/**
 * 
 * This template is made by theautodev
 * Sigma Bot aka https://theauto.dev is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */