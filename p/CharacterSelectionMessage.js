const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    const id = 34;
    return send(s, p, {
        __type__: "CharacterSelectionMessage",
        id
    })
};
