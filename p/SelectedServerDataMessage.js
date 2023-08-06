const {execSync} = require('child_process'),
    {decode} = require('../utilities');

module.exports = async (s, p, {connect}) => {
    const {address, ports, ticket} = await decode(p.data);
    const socket = connect(address, ports[0]);
    socket.ticket = execSync("java -jar " + __dirname + "/Credentials/out/artifacts/Credentials_jar/Credentials.jar \""
        + s.aes + "\" \"" + Buffer.from(ticket).toString("hex") + "\"").toString();
};
