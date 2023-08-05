const {strictEqual} = require('assert');
const fs = require('fs');
const ClientKeyMessage = require('../p/ClientKeyMessage');

(async () => {
    const result = await ClientKeyMessage({accountId: "accountId"});
    strictEqual(result.length, 30);
    strictEqual(fs.existsSync("../p/data/accountIdflashKey.txt"), true);
    strictEqual(Buffer.from(result, "hex").toString().endsWith(fs.readFileSync("../p/data/accountIdflashKey.txt").toString()), true);
})();