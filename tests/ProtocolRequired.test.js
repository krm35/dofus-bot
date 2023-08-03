const {strictEqual} = require('assert');
const ProtocolRequired = require('../p/ProtocolRequired');

(async () => {
    let error;
    try {
        const result = await ProtocolRequired({}, {data: "09890f000d312e302e332b31373130346536"});
        strictEqual(typeof result.version, "string")
    } catch (e) {
        error = e;
    }
    strictEqual(error, undefined);
})();