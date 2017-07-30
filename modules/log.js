module.exports = (client) => {
    
  // Ready event
  client.on("ready", () => {

    client.log(`Ready! Logged in to Discord as ${client.user.username}#${client.user.discriminator} (${client.user.id}).`);
    client.log("------------------------------");
    client.log("");

    if (client.config.logChannelID) {

      client.createMessage(client.config.logChannelID, {

        embed: {

          author: {

            name: `${client.user.username}#${client.user.discriminator} (${client.user.id})`,
            icon_url: client.user.staticAvatarURL

          },

          footer: {

            text: "Bot Online",

          },

          timestamp: new Date(),
          color: 8978176, // #88FF00, light green
          type: "rich"

        }

      }).catch((err) => client.error(`Failed to create log: ${err}`));

    }

  });

  // Server logging into logging channel 
 
  // User join
  client.on("guildMemberAdd", (guild, member) => {

    if (guild.id === client.config.guildID) {
   
      if (client.config.logChannelID) {
 
        client.createMessage(client.config.logChannelID, {
    
          embed: {
    
            author: {

              name: `${member.username}#${member.discriminator} (${member.id})`,
              icon_url: member.staticAvatarURL
    
            },
    
            footer: {

              text: "User Joined"

            },

            timestamp: new Date(),
            color: 8978176, // #88FF00, lightgreen
            type: "rich"
    
          }

        }).catch((err) => client.error(`Failed to create log: ${err}`));
    
      }

      client.log(`${member.username}#${member.discriminator} (${member.id}) joined the server.`);

    }
        
  });

  // User leave 
  client.on("guildMemberRemove", (guild, member) => {
 
    if (guild.id === client.config.guildID) {

      if (client.config.logChannelID) {
    
        client.createMessage(client.config.logChannelID, {
    
          embed: {
    
            author: {
    
              name: `${member.username}#${member.discriminator} (${member.id})`,
              icon_url: member.staticAvatarURL ? member.staticAvatarURL : null
    
            },

            footer: {

              text: "User Left"

            },

            timestamp: new Date(),
            color: 16755200, // #FFAA00, orange
            type: "rich"
    
          }
    
        }).catch((err) => client.error(`Failed to create log: ${err}`));
    
      }

      client.log(`${member.username}#${member.discriminator} (${member.id}) left the server.`);

    }

  });
 
  // User nickname change
  client.on("guildMemberUpdate", (guild, member, oldMember) => {
 
    if (oldMember.nick === member.nick) return;

    if (guild.id === client.config.guildID) {

      if (client.config.logChannelID) {
  
        client.createMessage(client.config.logChannelID, {
  
          embed: {
    
            author: {
    
              name: `${member.username}#${member.discriminator} (${member.id})`,
              icon_url: member.staticAvatarURL
    
            },
    
            description: `Nickname was changed from ${oldMember.nick} to ${member.nick}`,

            footer: {

              text: "Nickname Change"

            },

            timestamp: new Date(),
            color: 52479, // #00CCFF, lightblue
            type: "rich"
    
          }
    
        }).catch((err) => client.error(`Failed to create log: ${err}`));
    
      }

      client.log(`${member.username}#${member.discriminator}'s nickname changed from ${oldMember.nick} to ${member.nick}`);

    }

  });
 
  // User name change
  client.on("userUpdate", (user, oldUser) => {

    if (user.username === oldUser.username) return;

    if (client.guilds.get(client.config.guildID).members.get(user.id)) {

      if (client.config.logChannelID) {
    
        client.createMessage(client.config.logChannelID, {
    
          embed: {

            author: {
    
              name: `${user.username}#${user.discriminator} (${user.id})`,
              icon_url: user.staticAvatarURL
    
            },
    
            description: `Name was changed from ${oldUser.username}#${oldUser.discriminator}`,
                        
            footer: {

              text: "Name Change"

            },

            timestamp: new Date(),
            color: 52479, // #00CCFF, lightblue
            type: "rich"

          }
    
        }).catch((err) => client.error(`Failed to create log: ${err}`));
    
      }

      client.log(`ID ${user.id}: Name changed from ${oldUser.username}#${oldUser.discriminator} to ${user.username}#${user.discriminator}`);

    }
        
  });

};
