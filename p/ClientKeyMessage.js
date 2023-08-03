const fs = require('fs'),
    {send} = require('../utilities');

module.exports = async (s, p) => {
    let path = __dirname + "/data/" + s['accountId'] + "flashKey.txt", key;
    if (fs.existsSync(path)) {
        key = fs.readFileSync(path).toString();
    } else {
        key = generateKey();
        fs.writeFileSync(path, key);
    }
    return await send(s, p, {
        __type__: 'ClientKeyMessage',
        key
    })
};

const hex_chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

const KEY_SIZE = 21;

function getRandomFlashKey() {
    let sSentence = "";
    let nLen = KEY_SIZE - (1 + 3);
    for (let i = 0; i < nLen; i++) {
        sSentence = sSentence + getRandomChar();
    }
    return sSentence + checksum(sSentence);
}

function checksum(s) {
    let r = 0;
    for (let i = 0; i < s.length; i++) {
        r = r + s.charCodeAt(i) % 16;
    }
    return hex_chars[r % 16];
}

function getRandomChar() {
    let n = Math.ceil(Math.random() * 100);
    if (n <= 40) {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    if (n <= 80) {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateKey() {
    return saveKey(getRandomFlashKey());
}

function saveKey(pKey, pNbKey) {
    if (!pNbKey) pNbKey = 1;
    return pKey + "#" + (pNbKey < 10 ? "0" + pNbKey : pNbKey)
}