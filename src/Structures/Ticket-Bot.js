const { Client } = require('eris');
const fetch = require('node-fetch').default;

class TicketBot extends Client {
    constructor(token, options) {
        super(token, options || {});

        this.connect();
    }

    async addCommand(name, description, options) {
        const url = `https://discord.com/api/v8/applications/${process.env.client_id}/commands`;
        const body = JSON.stringify({
            name,
            type: 1,
            description,
            options
        });

        const res = await fetch(url, {
            body,
            headers: {
                'Authorization': `Bot ${process.env.token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(r => r.json());

        console.log(res);
        return res;
    }
}

module.exports = TicketBot;