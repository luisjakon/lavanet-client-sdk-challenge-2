import { LavanetClient, getClient, getLatestBlockHeight, getLatestBlockHash, getNumPools } from './client';
export { LavanetClient } from './client';

// Challenge Result
export interface ChallengeResult {
  LatestBlockHeight: number;
  LatestBlockHash: string;
  NumPools: number;
  Timestamp: number;
}

// Challenge Client SDK API
export namespace lavanet {
  export let RPC_ENDPOINT: string = 'https://rpc.osmosis.zone';
  export let RPC_ENDPOINT_CHECK_INTERVAL_IN_MS = 2000;

  // Create main entrypoint (subscription style) -
  export async function subscribe(callback: (v: ChallengeResult) => void): Promise<() => void> {
    // Create SDK Challlenge Client
    let lavanet_client = await getClient(RPC_ENDPOINT);

    // Create SDK Challenge Client processor
    let processor = await createSDKChallengeProcessor(lavanet_client, callback);

    // Start challenge processor with request interval
    let unsubscribe = setInterval(processor, RPC_ENDPOINT_CHECK_INTERVAL_IN_MS);

    // Return unsubscribe method to caller
    return () => {
      // Stop challenge processor
      clearInterval(unsubscribe);
    };
  }
}

// Create Challenge processor
async function createSDKChallengeProcessor(client: LavanetClient, callback: (v: ChallengeResult) => void): Promise<() => void> {
  let last_checked_height = 0;

  return async () => {
    try {
      // SDK Client Challenge 2.
      let latest_block = await client.getLatestBlock();

      // SDK Client Challenge 2.a
      let block_height = getLatestBlockHeight(latest_block);

      // SDK Client Challenge 2.b
      let block_hash = getLatestBlockHash(latest_block);

      // Check block height % 10 == 0 before issuing osmosis.numPool() request as per challenge.
      // Also check last_checked_height to avoid RPC_endpoint double queries at same height.
      if (block_height && block_height % 10 == 0 && block_height != last_checked_height) {
        last_checked_height = block_height;

        // SDK Client Challenge 2.c
        let numPools = await client.numPools();
        callback({
          LatestBlockHeight: block_height,
          LatestBlockHash: block_hash,
          NumPools: getNumPools(numPools) || -1,
          Timestamp: Date.now(),
        });
      }
    } catch (e) {
      // TODO: create better error handling notification mechanism
      console.log('service unavailable.');
    }
  };
}
