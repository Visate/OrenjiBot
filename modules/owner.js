module.exports = (client) => {

  // eval command
  client.registerCommand("eval",

  // function of eval
  (msg) => {

    try {

      let evaled = eval(msg.content.slice(msg.prefix.length + 5));
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      return `\`\`\`x1\n${cleanText(evaled)}\n\`\`\``;

    }

    catch (err) {

      return `Error: ${cleanText(err)}`;

    }

  },

  // command options
  {

    description: "Runs arbitrary JavaScript. Oh, and *you* can't run it.",
    fullDescription: "Runs arbitrary JavaScript. Oh, and *you* can't run it.",
    usage: "<Javascript>",

    requirements: {

      userIDs: [ "97198953430257664" ],

    }

  });

};

function cleanText(text) {

  if (typeof text === "string") return text.replace(/`/g, "`\u200b").replace(/@/g, "@\u200b");
  else return text;

}
