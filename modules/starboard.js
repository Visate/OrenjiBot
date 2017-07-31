module.exports = (client) => {

  client.on("messageReactionAdd", (message, emoji, userID) => {

    client.getMessage(message.channel.id, message.id).then(msg => {

      if (client.guilds.get(msg.channel.guild.id).members.get(userID).roles.filter(role => {client.config.veteranRoleIDS.includes(role)})) {

        if (msg.channel.guild.id === client.config.guildID) {

          if (msg.channel.id !== client.config.starboardChannelID) {

            if (emoji.name === "⭐" && emoji.id === null) {

              let db = client.getDatabase();

              // Open database and create starboard table if it does not exist
              db.run("CREATE TABLE IF NOT EXISTS starboard (MessageId INTEGER)");
              
              // Check the database for the message id
              db.get("SELECT MessageId FROM starboard WHERE MessageId = ?", message.id, (err, row) => {

                if (err) {

                  client.error(`Failed to load starboard table: ${err}`);

                }

                // If the message id does not exist in the database, add it, and create a new post in starboard
                if (row == null) {

                  client.log(`Added message ${msg.id} from ${msg.member.username}#${msg.member.discriminator} to the starboard`);

                  client.createMessage(client.config.starboardChannelID, {

                    embed: {

                      author: {

                        name: `${msg.member.username}#${msg.member.discriminator} (${userID})`,
                        icon_url: msg.member.staticAvatarURL

                      },

                      description: msg.content,

                      footer: {

                        text: "⭐",

                      },

                      timestamp: new Date(),
                      color: 16764928, // #FFD000, yellow
                      type: "rich"

                    }
                  
                  }).catch((err) => client.error(`Failed to add post to starboard: ${err}`));

                  db.run("INSERT INTO starboard(MessageID) VALUES (?)", message.id, (err) => {

                    if (err) {

                      client.error(`Failed to add data to starboard table: ${err}`)

                    }

                  });

                }

              })

            }

          }

        }
      }

    })

  });

}
