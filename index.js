const fs = require('fs'),
    net = require('net'),
    path = require('path'),
    os = require('os'),
    {xml2js} = require('xml-js'),
    payloadReader = require('./payloadReader'),
    triggers = require('./triggers'),
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

function connectClient(host, port) {
    const socket = new net.Socket();

    socket.connect({host, port});

    socket.on('data', async function (data) {
        // noinspection JSCheckFunctionSignatures
        const payloads = payloadReader.getPayloads(chunk + data.toString('hex'));
        if (chunk.length && !payloads?.[0]?.chunk) chunk = "";
        payloads.forEach(payload => {
            if (payload.chunk) return chunk = payload.data;
            triggers[payload.msgId]?.forEach(trigger => trigger(socket, payload))
        });
        if (!payloads?.[payloads.length - 1]?.chunk) chunk = "";
    });

    socket.on('close', function () {
        socket.destroy();
    });

    socket.on('error', () => null);
}

// connectClient(host, port);