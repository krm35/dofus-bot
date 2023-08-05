const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    return await send(s, p, {
        __type__: "BasicLatencyStatsMessage",
        latency: 85,
        max: 50,
        sampleCount: 15
    })
};