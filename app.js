/* eslint-disable indent */
const { App } = require('@slack/bolt');
require('dotenv').config();
const fetch = require('node-fetch');
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

app.message('favorites', async ({ say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Would you like to see your favorites list?',
        },
        accessory: {
          type: 'static_select',
          placeholder: {
            type: 'plain_text',
            text: 'Yes/No',
            emoji: true,
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'Yes',
                emoji: true,
              },
              value: 'seeFavs',
            },
            {
              text: {
                type: 'plain_text',
                text: 'No',
                emoji: true,
              },
              value: 'dismissFavs',
            },
          ],
          action_id: 'static_select-action',
        },
      },
    ],
  });
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
  await say(choice);
});

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
                value: randomFunnyJoke.id,
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

    app.action('static_select-action', async ({ ack, body, say }) => {
      await ack();
      const favoritedValue = body.actions[0].selected_option.value;
      const bodyId = body.user.id;
      const userName = body.user.username;
      const name = body.user.name;
      const favId = body?.message?.blocks[2]?.accessory?.options[0]?.value;

      if (favoritedValue !== 'no') {
        await fetch(`${process.env.BACKEND_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: bodyId,
            username: userName,
            name,
          }),
        });

        await fetch(`${process.env.BACKEND_URL}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            userId: bodyId,
            funnyId: favId,
          }),
        });
        await say(choice);
      }

      if (favoritedValue === 'seeFavs') {
        const res = await fetch(
          `${process.env.BACKEND_URL}/favorites/${bodyId}`
        );
        const favoritesByUserId = await res.json();
        // console.log('Favorite List by UserId ', favoritesByUserId);
        return favoritesByUserId;
      }
    });
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
