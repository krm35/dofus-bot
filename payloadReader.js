const payloads = {};
const HEADER_OFFSET = 2;
const MSGID_DATALEN_SIZE = 2;

module.exports = {
    readDataLen: function (payload) {
        let buffer = Buffer.from(payload, "hex");
        if (buffer.byteLength <= HEADER_OFFSET) return;
        let header = getHeader(buffer);
        let dataLenLen = this.getDataLenLen(header);
        if (dataLenLen === 0) return 0;
        return buffer.readUIntBE(HEADER_OFFSET, dataLenLen);
    },
    getDataLenLen: function (header) {
        return header & 3;
    },
    getPayloads: function (hex) {
        const res = [];
        try {
            while (hex.length > 0) {
                let buffer = Buffer.from(hex, 'hex');
                const dataLen = this.readDataLen(hex) || 0;
                const header = getHeader(buffer);
                const msgId = header >> 2;
                const dataLenLen = this.getDataLenLen(header);
                const HEADER_SIZE = MSGID_DATALEN_SIZE + dataLenLen;
                const data = hex.substring(0, 2 * (HEADER_SIZE + dataLen));
                res.push({
                    msgId,
                    data,
                    dataLen,
                    dataLenLen,
                    length: Buffer.from(data, 'hex').length - HEADER_SIZE,
                    big: 2 * (HEADER_SIZE + dataLen) > data.length
                });
                hex = hex.substring(2 * (HEADER_SIZE + dataLen));
            }
            return res;
        } catch (e) {
            res.push({
                data: hex,
                big: true,
                chunk: true
            });
            return res;
        }
    },
    payloads
};

function getHeader(buffer) {
    return buffer.readUInt16BE(0);
}