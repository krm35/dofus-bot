const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    const mapId = 191104002.0;
    return await send(s, p, {
        __type__: "MapInformationsRequestMessage",
        mapId
    })
};