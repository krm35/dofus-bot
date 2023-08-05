const {strictEqual} = require('assert');
const {decode} = require('../utilities');
const IdentificationMessage = require('../p/IdentificationMessage');

(async () => {
    const result = await IdentificationMessage({}, {data: "2d760155002045324c7c5e385657553166653f7b3b2d2b5053474f49355f3e27445a427c2551b10265ea16b79a03f5a37defd98b298d7fd31175fbd523830d254a4d5ce881c9e86e3fc19402c63fb48a992f321abc52b91cbddba3175ac9c33a23d75d2748992c6c926969720266221fc256ab93e97f0f29f10fc77fa21866ded0bdc15bfdc88a41123f8e819654dae0939dd61e0700ae35ca9a9721d68f413d33949192ccbc4fdb6b67e1866f84dcf8cc560b700aaf2a8b9ce0a2e7e1414f1a5654ff2f61a7791787089842889d240d84f3318b3e560bf8a016f006b4a97c2803c767d9c49ca0e1bd8c214769657094a473e9bd581d39dba2532080c4acf033d9b90e07c2b4e088be178e97b07abfb62176a664f7843a72b8b733914ba0bc17c8faaa28af809cbcd21ec3bb35e892803d569b39d08f36cc143f39b7c6ad9822a97e89fbdb877008dad585a422dc647bffac3c83f2d648b375"});
    const decoded = await decode(result.toString('hex'), true);
    strictEqual(decoded.credentials.length, 256);
})();