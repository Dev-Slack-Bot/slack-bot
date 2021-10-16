const { Bot } = require('@slack/bolt');

const bot = new Bot({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

bot.message('knock knock', ({ message, say }) => {
  try {
    say(`Hello world, <@${message.user}>!`);
  } catch (error) {
    console.log(error, 'this is an error');
  }
});

(async () => {
  // Start the Bot
  await bot.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt Bot is running!');
})();
