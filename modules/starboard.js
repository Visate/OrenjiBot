module.exports = (client) => {

  client.on("messageReactionAdd", (message, emoji, userID) => {

    if (message.guild.id === client.config.guildID) {

      if (message.channel.id !== client.config.starboardChannelID) {

        if (emoji.name === ":star:" && emoji.id === null) {

          let user = message.member;

          // Open database and create starboard table if it does not exist
          client.getDatabase.run("CREATE TABLE IF NOT EXISTS starboard (MessageId INTEGER)")

          // Check the database for the message id
          .get("SELECT MessageId id FROM starboard WHERE MessageId = ?", message.id, (err, row) => {

            if (err) {

              client.error(`Failed to load database: ${err}`);

            }

            // If the message id does not exist in the database, add it, and create a new post in starboard
            if (row === null) {
              client.createMessage(client.config.starboardChannelID, {

                embed: {

                  author: {

                    name: `${user.username}#${user.discriminator} (${userID})`,
                    icon_url: user.staticAvatarURL

                  },

                  description: message.content,

                  footer: {

                    text: ":star:",

                  },

                  timestamp: new Date(),
                  color: 16764928, // #FFD000, yellow
                  type: "rich"

                }
              
              }).catch((err) => client.error(`Failed to add post to starboard: ${err}`));

              client.getDatabase.run("INSERT INTO starboard MessageID VALUES ?", message.id, (err) => {

                if (err) {

                  client.error(`Failed to add data to starboard table: ${err}`)

                }

              });

            }

          })

        }

      }

    }
    
  });

}