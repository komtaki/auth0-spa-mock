import NodeCache from "node-cache";

const nodeCache = new NodeCache();

export type TokenConfig = {
  nonce: string
  audience: string
  scope: string
}
class TokenCache {
  private readonly KEY = 'tokenConfig'

  set = (value: TokenConfig) => {
    nodeCache.set(this.KEY, value);
  };

  get = (): TokenConfig | undefined => {
    return nodeCache.get(this.KEY);
  };
}

export default TokenCache;
