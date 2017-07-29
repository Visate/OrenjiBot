// Libraries
const Eris = require("eris");
const chalk = require("chalk");
const moment = require("moment");
const config = require("./config");

// Intiialize the client
const client = new Eris.CommandClient(

  // Discord token
  config.discordToken,

  // Client options
  {

    disableEvents: {

      TYPING_START: true,

    },

    defaultImageFormat: "png",
    defaultImageSize: 1024

  },

  // Command options
  {

    description: "A bot made by Visate#7752 (ID: 97198953430257664)\n\nPM @Visate#7752 if you have any suggestions for the bot!",
    owner: "",
    prefix: config.prefixes,

    defaultCommandOptions: {

      caseInsensitive: true,

    }

  }

);

// Attach the config to the client
client.config = config;

// Logging methods
client.log = (...msg) => console.log(chalk.green.bold(`[LOG] [${moment().format("MMM DD HH:mm:ss")}]`), ...msg);
client.error = (...msg) => console.log(chalk.bgRed.white.bold(`[ERR] [${moment().format("MMM DD HH:mm:ss")}]`), ...msg);
client.warn = (...msg) => console.log(chalk.bgYellow.white.bold(`[WRN] [${moment().format("MMM DD HH:mm:ss")}]`), ...msg);

// Register modules
require("./util/loadModules")(client);

// Connect the client
client.connect();
