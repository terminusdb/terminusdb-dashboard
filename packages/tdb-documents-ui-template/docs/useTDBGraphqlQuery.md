# useTDBGraphqlQuery
`useTDBGraphqlQuery`  is the main hook to connect @terminusdb/terminusdb-react-table with TerminusCMS server . To use it, pass it with an instance of [ApolloClient](https://www.apollographql.com/docs/react/)

## useTDBGraphqlQuery parameters
   `useTDBGraphqlQuery(apolloClient:ApolloClient, graphqlQuery:gql, documentType:String, options:Object)`
 - `apolloClient : ApolloClient` 
   - Required
   - An Apollo Client instance with you connections settings
- `graphqlQuery : gql`
   - Required
   - a graphql query
- `documentType : string`
   - Required
   - the document type
-  `options : object `
   The following options are supported via the main options object passed to useTDBGraphqlQuery
   - `limit : number`
      - Optional
      - The initial state value for `limit `
   - `start : number`
      - Optional
      - The initial state value for `start `
   - `tableConfigObj: Object`
      - Optional
      - the table configuration object
   - `hiddenColumns : Array`
      -  Optional
      - The initial state object for `hiddenColumnsArr`  
  ## Instance Properties  
  The following properties are available on the table instance returned from useTDBGraphqlQuery
 - `state.loading : Bool` 
	 -  This is the current  `loading`  value, located on the state, if true the hook is doing a server call
 - `state.error: Object|Bool`
	 - This is the current error reporting object from the server, located on the state, the starting value is false .
 - `state.limit: Number`
	 - this is set the limit clause to select a limited number of records, The starting value is 10. Using the `changeLimits` function you will change the status of this property
 - `state.start:Number`
	 - this is the pagination start value, pagination allows returning only a portion, rather than the whole, result set. The start value is 0. Using the `changeLimits` function you will change the status of this property
 - `state.queryFilters:Object`
	- this is the query filter status, this value is used to fill the filter value in the graphql query variables , Using the `setAdvancedFilters` or `changeFilters` functions you will change the status of this property
 - `state.queryOrders:Object`
	- this is the query orderBy status, this value is used to fill the orderBy value in the graphql query variables. Using the `changeOrders`  functions you will change the status of this property
 - `state.orderBy:Array`
    - this is the table orderBy status, we transform this value to create the queryOrders object. Using the `changeOrders`  functions you will change the status of this property
 - `state.filterBy:Array`
    - this is the table filter status, we transform this value to create the queryFilters object. Using the `changeFilters`  functions you will change the status of this property
 - `state.rowCount:Number`
   - this is the current number of record loaded
 - `state.documentResults:Array`
   - The successful graphql query fetch result data
 - `state.extractedData:Array`
   - The successful graphql query fetch result data formatted for the table 
 - `state.hiddenColumnsArr:Array`
   - In this status is stored the table hiddenColumns list. If a column's ID is contained in this array, it will be hidden Using the `setHiddenColumns ` function you will change the status of this property
 - `callGraphqlServer: Function(currentlimit:Number,currentstart:Number,queryOrders:Object,queryFilters:Object)`
	- this function change the `limit`, the `start` status, the `queryOrders` and the `queryFilters` properties and call the server with pagination allows returning only a portion, rather than the whole, result.
 - `changeLimits: Function(currentlimit:Number,currentstart:Number)`
	- this function change the `limit` and `start` status properties and call the server with pagination allows returning only a portion, rather than the whole, result.
 - `changeOrders: Function(orderByArr:Array)`
	- this function get the graphqlTable orderByArr variable and transform it in the graphql orderBy variables format.
	Set the `queryOrders` and `orderBy` properties status and call the server with the current `queryOrders` and `queryFilters` status
 - `changeFilters: Function(filtersArr:Array)`
	- this function get the graphqlTable filtersArr variable and transform it in the graphql filters variables format.
	Set the `queryFilters` and `filterBy` properties status and call the server with the current `queryFilters` and `queryOrders` status 
 - `setAdvancedFilters: Function(advfilter:Object)`
	- this get the advfilter in the graphql filters variables format, set the `queryFilters` reset the `filterBy` properties status and call the server with the current `queryFilters` and `queryOrders` status 
 - `setHiddenColumns: Function(id:string, checked:bool)`
    this function is called to add or remove a columns id to the `hiddenColumns ` status property
 
	
[Code](..)
[Sandbox]

