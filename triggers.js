const ProtocolRequired = require('./p/ProtocolRequired');
const ClientKeyMessage = require('./p/ClientKeyMessage');
const IdentificationMessage = require('./p/IdentificationMessage');
const ServerSelectionMessage = require('./p/ServerSelectionMessage');
const AuthenticationTicketMessage = require('./p/AuthenticationTicketMessage');
const BasicPingMessage = require('./p/BasicPingMessage');
const CharacterSelectionMessage = require('./p/CharacterSelectionMessage');
const GuildGetInformationsMessage = require('./p/GuildGetInformationsMessage');
const GameContextCreateRequestMessage = require('./p/GameContextCreateRequestMessage');
const ChannelEnablingMessage = require('./p/ChannelEnablingMessage');
const MapInformationsRequestMessage = require('./p/MapInformationsRequestMessage');
const GameMapMovementConfirmMessage = require('./p/GameMapMovementConfirmMessage');
const BasicLatencyStatsMessage = require('./p/BasicLatencyStatsMessage');

module.exports = {
    ProtocolRequired: [ProtocolRequired],
    HelloConnectMessage: [ClientKeyMessage, IdentificationMessage],
    ServersListMessage: [ServerSelectionMessage],
    HelloGameMessage: [AuthenticationTicketMessage],
    AuthenticationTicketAcceptedMessage: ["HaapiApiKeyRequestMessage"],
    HaapiApiKeyMessage: ["CharactersListRequestMessage"],
    BasicAckMessage: [BasicPingMessage],
    CharactersListMessage: [CharacterSelectionMessage],
    HaapiSessionMessage: ["FriendsGetListMessage", "AcquaintancesGetListMessage", "IgnoredGetListMessage",
        "SpouseGetInformationsMessage", GuildGetInformationsMessage, "GuildGetPlayerApplicationMessage",
        "GuildRanksRequestMessage", "AllianceGetPlayerApplicationMessage", "AllianceRanksRequestMessage"
    ],
    CharacterLoadingCompleteMessage: ["HaapiShopApiKeyRequestMessage", ClientKeyMessage, GameContextCreateRequestMessage],
    HaapiShopApiKeyMessage: ["QuestListRequestMessage", ChannelEnablingMessage, "AnomalySubareaInformationRequestMessage"],
    CurrentMapMessage: [MapInformationsRequestMessage],
    GameMapMovementMessage: [GameMapMovementConfirmMessage],
    BasicLatencyStatsRequestMessage: [BasicLatencyStatsMessage],
};

