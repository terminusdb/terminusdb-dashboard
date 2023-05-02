# useTDBGraphqlQuery
`useTDBGraphqlQuery`  is the main hook to connect @terminusdb/terminusdb-react-table with TerminusCMS server . To use it, pass it with an instance of 
ApolloClient

  Instance Properties  
- `changeLimits: Function(currentlimit:Number,currentpage:Number)`
	- this function change the `limit` and `start` status properties and call the server with pagination allows returning only a portion, rather than the whole, result.
 - `state.loading : Bool` 
	 -  This is the current  `loading`  value, located on the state, if true the hook is doing a server call
 - `state.error: Object|Bool`
	 - This is the current error reporting object from the server, located on the state, the starting value is false .
 - `state.limit: Number`
	 - this is set the limit clause to select a limited number of records, The starting value is 10. Using the `changeLimits` function you will change the status of this property
 - `state.start:Number`
	 this is set the pagination options, pagination allows returning only a portion, rather than the whole, result set. The start value is 0. Using the `changeLimits` function you will change the status of this property
	 
	
[Code](..)
[Sandbox]

