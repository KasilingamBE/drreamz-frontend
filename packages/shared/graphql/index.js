import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { createAppSyncLink } from 'aws-appsync';
import aws_exports from '../aws-exports';

const url = aws_exports.aws_appsync_graphqlEndpoint;
const apiKey = aws_exports.aws_appsync_apiKey;

const region = aws_exports.aws_appsync_region;

const httpLink = createHttpLink({
  uri: url
});

const awsLink = createAppSyncLink({
  url: url,
  region: region,
  auth: {
    type: aws_exports.aws_appsync_authenticationType,
    apiKey: apiKey
  }
  // complexObjectsCredentials: () => Auth.currentCredentials(),
});

export const client = new ApolloClient({
  // link,
  link: awsLink.concat(httpLink),
  cache: new InMemoryCache()
});
