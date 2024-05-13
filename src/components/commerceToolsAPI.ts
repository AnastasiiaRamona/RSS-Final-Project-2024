import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { BaseAddress, CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { clientId, clientSecret, projectKey, authHostUrl, apiHostUrl, defaultCustomerScope } from './data';

export default class CommerceToolsAPI {
  apiRoot: ByProjectKeyRequestBuilder | null = null;

  authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authHostUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: defaultCustomerScope,
    fetch,
  };

  httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHostUrl,
    fetch,
  };

  createClient() {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  async login(email: string, password: string) {
    const ctpClient = this.createClient();
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

    const response = await this.apiRoot
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return response;
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    billingAddress: BaseAddress,
    shippingAddress: BaseAddress,
    defaultBillingAddress?: BaseAddress,
    defaultShippingAddress?: BaseAddress
  ) {
    const ctpClient = this.createClient();
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

    const addresses: BaseAddress[] = [billingAddress, shippingAddress];

    if (defaultBillingAddress) {
      addresses.push(defaultBillingAddress);
    }
    if (defaultShippingAddress) {
      addresses.push(defaultShippingAddress);
    }

    const customerDraft: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
    };

    const response = await this.apiRoot
      .customers()
      .post({
        body: customerDraft,
      })
      .execute();
    return response;
  }
}
