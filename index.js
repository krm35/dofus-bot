const fs = require('fs'),
    net = require('net'),
    path = require('path'),
    os = require('os'),
    {xml2js} = require('xml-js'),
    payloadReader = require('./payloadReader'),
    triggers = require('./triggers'),
    protocol = require('./protocol'),
    windows = process.platform === "win32",
    linux = process.platform === "linux";

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

let chunk = "";

function connect(host, port) {
    const socket = new net.Socket();

    socket.connect({host, port});

    // TODO queue
    socket.on('data', async function (data) {
        // noinspection JSCheckFunctionSignatures
        const payloads = payloadReader.getPayloads(chunk + data.toString('hex'));
        if (chunk.length && !payloads?.[0]?.chunk) chunk = "";
        for (const payload of payloads) {
            if (payload.chunk) {
                chunk = payload.data;
            } else {
                for (const trigger of triggers?.[protocol["id" + payload.msgId]] ?? []) await trigger(socket, payload);
            }
        }
        if (!payloads?.[payloads.length - 1]?.chunk) chunk = "";
    });

    socket.on('close', function () {
        socket.destroy();
    });

    socket.on('error', () => null);
}

connect("127.0.0.1", port);