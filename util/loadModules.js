const fs = require("fs");

module.exports = (client) => {

  try {

    // read the modules text file in root dir
    let modules = fs.readFileSync('modules.txt', 'utf8').split("\n");
    let cleaned = [];

    // weed out any commands, blank spaces, and duplicates
    modules.forEach((module) => {

      if (module.startsWith("#") || !module) return;
      if (!cleaned.includes(module.toLowerCase())) cleaned.push(module.toLowerCase());

    });

    // actual loading of modules using require and sending client
    cleaned.forEach((module) => {

      client.log(`Loading module ${module}...`);

      try {

        require(`../modules/${module}`)(client);
        client.log(`Loaded module ${module}!`);

      }

      catch (e) {

        client.error(`Error while loading module: ${e}`);

      }

    });

  }

  catch (e) {

    client.error(`Error occured while loading modules: ${e.stack}`);
    client.error(`Now exiting...`);
    process.exit(1);

  }

};
