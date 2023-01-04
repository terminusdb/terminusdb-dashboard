import { ApolloClient,ApolloLink, concat, InMemoryCache, ApolloProvider, gql, HttpLink, Query } from '@apollo/client';
 

//local/branch/main
 //add an ENV var 
 //This is only a demo you must not connect in base auth from the interface it is not secure
export const createApolloClient = ()=>{

   //const branchName =  localStorage.getItem("TERMINUSCMS_BRANCH")
   // const user = localStorage.getItem("TerminusCMS-USER") 
   // const key = localStorage.getItem("TerminusCMS-KEY")

   // const basicAuth = btoa(`${user}:${key}`)

    const url = `http://localhost:4242/terminusdbcms/api/graphql/terminuscms/lego` 
    //: "http://localhost:6363/api/graphql/terminuscms/lego" 

    const httpLink = new HttpLink({ uri: url });
    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpXUjBIOXYyeTFORUdaZXlodUM0aCJ9.eyJodHRwOi8vdGVybWludXNkYi5jb20vc2NoZW1hL3N5c3RlbSN0ZWFtIjoiY29sbGFyX3RlYW0iLCJodHRwOi8vdGVybWludXNkYi5jb20vc2NoZW1hL3N5c3RlbSNlbWFpbCI6ImNvbGxhYm9yYXRvckBnbWFpbC5jb20iLCJodHRwOi8vdGVybWludXNkYi5jb20vc2NoZW1hL3N5c3RlbSNhZ2VudF9uYW1lIjoiYXV0aDB8NjE1NDYyZjhhYjMzZjQwMDZhNmJlZTBjIiwiaXNzIjoiaHR0cHM6Ly9zaWdudXAtZGV2LnRlcm1pbnVzZGIuY29tLyIsInN1YiI6ImF1dGgwfDYxNTQ2MmY4YWIzM2Y0MDA2YTZiZWUwYyIsImF1ZCI6WyJodHRwczovL3Rlcm1pbnVzY2xvdWQvdXNlcnMiLCJodHRwczovL3Rlcm1pbnVzLWNsb3VkLWRldi5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjcxNTMzMDY4LCJleHAiOjE2NzE2MTk0NjgsImF6cCI6InM2aVlGSnpvU2VkVUhHVVVhUllDR0dXWFdFUEhrZDAyIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.zS6BEaRmc5R3lcDixdvDV6_9x-lZsrJglK9PWGezWuQwnJ87ayQsAuFaggKp3MVQwz-NMMTiT6QCEumLLPyDpEKeL-CrEa20vAAmDVb2c4Py918Gd4PwCmvfk5I2Bxa3cBv9j1CQmXtvyHz6-NQJu5dAUTsoMhbHUPN2fQ1VnNwoXiYOHd_2_IjbW7MsMg6ews5aGjfu4yniYrzYagCxISTYPP58iAKET-czIk14cWZ4_QRE4ObXpjDOPjbHYDncAHYaxD5nzLXTf0N7I9pEG1Gvws6gngXQWYyWkPu9xPKZN7Ekg6NX07Nb9Rk2WXVv_Ab06y8FHtgmVnvs0bYy3w'
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