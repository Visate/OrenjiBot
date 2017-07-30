module.exports = (client) => {

  client.on("messageReactionAdd", (message, emoji, userID) => {

  message.channel.getMessage(message.id).then(msg => {
    client.log(`${message.id}`);
    
    if (msg.guild.id === client.config.guildID) {

      if (msg.channel.id !== client.config.starboardChannelID) {

        if (emoji.name === "⭐" && emoji.id === null) {

          let user = msg.member;
          let db = client.getDatabase();
          // Open database and create starboard table if it does not exist
          db.run("CREATE TABLE IF NOT EXISTS starboard (MessageId INTEGER)", [], (err) =>{
            client.log(`Attempted to create table`);
          });
          
          client.log(`${msg.id}`)
          // Check the database for the message id
          db.get("SELECT MessageId id FROM starboard WHERE MessageId = ?", message.id, (err, row) => {
            client.log(`${row}`);
            if (err) {

              client.error(`Failed to load database: ${err}`);

            }

            // If the message id does not exist in the database, add it, and create a new post in starboard
            if (row == null) {
              client.log(`Attempted to add to starboard`);
              client.createMessage(client.config.starboardChannelID, {

                embed: {

                  author: {

                    name: `${user.username}#${user.discriminator} (${userID})`,
                    icon_url: user.staticAvatarURL

                  },

                  description: msg.content,

                  footer: {

                    text: ":star:",

                  },

                  timestamp: new Date(),
                  color: 16764928, // #FFD000, yellow
                  type: "rich"

                }
              
              }).catch((err) => client.error(`Failed to add post to starboard: ${err}`));

              db.run("INSERT INTO starboard MessageID VALUES ?", message.id, (err) => {

                if (err) {

                  client.error(`Failed to add data to starboard table: ${err}`)

                }

              });

            }

          })

        }

      }

    }
  })  
  });

}