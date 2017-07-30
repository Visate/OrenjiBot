// Libraries
const Eris = require("eris");
const chalk = require("chalk");
const moment = require("moment");
const sqlite3 = require("sqlite3");
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

    description: "A bot made by Visate#7752 (ID: 97198953430257664) and Zero#0456 (ID: 96140677322141696)\n\nPM them if you have any suggestions for the bot!",
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

// getDatabase method
// returns the database object when called
client.getDatabase = () => {
  return new sqlite3.Database(config.databaseLocation);
};

// Register modules
require("./util/loadModules")(client);

// Connect the client
client.connect();

// Catching unhandled rejections from promises
process.on("unhandledRejection", (reason) => client.error(reason));
