 # useTDBDocuments
`useTDBDocuments` is the main hook to connect @terminusdb/terminusdb-documents-ui with TerminusCMS server. To use it, pass it with an instance of [@terminusdb/terminusdb-client](https://github.com/terminusdb/terminusdb-client-js)

## useTDBGraphqlQuery parameters
`useTDBDocuments(woqlClient:WOQLClient) `
 - `woqlClient : WOQLClient` 
   - Required
   - An WOQLClientt instance with you connections settings

## Instance Properties
 - `state.loading : Bool` 
	 -  This is the current  `loading`  value, located on the state, if true the hook is doing a server call
 - `state.error: Object|Bool`
	 - This is the current error reporting object from the server, located on the state, the starting value  .
 - `state.perDocumentCount:Object|Bool`
	 - this is the current information about the number of documents of every types present in the database in a specific branch, The starting value is null,  we need to call the `getDocumentsNumber` function to fill this property status
 - `state.totalDocumentCount:Number|Bool`
	 this is the current information about the total number of documents present in the database in a specific branch, the starting value is null,  we need to call the `getDocumentsNumber` function to fill this property status
 - `state.documentClasses:Array|Bool`
	 -	this is the current information about the documents classes, the starting value is null, you need to call the `getDocumentNumbers` or the `getDocumentClasses`
 - `state.selectedDocument:Object|Bool`
	 - this is the current selected document object, the starting value is null, you need to call the `getSelectedDocument` function to fill this property status 
 - `state.frame:Object|Bool`
	 - this is the current documents frames object, the starting value is false, you need to call the `getDocumentFrames`function to fill this property status
 - `state.documentTablesConfig:Object|Bool`
	 - this is the current document tables template, this property status store the graphQL query for every documents and the configuration for the tables and the advanced search components, the starting value is null, you need to call the `getGraphqlTablesConfig`function to fill this property status, after the call the status will be the table config Object or false if the call failed
 - `setError: Function(value:Object|Bool)` 
	 - this function set the error property status.
- `getDocumentClasses: Function()`
	-	this function call the TerminusDB server to get the database classes list and set the `documentClasses` property with the server response.
-	`getDocumentNumbers: Function()` this function call the TerminusDB server to get the database classes list and set the `documentClasses` property with the server response and run a query to get the total number of documents and the numbers of documents for type and fill  the  `perDocumentCount` and the `totalDocumentCount`
- `getDocumentFrames: Function()` this function get the current database frames and set the `frames` status property
- `getGraphqlTablesConfig: Function()` this function call the TerminusDB server to get the graphQL tables configuration and set the  `getGraphqlTablesConfig` property status with the server response or `error` if there was an error in the call.
- `createDocument: Function(jsonDocument:Object)` this function call the server to create a new document in the current database
- `getSelectedDocument: Function(documentId:String)`  call the server to get a document object and set the `selectedDocument` status property with the response
- `deleteDocument: Function(documentId:String)` 
	- call the server to delete a document 
- `updateDocument: Function(jsonDocument:Object)` 
	- call the server to update the document 
- `getDocumentById: Function(documentId:String)` 
	- call the server to get a document object and return it


## Usage
```

```