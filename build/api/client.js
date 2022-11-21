"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumPools = exports.getLatestBlockHash = exports.getLatestBlockHeight = exports.getClient = exports.LavanetClient = void 0;
const stargate_1 = require("@cosmjs/stargate");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const query_1 = require("../proto/osmosis/gamm/v1beta1/query");
const query_2 = require("../proto/cosmos/base/tendermint/v1beta1/query");
// Protobuf RPC client for Lavanet SDK Challenge
class LavanetClient extends stargate_1.StargateClient {
    constructor(tmClient, options) {
        super(tmClient, options);
    }
    // Request latest cosmos/tendermint block from the osmosis rpc endpoint
    getLatestBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryService = new query_2.ServiceClientImpl((0, stargate_1.createProtobufRpcClient)(this.forceGetQueryClient()));
            const resp = yield queryService.GetLatestBlock({});
            return resp !== null && resp !== void 0 ? resp : null;
        });
    }
    // Request osmosis/gamm/numPools from the osmosis rpc endpoint
    NumPools() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryService = new query_1.QueryClientImpl((0, stargate_1.createProtobufRpcClient)(this.forceGetQueryClient()));
            const resp = yield queryService.NumPools({});
            return resp !== null && resp !== void 0 ? resp : null;
        });
    }
}
exports.LavanetClient = LavanetClient;
// Create a LavanetClient
function getClient(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const tmClient = yield tendermint_rpc_1.Tendermint34Client.connect({
            url: endpoint,
            headers: {
            // mode: 'cors',
            // cache: 'no-store',
            // referer: '',
            // referrerPolicy: 'same-origin',
            },
        });
        return new LavanetClient(tmClient, {});
    });
}
exports.getClient = getClient;
function getLatestBlockHeight(data) {
    var _a, _b;
    return ((_b = (_a = data === null || data === void 0 ? void 0 : data.block) === null || _a === void 0 ? void 0 : _a.header) === null || _b === void 0 ? void 0 : _b.height) ? Number(data.block.header.height) : null;
}
exports.getLatestBlockHeight = getLatestBlockHeight;
function getLatestBlockHash(data) {
    var _a;
    return Buffer.from(((_a = data === null || data === void 0 ? void 0 : data.blockId) === null || _a === void 0 ? void 0 : _a.hash) || new Uint8Array()).toString('base64') || '';
}
exports.getLatestBlockHash = getLatestBlockHash;
function getNumPools(data) {
    return (data === null || data === void 0 ? void 0 : data.numPools.toNumber()) || null;
}
exports.getNumPools = getNumPools;
