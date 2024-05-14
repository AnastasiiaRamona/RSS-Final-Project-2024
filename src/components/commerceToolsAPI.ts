import {
  Client,
  ClientBuilder,
  ClientResponse,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
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

  async register(email: string, password: string) {
    const ctpClient = this.createClient();
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

    const response = await this.apiRoot
      .customers()
      .post({
        body: {
          email,
          password,
        },
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
