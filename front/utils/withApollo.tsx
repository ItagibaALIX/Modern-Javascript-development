import withApollo from 'next-with-apollo';
import {
  ApolloClient, InMemoryCache, ApolloProvider, HttpLink,
} from '@apollo/client';

export default withApollo(({ initialState, headers }) => new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_URL,
    credentials: 'include',
    headers: {
      cookie: headers && headers.cookie,
    },
  }),
  cache: new InMemoryCache().restore(initialState || {}),
}), {
  // eslint-disable-next-line react/prop-types
  render: ({ Page, props }): JSX.Element => (
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  ),
});
