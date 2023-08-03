const ProtocolRequired = require('./p/ProtocolRequired');
const ClientKeyMessage = require('./p/ClientKeyMessage');
const IdentificationMessage = require('./p/IdentificationMessage');
const ServerSelectionMessage = require('./p/ServerSelectionMessage');

module.exports = {
    ProtocolRequired: [ProtocolRequired],
    HelloConnectMessage: [ClientKeyMessage, IdentificationMessage],
    ServersListMessage: [ServerSelectionMessage],
};

