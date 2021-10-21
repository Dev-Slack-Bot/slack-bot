/* eslint-disable indent */
const { App } = require('@slack/bolt');
require('dotenv').config();
// const request = require('superagent');
const fetch = require('cross-fetch');
const Funny = require('./lib/models/Funny');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SCOPE_TOKEN,
});

const choice = {
  blocks: [
    {
      type: 'divider',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'radio_buttons',
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'Would you like to hear a funny dev slogan?',
                emoji: true,
              },
              value: '1',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Wanna know some dev tips n tricks?',
                emoji: true,
              },
              value: '2',
            },
          ],
          action_id: 'button_click',
        },
      ],
    },
  ],
};

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
  await say(choice);
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  const randomFunnyJoke = await Funny.getData();
  const tipOrFunnyValue = body.actions[0].selected_option.value;
  if (tipOrFunnyValue === '1') {
    await say({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'FUNNY DEV SLOGANS!',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: `"${randomFunnyJoke.entree}"`,
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'Would you like to favorite this?',
          },
          accessory: {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'favorite?',
              emoji: true,
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Yes',
                  emoji: true,
                },
                value: '1',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'No',
                  emoji: true,
                },
                value: '2',
              },
            ],
            action_id: 'static_select-action',
          },
        },
      ],
    });

    // Favorite event value transmitted as POST route/model
    // might need a 'user' in parameters to track favorites
    // will need to stop after 5 rounds?
    // restart the question process if less than 10
    app.action('static_select-action', async ({ ack, body, say }) => {
      
      await ack();
      const favoritedValue = body.actions[0].selected_option.value;
      console.log('FAV VAL', favoritedValue);

      const bodyId = body.user.id;
      const userName = body.user.username;
      const name = body.user.name;

      if (favoritedValue === '1') {
        const validateUserId = await fetch(`${process.env.BACKEND_URL}/users/${bodyId}`); // cleared
        console.log(validateUserId, 'USER POSTED VALIDATE');
        if (!validateUserId) {
          await fetch(`${process.env.BACKEND_URL}/users`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }, 
            body: JSON.stringify({
              id: bodyId, username: userName, name
            })
          });
         
          // const url = `${process.env.BACKEND_URL}/favorites`;
          await fetch(`${process.env.BACKEND_URL}/favorites`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }, 
            body: JSON.stringify({
              id: bodyId
            })
          });

        } else if (validateUserId) {
          await fetch(`${process.env.BACKEND_URL}/favorites`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }, 
            body: JSON.stringify({
              userId: bodyId
            })
          }); // cleared


        await say(choice);
        }
      }
    });
      

    // Return to this code block once all FUNNY stuff has worked - transfer over salvageable code from above.
  } else if (tipOrFunnyValue === '2') {
    await say({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'DEV TIPS N TRICKS!',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            // eslint-disable-next-line quotes
            text: "'placeholder' for Tips..",
            emoji: true,
          },
        },
      ],
    });
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!'); 
})();
