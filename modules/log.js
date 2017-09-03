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

    if (!oldUser || user.username === oldUser.username) return;

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

  // User activity logging
  
  // Message send logging
  client.on("messageCreate", (msg) => {

    updateUserActivity(msg.author);

  });

  //Voice channel join logging
  client.on("voiceChannelJoin", (member) => {

    updateUserActivity(member);

  });

  // Update activity log function
  function updateUserActivity(user) {

    let db = client.getDatabase();
    
    db.serialize(() => {

      // Create activity log table if it does not exist
      db.run("CREATE TABLE IF NOT EXISTS activityLog (userId INTEGER PRIMARY KEY, lastActivity TEXT NOT NULL)")

      // Check the table for the user
      .get("SELECT userId id, lastActivity date FROM activityLog WHERE userId = ?", user.id, (err, row) => {

        if (err) {
          
          client.error(`Failed to load activity log table: ${err}`);
          
        }
 
        // Add new entry for a new user
        if (row == null) {

          let db = client.getDatabase();

          client.log(`Added new user ${user.username}#${user.discriminator} (${user.id}) to activity log`);

          db.run("INSERT INTO activityLog(userId, lastActivity) VALUES (?, DATETIME('now'))", user.id, (err) => {

            if (err) {

              client.error(`Failed to add data to activity log table: ${err}`);

            }

          }).close((err) => {
            
            if (err) {

              client.error(`Failed to close database: ${err}`);

            }

          });
        
        // Update entry for existing user
        } else {

          db.run("UPDATE activityLog SET lastActivity = DATETIME('now') WHERE userId = ?", user.id, (err) => {

            if (err) {
              
              client.error(`Failed to update data in activity log table: ${err}`);

            }

          }).close((err) => {
            
            if (err) {

              client.error(`Failed to close database: ${err}`);

            }

          });

        }

      });

    });

  }

};
