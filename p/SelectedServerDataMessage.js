const {createDecipheriv} = require('crypto'),
    ByteArray = require('bytearray-node'),
    {decode} = require('../utilities');

module.exports = async (s, p, {connect}) => {
    const {address, ports, ticket} = await decode(p.data);
    const socket = connect(address, ports[0]);
    const key = new ByteArray(Buffer.from(s.aes, "hex"));
    const iv = new ByteArray();
    iv.writeBytes(key, 0, 16);
    const decipher = createDecipheriv('aes-256-cbc', key.buffer, iv.buffer);
    decipher.setAutoPadding(false);
    const decrypted = decipher.update(Buffer.from(ticket), null, 'hex') + decipher.final('hex');
    socket.ticket = Buffer.from(decrypted, 'hex').toString();
    return socket;
};