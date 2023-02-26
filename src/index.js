const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const path = require("path");

const { Client, Events, IntentsBitField, Collection, ActivityType } = require("discord.js");
const intents = new IntentsBitField(3276799);
const client = new Client({ intents });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for(const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if('data' in command && 'run' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing required "data" or "run" property.`);
  }
}

const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for(const file of eventsFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if(event.once) {
    client.once(event.name, (...args) => event.run(...args));
  } else { 
    client.on(event.name, (...args) => event.run(...args));
  }
}

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
