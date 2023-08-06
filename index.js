const fs = require('fs'),
    net = require('net'),
    path = require('path'),
    os = require('os'),
    {xml2js} = require('xml-js'),
    {send} = require('./utilities'),
    payloadReader = require('./payloadReader'),
    triggers = require('./triggers'),
    protocol = require('./protocol'),
    windows = process.platform === "win32",
    linux = process.platform === "linux";

process.on('uncaughtException', err => console.log('uncaughtException', err));

const osPath = windows ? path.join("C:", "Users", os.userInfo().username, 'AppData', 'Roaming')
    : linux ? path.join(os.homedir(), '.config') : path.join(os.homedir(), "Library", "Application Support");

const program = JSON.parse("" + fs.readFileSync(path.join(osPath, "zaap", "repositories", "production", "dofus", "main", "release.json")))['location'];
const xml = fs.readFileSync(program + "/config.xml").toString();
const {_text} = xml2js(xml, {
    compact: true,
    spaces: 4,
    ignoreComment: true
})['LangFile']['entry'].find(({_attributes}) => _attributes.key === 'connection.host');
const [, host, port] = _text.split(',')[0].split(':');

const connect = function (host, port) {
    const socket = new net.Socket();

    socket.chunk = "";
    socket.connect({host, port});

    // TODO queue
    socket.on('data', async function (data) {
        // noinspection JSCheckFunctionSignatures
        const payloads = payloadReader.getPayloads(socket.chunk + data.toString('hex'));
        if (socket.chunk.length && !payloads?.[0]?.chunk) socket.chunk = "";
        for (const payload of payloads) {
            if (payload.chunk) {
                socket.chunk = payload.data;
            } else {
                for (const trigger of triggers?.[protocol["id" + payload.msgId]] ?? []) {
                    if (typeof trigger === "string") await send(socket, payload, {__type__: trigger});
                    else await trigger(socket, payload, {connect});
                }
            }
        }
        if (!payloads?.[payloads.length - 1]?.chunk) socket.chunk = "";
    });

    socket.on('close', function () {
        socket.destroy();
    });

    socket.on('error', () => null);

    return socket;
};

connect("127.0.0.1", port);