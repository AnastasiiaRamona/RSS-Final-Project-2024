import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { BaseAddress, CustomerDraft, CustomerUpdate, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  clientId,
  clientSecret,
  projectKey,
  authHostUrl,
  apiHostUrl,
  defaultCustomerScope,
  userTokenCache,
} from './data';

export default class CommerceToolsAPI {
  private apiRoot: ByProjectKeyRequestBuilder | null = null;

  private ctpClient: Client | null = null;

  private token: string | null = null;

  private authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authHostUrl,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes: defaultCustomerScope,
    fetch,
  };

  private createPasswordFlowOptions(username: string, password: string): PasswordAuthMiddlewareOptions {
    return {
      host: authHostUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
        user: {
          username,
          password,
        },
      },
      scopes: defaultCustomerScope,
      fetch,
      tokenCache: userTokenCache,
    };
  }

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiHostUrl,
    fetch,
  };

  private createCredentialsClient() {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  private createPasswordClient(options: PasswordAuthMiddlewareOptions) {
    return new ClientBuilder()
      .withProjectKey(projectKey)
      .withPasswordFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  private createExistingTokenClient() {
    this.token = localStorage.getItem('userToken');
    const authorization: string = `Bearer ${this.token}`;

    const options: ExistingTokenMiddlewareOptions = {
      force: true,
    };

    return new ClientBuilder()
      .withExistingTokenFlow(authorization, options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  private createClient() {
    if (!localStorage.getItem('userToken')) {
      this.ctpClient = this.createCredentialsClient();
    } else {
      this.ctpClient = this.createExistingTokenClient();
    }
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });
  }

  async login(email: string, password: string) {
    const options = this.createPasswordFlowOptions(email, password);
    this.ctpClient = this.createPasswordClient(options);
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });
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
      localStorage.setItem('userPetShopId', response.body.customer.id);
    }

    localStorage.setItem('userToken', userTokenCache.get().token);
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
    this.ctpClient = this.createCredentialsClient();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });

    let response;

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
    if (this.apiRoot) {
      response = await this.apiRoot
        .customers()
        .post({
          body: customerDraft,
        })
        .execute();
    }

    await this.login(email, password);

    return response;
  }

  async emailCheck(email: string) {
    this.ctpClient = this.createCredentialsClient();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });

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

  async getProducts() {
    this.createClient();

    let result;
    if (this.apiRoot) {
      result = await this.apiRoot
        .products()
        .get({
          queryArgs: {
            limit: 40,
          },
        })
        .execute()
        .then((response) => {
          const products = response.body.results.map((product) => {
            const productData = {
              id: product.id,
              name: product.masterData.current.name['en-US'],
              description: product.masterData.current.description?.['en-US'],
              imageUrl: product.masterData.current.masterVariant.images?.[0]?.url,
              price: product.masterData.current.masterVariant.prices?.[0]?.value.centAmount,
              discountedPrice: product.masterData.current.masterVariant.prices?.[0]?.discounted?.value.centAmount,
            };
            return productData;
          });
          return products;
        })
        .catch((error) => {
          result = error;
        });
    }
    return result;
  }

  async getAttributes() {
    this.ctpClient = this.createCredentialsClient();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });
    let result;
    const attributesObject: { [key: string]: (string | number)[] } = {};
    if (this.apiRoot) {
      try {
        const response = await this.apiRoot.products().get().execute();
        const productTypes = response.body.results;
        productTypes.forEach((productType) => {
          productType.masterData.current.masterVariant.attributes?.forEach((attribute) => {
            const attributeName = attribute.name;
            const attributeValue =
              Array.isArray(attribute.value) && typeof attribute.value[0] === 'object'
                ? attribute.value[0]['en-US']
                : attribute.value[0];

            if (attributesObject[attributeName]) {
              attributesObject[attributeName].push(attributeValue);
            } else {
              attributesObject[attributeName] = [attributeValue];
            }
          });
        });
      } catch (error) {
        result = error;
      }
    }
    result = attributesObject;
    return result;
  }

  async filter(checkboxChecked: { [key: string]: string[] }) {
    this.ctpClient = this.createCredentialsClient();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({ projectKey });
    const localeArr = ['color-of-toy', 'quantity'];
    let result;
    const filters: string[] = [];
    Object.keys(checkboxChecked).forEach((key) => {
      const attributeValues = checkboxChecked[key];
      const attributeName = key;
      let locale = '';
      if (localeArr.includes(key)) {
        locale = '.en-US';
      }
      const filterValues = attributeValues.map((value) => `"${value}"`).join(', ');
      filters.push(`variants.attributes.${attributeName}${locale}:${filterValues}`);
    });
    if (this.apiRoot) {
      result = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'filter.query': filters,
            limit: 40,
          },
        })
        .execute()
        .then((response) => {
          const products = response.body.results.map((product) => {
            const productData = {
              id: product.id,
              name: product.name['en-US'],
              description: product.description?.['en-US'],
              imageUrl: product.masterVariant.images?.[0]?.url,
              price: product.masterVariant.prices?.[0]?.value.centAmount,
              discountedPrice: product.masterVariant.prices?.[0]?.discounted?.value.centAmount,
            };
            return productData;
          });
          return products;
        })
        .catch((error) => {
          result = error;
        });
    }
    return result;
  }

  async getProductByID(id: string) {
    this.createClient();
    let response;
    if (this.apiRoot) {
      response = await this.apiRoot.products().withId({ ID: id }).get().execute();
    }
    return response;
  }

  async getCustomerByID(id: string) {
    this.createClient();
    let response;
    if (this.apiRoot) {
      response = await this.apiRoot.customers().withId({ ID: id }).get().execute();
    }
    return response;
  }

  async updateCustomer(id: string, updateData: CustomerUpdate) {
    this.createClient();

    let response;
    if (this.apiRoot) {
      response = await this.apiRoot
        .customers()
        .withId({ ID: id })
        .post({
          body: updateData,
        })
        .execute();
    }
    return response;
  }

  async changePassword(version: number, currentPassword: string, newPassword: string, email: string) {
    let response;
    if (this.apiRoot) {
      try {
        response = await this.apiRoot
          .me()
          .password()
          .post({
            body: {
              currentPassword,
              newPassword,
              version,
            },
          })
          .execute();
        localStorage.clear();
        await this.login(email, newPassword);
      } catch (error) {
        console.log('Error changing password:', error);
        throw new Error('Password change failed');
      }
    }

    return response;
  }
}
