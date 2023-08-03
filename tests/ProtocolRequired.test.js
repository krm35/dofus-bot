const {strictEqual} = require('assert');
const ProtocolRequired = require('../p/ProtocolRequired');

(async () => {
    let error;
    try {
        await ProtocolRequired({}, {data: "09890f000d312e302e332b31373130346536"});
    } catch (e) {
        error = e;
    }
    strictEqual(error, undefined);
})();