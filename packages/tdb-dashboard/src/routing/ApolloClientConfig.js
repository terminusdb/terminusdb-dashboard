import { ApolloClient,ApolloLink, concat, InMemoryCache, HttpLink } from '@apollo/client';
 
//local/branch/main
 //add an ENV var 
 //This is only a demo you must not connect in base auth from the interface it is not secure
export const createApolloClient = (woqlClient)=>{
  if(!woqlClient || !woqlClient.db()) return
  const client = woqlClient.copy()
  const url = client.connectionConfig.branchBase("graphql")

  const httpLink = new HttpLink({ uri: url });
  const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: 'Bearer '+ woqlClient.localAuth().key}
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

// we are using anyuser credential for connecting with the web page
// maybe we can move this in the backend and have an oper endpoint for the website
// but not for the demo
export const createApolloClientWeb = ()=>{
  
  const httpLink = new HttpLink({ uri: "http://localhost:6363/api/graphql/terminuscms/lego" });
  const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
      headers: {
          ...headers,
          authorization: "Basic Y29sbGFib3JhdG9yOmRlbW8="
      }
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