const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    return await send(s, p, {
        __type__: "ServerSelectionMessage",
        serverId: 294
    })
};
