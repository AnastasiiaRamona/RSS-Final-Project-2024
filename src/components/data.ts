import UserTokenCache from './userTokenCache';

const clientId = process.env.CLIENT_ID || '';
const clientSecret = process.env.CLIENT_SECRET || '';
const projectKey = process.env.PROJECT_KEY || '';
const authHostUrl = 'https://auth.eu-central-1.aws.commercetools.com';
const apiHostUrl = 'https://api.eu-central-1.aws.commercetools.com';
const defaultCustomerScope = ['manage_project:paws-and-claws'];
const userTokenCache = new UserTokenCache();
export { clientId, clientSecret, projectKey, authHostUrl, apiHostUrl, defaultCustomerScope, userTokenCache };
