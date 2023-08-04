const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    const ticket = "";
    return await send(s, p, {
        __type__: "AuthenticationTicketMessage",
        lang: "fr",
        ticket
    })
};