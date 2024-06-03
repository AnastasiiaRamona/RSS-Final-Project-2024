import { TokenStore } from '@commercetools/sdk-client-v2';
import UserTokenCache from '../components/userTokenCache';

describe('UserTokenCache', () => {
  let tokenCache: UserTokenCache;

  beforeEach(() => {
    tokenCache = new UserTokenCache();
  });

  test('should initialize with empty token and expiration time', () => {
    const cache = tokenCache.get();
    expect(cache.token).toBe('');
    expect(cache.expirationTime).toBe(0);
  });

  test('should set and get token cache', () => {
    const newCache: TokenStore = {
      token: 'new-token',
      expirationTime: 1234567890,
    };
    tokenCache.set(newCache);

    const cache = tokenCache.get();
    expect(cache.token).toBe('new-token');
    expect(cache.expirationTime).toBe(1234567890);
  });
});
