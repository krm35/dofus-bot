const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    return send(s, p, {
        __type__: "GameMapMovementRequestMessage"
    })
};