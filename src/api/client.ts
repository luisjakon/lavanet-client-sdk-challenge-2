import { createProtobufRpcClient, QueryClient, StargateClient } from '@cosmjs/stargate';
import { Tendermint34Client, HttpEndpoint } from '@cosmjs/tendermint-rpc';
import { StargateClientOptions } from '@cosmjs/stargate/build/stargateclient';
import { QueryClientImpl, QueryNumPoolsResponse } from '../proto/osmosis/gamm/v1beta1/query';
import { ServiceClientImpl, GetLatestBlockResponse } from '../proto/cosmos/base/tendermint/v1beta1/query';

// Protobuf RPC client for Lavanet SDK Challenge
export class LavanetClient extends StargateClient {
  constructor(tmClient: Tendermint34Client | undefined, options: StargateClientOptions) {
    super(tmClient, options);
  }

  // Request latest cosmos/tendermint block from the osmosis rpc endpoint
  async getLatestBlock(): Promise<GetLatestBlockResponse | null> {
    const queryService = new ServiceClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    const resp = await queryService.GetLatestBlock({});
    return resp ?? null;
  }

  // Request osmosis/gamm/numPools from the osmosis rpc endpoint
  async numPools(): Promise<QueryNumPoolsResponse | null> {
    const queryService = new QueryClientImpl(createProtobufRpcClient(this.forceGetQueryClient()));
    const resp = await queryService.NumPools({});
    return resp ?? null;
  }
}

// Create a LavanetClient
export async function getClient(endpoint: string): Promise<LavanetClient> {
  const tmClient = await Tendermint34Client.connect({
    url: endpoint,
    headers: {
      // mode: 'cors',
      // cache: 'no-store',
      // referer: '',
      // referrerPolicy: 'same-origin',
    },
  } as HttpEndpoint);
  return new LavanetClient(tmClient, {});
}

export function getLatestBlockHeight(data: GetLatestBlockResponse | null): number | null {
  return data?.block?.header?.height ? Number(data.block!.header!.height) : null;
}

export function getLatestBlockHash(data: GetLatestBlockResponse | null): string {
  return Buffer.from(data?.blockId?.hash || new Uint8Array()).toString('base64') || '';
}

export function getNumPools(data: QueryNumPoolsResponse | null): number | null {
  return data?.numPools.toNumber() || null;
}
