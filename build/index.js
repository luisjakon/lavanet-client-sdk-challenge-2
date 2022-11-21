"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./api"), exports);
// import { lavanet, Time } from '../src/api/index';
// const SUBSCRIPTION_PERIOD = 3 * Time.MINUTE;
// export const main = async () => {
//   // In case rpc endpoints change or are not responsive
//   lavanet.RPC_ENDPOINT = 'https://rpc.juno.omniflix.co'; // "https://rpc.osmosis.zone";
//   // subscribe to challenge results
//   const unsubscribe = await lavanet.subscribe(v => {
//     console.log(`API Results - block height: ${v.LatestBlockHeight}, block hash: ${v.LatestBlockHash}, numPools: ${v.NumPools}`);
//   });
//   // unsubscribe after 3 minutes
//   setTimeout(unsubscribe, SUBSCRIPTION_PERIOD);
// };
// main().then(() => {
//   console.log('Sample client will automatically stop after 3 mins.');
//   console.log('Waiting for client responses...');
// });
