const {strictEqual} = require('assert');
const ByteArray = require('bytearray-node');
const payloadWriter = require('../payloadWriter');

const buff = new ByteArray();
buff.writeUTF("JGceDYP8N1W6OCyQc9#01");
strictEqual(payloadWriter(new ByteArray(), 3919, buff), "3d3d000000041700154a476365445950384e3157364f4379516339233031");
