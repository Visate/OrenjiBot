module.exports = (client) => {
    
    //server logging into logging channel 
 
    //user join
    client.on("guildMemberAdd", (guild, member) => {
 
        if(guild === client.config.guildID) {
        
            if(client.config.logChannelID) {
    
                client.createMessage(client.config.logChannelID, {
    
                    embed:{
    
                    author:{
    
                            name: `${member.username}#${member.discriminator}`,
    
                            icon_url: member.user.dynamicAvatarURL("jpg", 512)
    
                        },
    
                        description: "User joined",
    
                        timestamp: new Date(),
    
                    }

                }).catch((err) => client.error(`Failed to create log: ${err}`));
    
            }
        }
        
    });

    //user leave 
    client.on("guildMemberRemove", (guild, member) => {
 
        if(guild === client.config.guildID) {

            if(client.config.logChannelID) {
    
                client.createMessage(client.config.logChannelID, {
    
                    embed:{
    
                        author:{
    
                            name: `${member.username}#${member.discriminator}`,
    
                            icon_url: member.user.dynamicAvatarURL("jpg", 512)
    
                        },
    
                        description: "User left",
    
                        timestamp: new Date(),
    
                    }
    
                }).catch((err) => client.error(`Failed to create log: ${err}`));
    
            }
        }

    });
 
    //user nickname change
 
    client.on("guildMemberUpdate", (guild, member, oldMember) => {
 
        if(guild === client.config.guildID) {

            if(client.config.logChannelID) {
    
                client.createMessage(client.config.logChannelID, {
    
                    embed:{
    
                        author:{
    
                            name: `${member.username}#${member.discriminator}`,
    
                            icon_url: member.user.dynamicAvatarURL("jpg", 512)
    
                        },
    
                        description: `${member.username}#${member.discriminator}'s nickname has been changed from ${oldMember.nick} to ${member.nick}`,
    
                        timestamp: new Date(),
    
                    }
    
                }).catch((err) => client.error(`Failed to create log: ${err}`));
    
            }
        }

    });
 
    //user name change
    client.on("userUpdate", (guild, user, oldUser) => {
 
        if(guild === client.config.guildID) {

            if(client.config.logChannelID) {
    
                client.createMessage(client.config.logChannelID, {
    
                    embed:{

                        author:{
    
                            name: `${user.username}#${user.discriminator}`,

                            icon_url: user.user.dynamicAvatarURL("jpg", 512)
    
                        },
    
                        description: `${oldUser.username} has changed to ${user.username}#${user.discriminator}`,
                        
                        timestamp: new Date(),
    
                    }
    
                }).catch((err) => client.error(`Failed to create log: ${err}`));
    
            }
        }
        
    });

};