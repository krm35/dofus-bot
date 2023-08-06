const {execSync} = require('child_process'),
    {decode, send} = require('../utilities');

function encrypt(s, key, salt, token) {
    // TODO encrypt in JS
    // Thansk to ProjectBlackFalcon https://github.com/ProjectBlackFalcon/DatBot/
    const result = execSync("java -jar " + __dirname + "/Credentials/out/artifacts/Credentials_jar/Credentials.jar \""
        + Buffer.from(key).toString("hex") + "\" \"" + salt + "\" \"" + token + "\"").toString().split('\n');
    s.aes = result[0];
    const credentials = Buffer.from(result[1], "hex").toJSON().data;
    for (let i = 0; i < credentials.length; i++) credentials[i] -= 128;
    return credentials;
}

module.exports = async (s, p) => {
    const {key, salt} = await decode(p.data);
    return await send(s, p, {
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