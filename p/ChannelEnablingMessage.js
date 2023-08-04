const {send} = require('../utilities');

module.exports = async (s, p) => {
    await send(s, p, {
        __type__: "ChannelEnablingMessage",
        "channel": 14,
        "enable": false
    });
    return await send(s, p, {
        __type__: "ChannelEnablingMessage",
        "channel": 10,
        "enable": true
    })
};