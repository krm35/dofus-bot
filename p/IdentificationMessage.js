const {send} = require('../utilities');

module.exports = async (s, p) => {
    // TODO
    const credentials = [];
    return await send(s, p, {
        __type__: "IdentificationMessage",
        autoconnect: false,
        credentials,
        failedAttempts: [],
        lang: "fr",
        serverId: 0,
        sessionOptionalSalt: 0,
        useCertificate: false,
        useLoginToken: true,
        version: {
            __type__: "Version",
            build: 0,
            buildType: 0,
            code: 0,
            major: "",
            minor: ""
        }
    })
};