import {
  Client,
  ClientBuilder,
  ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  BaseAddress,
  CartDraft,
  CustomerDraft,
  CustomerUpdate,
  createApiBuilderFromCtpClient,
  CartUpdateAction,
  CartUpdate,
  LineItemDraft,
} from '@commercetools/platform-sdk';
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

  async getProducts(page: number, limit: number) {
    this.createClient();

    let result;
    if (this.apiRoot) {
      result = await this.apiRoot
        .products()
        .get({
          queryArgs: {
            limit,
            offset: (page - 1) * limit,
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
    this.createClient();

    let result;
    const priceArr: number[] = [];
    const attributesObject: { [key: string]: (string | number)[] } = {};
    if (this.apiRoot) {
      try {
        const response = await this.apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: {
              limit: 100,
            },
          })
          .execute();
        const productTypes = response.body.results;
        productTypes.forEach((productType) => {
          const price = productType.masterVariant.prices?.[0].value.centAmount;
          if (price) {
            priceArr.push(price);
          }
          productType.masterVariant.attributes?.forEach((attribute) => {
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
          const minPrice = Math.min(...priceArr);
          const maxPrice = Math.max(...priceArr);
          attributesObject.minPrice = [minPrice];
          attributesObject.maxPrice = [maxPrice];
        });
      } catch (error) {
        result = error;
      }
    }
    result = attributesObject;
    return result;
  }

  async filter(
    checkboxChecked: { [key: string]: string[] },
    sortingApi: string,
    minPrice: string,
    maxPrice: string,
    page?: number,
    limitPage?: number
  ) {
    this.createClient();

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

    if (minPrice !== undefined && maxPrice !== undefined) {
      filters.push(`variants.price.centAmount:range(${minPrice} to ${maxPrice})`);
    }
    if (this.apiRoot) {
      const queryArgs: { [key: string]: string | string[] | number | undefined } = {
        'filter.query': filters,
        limit: 40,
      };
      if (sortingApi) {
        queryArgs.sort = sortingApi;
      }
      result = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs,
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

  async search(text: string) {
    this.createClient();

    let result;
    if (this.apiRoot) {
      result = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': `*${text}*`,
            fuzzy: true,
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

  async getCategory() {
    this.createClient();
    let result;
    if (this.apiRoot) {
      await this.apiRoot
        .categories()
        .get()
        .execute()
        .then((response) => {
          result = response.body.results;
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
    this.createClient();

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
      } catch (error) {
        throw new Error('Password change failed');
      }
    }

    localStorage.clear();

    this.ctpClient = null;
    this.apiRoot = null;
    userTokenCache.set({
      token: '',
      expirationTime: 0,
    });
    await this.login(email, newPassword);

    return response;
  }

  async getProductsOfCategory(categoryId: string) {
    this.createClient();
    let result;
    if (this.apiRoot) {
      result = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [`categories.id:"${categoryId}"`],
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

  async getBreadcrumbsOfCategory(categoryId: string) {
    this.createClient();
    let result;
    try {
      if (this.apiRoot) {
        const categoryResponse = await this.apiRoot.categories().withId({ ID: categoryId }).get().execute();
        const category = categoryResponse.body;
        let parentCategory = null;
        if (category.parent) {
          const parentCategoryResponse = await this.apiRoot
            .categories()
            .withId({ ID: category.parent.id })
            .get()
            .execute();
          parentCategory = parentCategoryResponse.body;
        }
        result = { category, parentCategory };
      }
    } catch (error) {
      result = error;
    }
    return result;
  }

  async createCart(customerId?: string) {
    this.createClient();

    const cartDraft: CartDraft = {
      currency: 'EUR',
      country: 'US',
      customerId: customerId || undefined,
    };

    let response;
    if (this.apiRoot) {
      response = await this.apiRoot
        .carts()
        .post({
          body: cartDraft,
        })
        .execute();
    }
    if (response) {
      localStorage.setItem('cartPetShopId', response.body.id);
    }
    console.log(response);
    return response;
  }

  async addToCart(cardId: string, productId: string, variantId: number, quantity: number, version: number) {
    this.createClient();
    let result;
    try {
      const lineItemDraft: LineItemDraft = {
        productId,
        variantId,
        quantity,
      };

      const updateAction: CartUpdateAction = {
        action: 'addLineItem',
        ...lineItemDraft,
      };

      const cartUpdate: CartUpdate = {
        version,
        actions: [updateAction],
      };

      if (this.apiRoot) {
        result = await this.apiRoot.carts().withId({ ID: cardId }).post({ body: cartUpdate }).execute();
      }
    } catch (error) {
      result = error;
    }
    return result;
  }

  async getCart(cartId: string) {
    this.createClient();

    let response;
    if (this.apiRoot) {
      response = await this.apiRoot.carts().withId({ ID: cartId }).get().execute();
    }

    return response;
  }

  // async updateCart(cartId: string, customerId: string, cartVersion: number) {
  //   this.createClient();

  //   let response;
  //   if (this.apiRoot) {
  //     response = await this.apiRoot
  //       .carts()
  //       .withId({ ID: cartId })
  //       .post({
  //         body: {
  //           version: cartVersion,
  //           actions: [{ action: 'setCustomerId', customerId }],
  //         },
  //       })
  //       .execute();
  //   }
  //   return response;
  // }
}
