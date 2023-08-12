const {randomBytes, publicEncrypt, publicDecrypt} = require('crypto'),
    ByteArray = require('bytearray-node'),
    {decode, send} = require('../utilities');

const publicKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBUzANBgkqhkiG9w0BAQEFAAOCAUAAMIIBOwKCATIAgucoka9J2PXcNdjcu6CuDmgteIMB+rih\n" +
    "2UZJIuSoNT/0J/lEKL/W4UYbDA4U/6TDS0dkMhOpDsSCIDpO1gPG6+6JfhADRfIJItyHZflyXNUj\n" +
    "WOBG4zuxc/L6wldgX24jKo+iCvlDTNUedE553lrfSU23Hwwzt3+doEfgkgAf0l4ZBez5Z/ldp9it\n" +
    "2NH6/2/7spHm0Hsvt/YPrJ+EK8ly5fdLk9cvB4QIQel9SQ3JE8UQrxOAx2wrivc6P0gXp5Q6bHQo\n" +
    "ad1aUp81Ox77l5e8KBJXHzYhdeXaM91wnHTZNhuWmFS3snUHRCBpjDBCkZZ+CxPnKMtm2qJIi57R\n" +
    "slALQVTykEZoAETKWpLBlSm92X/eXY2DdGf+a7vju9EigYbX0aXxQy2Ln2ZBWmUJyZE8B58CAwEA\n" +
    "AQ==\n" +
    "-----END PUBLIC KEY-----\n";

function encrypt(s, key, salt, token) {
    const decryptedKey = publicDecrypt(publicKey, Buffer.from(key)).toString('base64');
    s.aes = randomBytes(32).toString('hex');
    let formattedKey = "-----BEGIN PUBLIC KEY-----\n";
    for (let i = 0; i < decryptedKey.length; i++) {
        formattedKey += decryptedKey[i];
        if (i && i % 76 === 0) formattedKey += "\n";
    }
    formattedKey += "\n-----END PUBLIC KEY-----\n";
    const buff = new ByteArray();
    buff.writeUTFBytes(salt);
    buff.writeUTFBytes(s.aes);
    const login = "    ";
    buff.writeByte(login.length);
    buff.writeUTFBytes(login);
    buff.writeUTFBytes(token);
    const enc = publicEncrypt(formattedKey, buff.buffer);
    const credentials = Buffer.from(enc, "hex").toJSON().data;
    for (let i = 0; i < credentials.length; i++) credentials[i] -= 128;
    return credentials;
}

module.exports = async (s, p) => {
    const {key, salt} = await decode(p.data);
    return send(s, p, {
        __type__: "IdentificationMessage",
        autoconnect: false,
        credentials: encrypt(s, key, salt, "test"),
        failedAttempts: [],
        lang: "fr",
        serverId: 0,
        sessionOptionalSalt: 0,
        useCertificate: false,
        useLoginToken: true,
        version: {
            __type__: "Version",
            build: 5,
            buildType: 0,
            code: 4,
            major: 2,
            minor: 68
        }
    })
};