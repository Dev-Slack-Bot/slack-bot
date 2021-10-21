/* eslint-disable indent */
const { App } = require('@slack/bolt');
require('dotenv').config();
const fetch = require('node-fetch');
const Funny = require('./lib/models/Funny');

async function getUtil(bodyId) {
  const res = await fetch(`${process.env.BACKEND_URL}/favorites/${bodyId}`);
  const results = await res.json();
  return results;
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SCOPE_TOKEN,
});

// ----------------------------- Global variable for main questions category
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
              value: 'funny',
            },
            {
              text: {
                type: 'plain_text',
                text: 'Wanna know some dev tips n tricks?',
                emoji: true,
              },
              value: 'tip',
            },
          ],
          action_id: 'button_click',
        },
      ],
    },
  ],
};

// ----------------------------------------------- Initializes Favs bot/list
app.message('favorites', async ({ say }) => {
  await say({
    'blocks': [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': 'Would you like to see your favorites list?'
        },
        'accessory': {
          'type': 'static_select',
          'placeholder': {
            'type': 'plain_text',
            'text': 'Yes/No',
            'emoji': true
          },
          'options': [
            {
              'text': {
                'type': 'plain_text',
                'text': 'Yes',
                'emoji': true
              },
              'value': 'seeFavs'
            },
            {
              'text': {
                'type': 'plain_text',
                'text': 'No',
                'emoji': true
              },
              'value': 'dismissFavs'
            }
          ],
          'action_id': 'static_select-action'
        }
      }
    ]
  }
  );
});

// ----------------------------------------------- Initializes Slack bot
app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
  await say(choice);
});

// ----------------------------------------------- 'hello' action event
app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  const randomFunnyJoke = await Funny.getData();
  const tipOrFunnyValue = body.actions[0].selected_option.value;
  if (tipOrFunnyValue === 'funny') {
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
                value: 'yes',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'No',
                  emoji: true,
                },
                value: 'no',
              },
            ],
            action_id: 'static_select-action',
          },
        },
      ],
    });
    // ------------------------------------nested action event for favorite choice
    app.action('static_select-action', async ({ ack, body, say }) => {
      
      await ack();
      const favoritedValue = body.actions[0].selected_option.value;
      console.log('USER OBJ', body.user);

      const bodyId = body.user.id;
      const userName = body.user.username;
      const name = body.user.name;
      // console.log(body.user.id, 'BODY USER ID FOR FAVS SELECT OPTION'); //U02JKAVFF96

      if (favoritedValue === 'yes') {

        const rawUserResponse = await fetch(`${process.env.BACKEND_URL}/users/${bodyId}`); // cleared
        console.log('RAW RES', rawUserResponse );
        const validateUserId = rawUserResponse;
        console.log('USER POSTED VALIDATE', validateUserId);

        if (validateUserId) {
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
        } else if (validateUserId === null) {
          console.log(' WE MAKE IT!'); //U02JKAVFF96
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
              userId: bodyId
            })
          });
        } 
      }

      // if (favoritedValue === 'seeFavs') {
      //   getUtil(bodyId);
      //   // need to access an array of favorited jokes now based off that getUntil function,
      //   // then loop thru each favorited item. 
      //   array1.forEach(favId => await say({
      //     "blocks": [
      //       {
      //         "type": "section",
      //         "text": {
      //           "type": "mrkdwn",
      //           "text": "Click to delete from your favs list !"
      //         },
      //         "accessory": {
      //           "type": "radio_buttons",
      //           "options": [
      //             {
      //               "text": {
      //                 "type": "plain_text",
      //                 "text": `${favId}`, // req.body.fav?
      //                 "emoji": true
      //               },
      //               "value": `${favId}` // if radio button value = favId, DELETE.
      //             }
      //           ],
      //           "action_id": "radio_buttons-action"
      //         }
      //       }
      //     ]
      //   }));
      // } 
    });
      
    // Return to this code block once all FUNNY stuff has worked - transfer over salvageable code from above.
  } else if (tipOrFunnyValue === 'tip') {
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
