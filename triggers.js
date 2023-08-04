const ProtocolRequired = require('./p/ProtocolRequired');
const ClientKeyMessage = require('./p/ClientKeyMessage');
const IdentificationMessage = require('./p/IdentificationMessage');
const ServerSelectionMessage = require('./p/ServerSelectionMessage');
const AuthenticationTicketMessage = require('./p/AuthenticationTicketMessage');
const HaapiApiKeyRequestMessage = require('./p/HaapiApiKeyRequestMessage');
const CharactersListRequestMessage = require('./p/CharactersListRequestMessage');
const BasicPingMessage = require('./p/BasicPingMessage');
const CharacterSelectionMessage = require('./p/CharacterSelectionMessage');
const FriendsGetListMessage = require('./p/FriendsGetListMessage');
const AcquaintancesGetListMessage = require('./p/AcquaintancesGetListMessage');
const IgnoredGetListMessage = require('./p/IgnoredGetListMessage');
const SpouseGetInformationsMessage = require('./p/SpouseGetInformationsMessage');
const GuildGetInformationsMessage = require('./p/GuildGetInformationsMessage');
const GuildGetPlayerApplicationMessage = require('./p/GuildGetPlayerApplicationMessage');
const GuildRanksRequestMessage = require('./p/GuildRanksRequestMessage');
const AllianceGetPlayerApplicationMessage = require('./p/AllianceGetPlayerApplicationMessage');
const AllianceRanksRequestMessage = require('./p/AllianceRanksRequestMessage');
const HaapiShopApiKeyRequestMessage = require('./p/HaapiShopApiKeyRequestMessage');
const GameContextCreateRequestMessage = require('./p/GameContextCreateRequestMessage');
const QuestListRequestMessage = require('./p/QuestListRequestMessage');
const ChannelEnablingMessage = require('./p/ChannelEnablingMessage');
const AnomalySubareaInformationRequestMessage = require('./p/AnomalySubareaInformationRequestMessage');
const MapInformationsRequestMessage = require('./p/MapInformationsRequestMessage');
const GameMapMovementConfirmMessage = require('./p/GameMapMovementConfirmMessage');

module.exports = {
    ProtocolRequired: [ProtocolRequired],
    HelloConnectMessage: [ClientKeyMessage, IdentificationMessage],
    ServersListMessage: [ServerSelectionMessage],
    HelloGameMessage: [AuthenticationTicketMessage],
    AuthenticationTicketAcceptedMessage: [HaapiApiKeyRequestMessage],
    HaapiApiKeyMessage: [CharactersListRequestMessage],
    BasicAckMessage: [BasicPingMessage],
    CharactersListMessage: [CharacterSelectionMessage],
    HaapiSessionMessage: [FriendsGetListMessage, AcquaintancesGetListMessage, IgnoredGetListMessage,
        SpouseGetInformationsMessage, GuildGetInformationsMessage, GuildGetPlayerApplicationMessage,
        GuildRanksRequestMessage, AllianceGetPlayerApplicationMessage, AllianceRanksRequestMessage
    ],
    CharacterLoadingCompleteMessage: [HaapiShopApiKeyRequestMessage, ClientKeyMessage, GameContextCreateRequestMessage],
    HaapiShopApiKeyMessage: [QuestListRequestMessage, ChannelEnablingMessage, AnomalySubareaInformationRequestMessage],
    CurrentMapMessage: [MapInformationsRequestMessage],
    GameMapMovementMessage: [GameMapMovementConfirmMessage],
};

