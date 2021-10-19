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

// console.log user value
// grab that value 
// if (value 1 or 2) is choosen
// await and generate pulled sql tip or funny (import random function body)

app.action('button_click', async ({ body, ack, say }) => {
  
  await ack();
  console.log(body.actions[0].selected_option.value);
  const tipOrFunnyValue = body.actions[0].selected_option.value;

  if(tipOrFunnyValue === '1') {
    // randomize the sql query to return choosen comment
    // const randomEntree = Math.floor(Math.random() * entree.length);
    await say({
      'blocks': [
        {
          'type': 'divider'
        },
        {
          'type': 'header',
          'text': {
            'type': 'plain_text',
            'text': 'FUNNY DEV SLOGANS!',
            'emoji': true
          }
        }
      ]
    });
    
  } else if(tipOrFunnyValue === '2') {

    await say({
      'blocks': [
        {
          'type': 'divider'
        },
        {
          'type': 'header',
          'text': {
            'type': 'plain_text',
            'text': 'DEV TIPS N TRICKS!',
            'emoji': true
          }
        }
      ]
    });
  }
  
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!'); 
})();
