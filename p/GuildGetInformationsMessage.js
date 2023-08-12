const {send} = require('../utilities');

module.exports = async (s, p) => {
    return send(s, p, {
        __type__: "GuildGetInformationsMessage",
        infoType: 2
    })
};