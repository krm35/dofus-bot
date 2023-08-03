const encoder = require('./encoder'),
    payloadWriter = require('./payloadWriter');

module.exports.send = async (s, p, body) => {
    const payload = await encoder(body);
    if (payload?.error) return console.log("error", p, body);
    s.write(payloadWriter(payload));
};