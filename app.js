const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, 
  appToken: process.env.SCOPE_TOKEN 
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
  await say({
    blocks: [
      {
        'type': 'divider'
      },
      {
        'type': 'actions',
        'elements': [
          {
            'type': 'radio_buttons',
            'options': [
              {
                'text': {
                  'type': 'plain_text',
                  'text': 'Would you like to hear a funny dev slogan?',
                  'emoji': true
                },
                'value': '1'
              },
              {
                'text': {
                  'type': 'plain_text',
                  'text': 'Wanna know some dev tips n tricks?',
                  'emoji': true
                },
                'value': '2'
              }
            ],
            'action_id': 'button_click'
          }
        ]
      }
    ]
  });
});
    
app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  const co = body.user.id;
  await say(`<@${body.user.id}> clicked the button`);
  console.log(co);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!'); 
})();
