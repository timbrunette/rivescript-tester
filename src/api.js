async function getBotMessage(bot, input) {
  if (!bot) {
    const reply = `This is a RiveScript testing bot built using React.  
    Run the RiveScript code to test it out!
    `;
    return { user: "Bot", text: reply };
  }

  let message = await bot.reply("local-user", input).then(
    reply => {
      return { user: "Bot", text: reply };
    },
    reject => {
      alert("error!");
    }
  );
  return message;
}

const defaultScript = `! version = 2.0

+ hello bot
- Hello human.

+ (how does *|* confused)
- To use this tester, first edit the code in the 'RiveScript Editor'\n
^ Then click 'RUN' to play with the bot to see the different responses!

+ my name is *
- <set name=<formal>>Nice to meet you, <get name>.

+ (what is my name|who am i)
- You're <get name>, right?

+ *
- I don't have a reply for that.
- Try asking that a different way.`;

export { getBotMessage, defaultScript };
