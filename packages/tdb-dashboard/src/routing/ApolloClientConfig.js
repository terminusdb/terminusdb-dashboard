import { ApolloClient,ApolloLink, concat, InMemoryCache, HttpLink } from '@apollo/client';

export const createApolloClient = (woqlClient)=>{

  const customFetch = (uri, options) => {
    const url = woqlClient.db() ? woqlClient.connectionConfig.branchBase("graphql") : woqlClient.connectionConfig.url;
    return fetch(url, options);
  };
 
  const httpLink = new HttpLink({fetch:customFetch})//{uri:client.connectionConfig.branchBase("graphql")})  //new HttpLink(urlObj);
  
  const autorization = woqlClient.localAuth().type === "jwt" ? 'Bearer '+ woqlClient.localAuth().key : 'Basic '+ btoa(`${woqlClient.localAuth().user}:${woqlClient.localAuth().key}`)
  const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: autorization}
        }));
        return forward(operation);
    })
    
    const cache = new InMemoryCache({
        addTypename: false
    });

    //offsetLimitPagination
    
    const value = concat(authMiddleware, httpLink)

    return new ApolloClient({
        cache:cache,
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },
          query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },
        },
        link: value,       
    });
}