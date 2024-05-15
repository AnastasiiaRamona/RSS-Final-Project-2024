import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class UserTokenCache implements TokenCache {
  cachedTokenInfo: TokenStore = {
    token: '',
    expirationTime: 0,
  };

  get() {
    return this.cachedTokenInfo;
  }

  set(cache: TokenStore) {
    this.cachedTokenInfo = cache;
  }
}
