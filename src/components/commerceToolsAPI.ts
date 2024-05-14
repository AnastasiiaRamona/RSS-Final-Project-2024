import {
  Client,
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { BaseAddress, CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { clientId, clientSecret, projectKey, authHostUrl, apiHostUrl, defaultCustomerScope } from './data';

export default class CommerceToolsAPI {
  apiRoot: ByProjectKeyRequestBuilder | null = null;

  ctpClient: Client;

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

  constructor() {
    this.ctpClient = this.createClient();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });
  }

  createClient() {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  async login(email: string, password: string) {
    let response;
    if (this.apiRoot) {
      response = await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
    }
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
    isBillingAddressDefault: boolean,
    isShippingAddressDefault: boolean
  ) {
    const ctpClient = this.createClient();
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

    const addresses: BaseAddress[] = [billingAddress, shippingAddress];

    let defaultBillingIndex: number | undefined;
    let defaultShippingIndex: number | undefined;
    if (isBillingAddressDefault) {
      defaultBillingIndex = addresses.indexOf(billingAddress);
    }
    if (isShippingAddressDefault) {
      defaultShippingIndex = addresses.indexOf(shippingAddress);
    }

    const customerDraft: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      billingAddresses: [addresses.indexOf(billingAddress)],
      shippingAddresses: [addresses.indexOf(shippingAddress)],
      defaultBillingAddress: defaultBillingIndex !== undefined ? defaultBillingIndex : undefined,
      defaultShippingAddress: defaultShippingIndex !== undefined ? defaultShippingIndex : undefined,
    };

    const response = await this.apiRoot
      .customers()
      .post({
        body: customerDraft,
      })
      .execute();
    return response;
  }

  async emailCheck(email: string) {
    let response;
    if (this.apiRoot) {
      response = await this.apiRoot
        .customers()
        .get({
          queryArgs: {
            where: `email="${email}"`,
          },
        })
        .execute();
    }
    return response;
  }
}
