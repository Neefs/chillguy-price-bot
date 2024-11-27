const { Client, IntentsBitField } = require("discord.js");

const chillguy = new Client({
  intents: [IntentsBitField.Flags.Guilds],
});

require("dotenv").config();

const getPriceInformation = async () => {
  const response = await fetch(
    "https://api.dexscreener.com/latest/dex/pairs/solana/93tjgwff5Ac5ThyMi8C4WejVVQq4tuMeMuYW1LEYZ7bu"
  );
  const data = await response.json();
  return { price: data.pair.priceUsd, priceChange: data.pair.priceChange.h24 };
};

const displayPriceInformation = async () => {
  const price = await getPriceInformation();
  const guilds = chillguy.guilds.cache;

  chillguy.guilds.cache.forEach(async (guild) => {
    try {
       const me = await guild.members.fetch(chillguy.user);

      await guild.members.edit(chillguy.user, {
        nick: `${price.priceChange > 0 ? "⬈" : "⬊"} $${
          Math.round(price.price * 100) / 100
        } $CHILLGUY`,
      });
      chillguy.user.setPresence({
        activities: [
          {
            name:
              (price.priceChange > 0
                ? `Up +${price.priceChange}%`
                : `Down ${price.priceChange}%`) + " in 24h",
            type: 4,
          },
        ],
        status: price.priceChange > 0 ? 'online' : 'dnd',
      });
    } catch (e) {
      console.log(e);
    }
  });

  setTimeout(displayPriceInformation, 1000 * 30);
};

chillguy.once("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}`);

  displayPriceInformation();
});

chillguy.login(process.env.TOKEN);
