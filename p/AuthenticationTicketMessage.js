const {send} = require('../utilities');

module.exports = async (s, p) => {
    return await send(s, p, {
        __type__: "AuthenticationTicketMessage",
        lang: "fr",
        ticket: s.ticket
    })
};