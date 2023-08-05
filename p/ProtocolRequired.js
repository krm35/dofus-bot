const {strictEqual} = require('assert'),
    {decode} = require('../utilities');

module.exports = async (s, p) => {
    const data = await decode(p.data);
    try {
        strictEqual(data.version, "1.0.3+17104e6", "protocol is outdated");
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    return data;
};