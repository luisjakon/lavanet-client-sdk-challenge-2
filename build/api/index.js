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
exports.lavanet = exports.LavanetClient = void 0;
const client_1 = require("./client");
var client_2 = require("./client");
Object.defineProperty(exports, "LavanetClient", { enumerable: true, get: function () { return client_2.LavanetClient; } });
// Challenge API
var lavanet;
(function (lavanet) {
    lavanet.RPC_ENDPOINT = 'https://rpc.osmosis.zone';
    lavanet.RPC_ENDPOINT_CHECK_INTERVAL_IN_MS = 2000;
    lavanet.last_checked_height = 0;
    // Create SDK Challenge subscription - main entrypoint
    function subscribe(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create SDK Challlenge Client
            let lavanet_client = yield (0, client_1.getClient)(lavanet.RPC_ENDPOINT);
            // Create SDK Challenge Client processor
            let processor = yield createSDKChallengeProcessor(lavanet_client, callback);
            // Start challenge processor with request interval
            let unsubscribe = setInterval(processor, lavanet.RPC_ENDPOINT_CHECK_INTERVAL_IN_MS);
            // Return unsubscribe method to caller
            return () => {
                // Stop challenge processor
                clearInterval(unsubscribe);
            };
        });
    }
    lavanet.subscribe = subscribe;
})(lavanet = exports.lavanet || (exports.lavanet = {}));
// Create Challenge processor
function createSDKChallengeProcessor(client, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                // SDK Client Challenge 2.
                let latest_block = yield client.getLatestBlock();
                // SDK Client Challenge 2.a
                let block_height = (0, client_1.getLatestBlockHeight)(latest_block);
                // SDK Client Challenge 2.b
                let block_hash = (0, client_1.getLatestBlockHash)(latest_block);
                // Check block height % 10 == 0 before issuing osmosis.numPool() request as per challenge.
                // Also check last_checked_height to avoid RPC_endpoint double queries at same height.
                if (block_height && block_height % 10 == 0 && block_height != lavanet.last_checked_height) {
                    lavanet.last_checked_height = block_height;
                    // SDK Client Challenge 2.c
                    let numPools = yield client.NumPools();
                    callback({
                        LatestBlockHeight: block_height,
                        LatestBlockHash: block_hash,
                        NumPools: (0, client_1.getNumPools)(numPools) || -1,
                        Timestamp: Date.now(),
                    });
                }
            }
            catch (e) {
                // TODO: create better error handling notification mechanism
                console.log('service unavailable.');
            }
        });
    });
}
