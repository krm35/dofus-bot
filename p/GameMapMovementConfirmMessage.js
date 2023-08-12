const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO if id
    return send(s, p, {
        __type__: "GameMapMovementConfirmMessage"
    })
};