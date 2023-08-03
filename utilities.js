const ByteArray = require('bytearray-node'),
    encoder = require('./encoder'),
    payloadWriter = require('./payloadWriter');

module.exports.send = async (s, p, body) => {
    const payload = await encoder(body);
    if (payload?.error) return console.log("error", p, body);
    const send = payloadWriter(new ByteArray(), 3370, new ByteArray(Buffer.from(payload.toString(), "hex")));
    s?.write?.(send);
    return send;
};