const p = {};

try {
    const temp = require('fs').readFileSync(__dirname + '/debug/protocol.js', 'utf8');
    const protocol = JSON.parse(temp.substring(8, temp.lastIndexOf('msg_from_id')));
    for (let key in protocol) {
        if (key === protocol[key]['name']) {
            p[key] = protocol[key]['protocolId'];
            p["id" + protocol[key]['protocolId']] = key;
        }
    }
} catch (e) {
    console.log(e);
}

module.exports = p;
