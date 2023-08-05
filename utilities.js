const ByteArray = require('bytearray-node'),
    protocol = require('./protocol'),
    labot = require('./labot'),
    payloadWriter = require('./payloadWriter');

module.exports.decode = (hex, client) => labot('/decode', {hex, client});

module.exports.send = async (s, p, body) => {
    const payload = await labot('/encode', {message: body});
    if (payload?.error) return console.log("error", p, body, JSON.stringify(body));
    const send = payloadWriter(new ByteArray(), protocol[body.__type__], new ByteArray(Buffer.from(payload.toString(), "hex")));
    s?.write?.(send);
    return send;
};