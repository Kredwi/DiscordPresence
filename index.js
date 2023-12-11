const DiscordRPC = require('discord-rpc');
const fs = require('node:fs');
const { clientId } = require('./config.json');
const date = new Date();
const rp = new DiscordRPC.Client({ transport: 'ipc' });
startWorkRP();
setInterval(() => startWorkRP(), 5000);
rp.on('ready', () => console.log("Discord Rich Presence enabled"));
rp.login({ clientId }).catch(console.error);
function startWorkRP() {
    fs.readFile('./config.json', 'utf8', (err, data) => {
        err ? console.log(err) : data = JSON.parse(data);
        rp.setActivity({
            details: data?.details,
            state: data?.state,
            startTimestamp: date,
            buttons: data?.buttons,
            largeImageKey: data?.largeImageKey,
            largeImageText: data?.largeImageText,
            smallImageKey: data?.smallImageKey,
            smallImageText: data?.smallImageText,
            instance: data?.instance,
            partyMax: data?.partyMax,
            partySize: data?.partySize
        });
    });
}
