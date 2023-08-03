const {strictEqual} = require('assert'),
    {decode} = require('../utilities');

module.exports = async (s, p) => {
    const data = await decode(p.data);
    strictEqual(data.version, "1.0.3+17104e6");
    return data;
};