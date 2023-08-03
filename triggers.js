const ClientKeyMessage = require('./p/ClientKeyMessage');
const IdentificationMessage = require('./p/IdentificationMessage');
const ServerSelectionMessage = require('./p/ServerSelectionMessage');

module.exports = {
    HelloConnectMessage: [ClientKeyMessage, IdentificationMessage],
    ServersListMessage: [ServerSelectionMessage],
};

