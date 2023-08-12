const {strictEqual} = require('assert');
const ByteArray = require('bytearray-node');
const p = require('../protocol');
const SelectedServerDataMessage = require('../p/SelectedServerDataMessage');
const payloadWriter = require('../payloadWriter');

(async () => {
    const data = payloadWriter(new ByteArray(), p["SelectedServerDataMessage"], new ByteArray(Buffer.from("a60200093132372e302e302e310001b42b012076632a574443ad2c2b20edc20b65c47ee75d905b822b43ff21ebf2ef4a27c99a", "hex")), true).toString('hex');
    const socket = await SelectedServerDataMessage({aes: "7c87cb6053124b472165e5b81c6666f411ec15176c647fa2b30da910f0e68bb5"}, {data}, {
        connect: () => {
            return {}
        }
    });
    strictEqual(socket.ticket, "38de798b63a248aab516373e7a671515");
})();