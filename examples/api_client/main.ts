import { lavanet } from '../../src';
import { Time } from '../common/utils';

const SUBSCRIPTION_PERIOD = 3 * Time.MINUTE;

const RPC_ENDPOINTS = [
  'https://osmosis-mainnet-rpc.allthatnode.com:26657', // [0]
  'https://rpc-osmosis.blockapsis.com', // [1]
  'https://rpc.juno.omniflix.co', // [2] - flaky
  'https://osmosis-rpc.polkachu.com', // [3] - cors issues
  'https://rpc.osmosis.zone', // [4] - cors issues
  'https://rpc-test.osmosis.zone', // [5] - cors issues
];

export const main = async () => {
  // Change endpoint in case they are not responsive or have other issues (e.g. cors)...
  lavanet.RPC_ENDPOINT = RPC_ENDPOINTS[0];

  // subscribe to challenge results
  const unsubscribe = await lavanet.subscribe(v => {
    console.log(`API Results - block height: ${v.LatestBlockHeight}, block hash: ${v.LatestBlockHash}, numPools: ${v.NumPools}, ts: ${v.Timestamp}`);
  });

  // unsubscribe after 3 minutes
  setTimeout(unsubscribe, SUBSCRIPTION_PERIOD);
};

main().then(() => {
  console.log('Sample client will automatically stop after 3 mins.');
  console.log('Waiting for client responses...');
});
