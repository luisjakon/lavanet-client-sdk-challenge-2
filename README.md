# How to build and run

1. Run `npm install`

2. Run `npm run build:proto`

3. Run `npm run build`

4. Run `npm run build:web`

5. Run `npm run exec:api`

6. Run `npm run exec:web`

7. Open Google Chrome and go to `https://localhost:4000`

8. Open Dev Tools and look at console tab for output...

Note: Be patient. Takes a few seconds for updates to appear since the block height goes up by 10 every 30-40s or so...

There are many ways to fetch and present the data. I chose a subscription with an explicit unsubscribe method to give users the choice of when to stop polling the service.

The demo uses a timeout function to auto expire the polling. Not necessary, but just thought it'd be better to show how to use it without incurring a forever loop needlessly polling the rpc servers.

Anyway, interesting exercise. I'm sure packaging and api development/cleanup could be better but that's all I had time to do this weekend. Hope all is well!

Best,

Luis

# API

```
lavanet.RPC_ENDPOINT = 'https://rpc.osmosis.zone';
lavanet.subscribe((v: APIChallengeResult) => {
    console.log(`API Results - block height: ${v.LatestBlockHeight}, block hash: ${v.LatestBlockHash}, numPools: ${v.NumPools}, ts: ${v.Timestamp}`);
  });

```

```
// Challenge Result
interface ChallengeResult {
  LatestBlockHeight: number;
  LatestBlockHash: string;
  NumPools: number;
  Timestamp: number;
}
```

# INTERNAL

The protobuf implemenation is generated directly using protoc by running the `npm run build:proto` command.

The proto files have been made lean to just contain the necessary parts required for the challenge.

The LavanetClient class handles all queries. The lavanet namespace exposes the public subscription-based API, although the user can also create and interact at will with the exported LavanetClient as well.

The LavanetClient exposes the raw grpc responses for each type of query whereas the lavanet module exposes a simple-to-use subscription method.
