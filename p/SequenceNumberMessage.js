const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    const number = 1;
    return await send(s, p, {
        __type__: "SequenceNumberMessage",
        number
    })
};