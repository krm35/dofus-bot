const ByteArray = require('bytearray-node'),
    labot = require('./labot'),
    payloadWriter = require('./payloadWriter');

module.exports.decode = (hex) => labot('/decode', {hex});

module.exports.send = async (s, p, body) => {
    const payload = await labot('/encode', {message: body});
    if (payload?.error) return console.log("error", p, body);
    const send = payloadWriter(new ByteArray(), 3370, new ByteArray(Buffer.from(payload.toString(), "hex")));
    s?.write?.(send);
    return send;
};