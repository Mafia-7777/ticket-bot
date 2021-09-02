const env = require('dotenv').config().parsed;
const TicketBot = require('./Structures/Ticket-Bot');

const bot = new TicketBot(env.token);

bot.once('ready', () => {
    console.log(`${bot.user.username}#${bot.user.discriminator} is ready!`);
});

bot.on('rawWS', (packet, _id) => {
    if(packet.t != 'INTERACTION_CREATE') return;
    const { token, id, member, data } = packet.d;
    console.log(token, data, member);

    bot.requestHandler.request('POST', `/interactions/${id}/${token}/callback`, true, {
        type: 4,
        data: {
            content: `f your ticket`,
            flags: 1 << 6
        }
    })
})
/*bot.addCommand('close', 'Close a ticket', [
    {
        "name": "reason",
        "description": "Close reason",
        "type": 3,
        "required": true
    }
]);*/

