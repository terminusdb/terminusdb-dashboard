## ListDocumentComponent
The component DocumentClassesSummary can help you to compose your dashboard very fast 
This element allow you to visualize the document classes using iteractive cards.

## Installation

Install the dependancy from npm

```
 npm install @terminusdb/terminusdb-documents-ui
 npm install @terminusdb/terminusdb-react-table
 npm install @terminusdb/terminusdb-documents-ui-templates
```

## Props
| props |description  |
|--|--|
|type| the document type
|gqlQuery|the graphql query|
|apolloClient| an apollo client instance [documentation](https://www.apollographql.com/docs/react/)|
|tableConfig| an object with the table configuration|
|onRowClick|A function which acts as a callback when the table row is clicked|
|onViewButtonClick|A function which acts as a callback when the table row view button is clicked|
|onEditButtonClick|A function which acts as a callback when the table row edit button is clicked|
|onDeleteButtonClick|A function which acts as a callback when the table row delete button is clicked|
|onCreateButtonClick|A function which acts as a callback when the create button is clicked|
|showGraphqlTab|A boolean property that enabled the graph query view tab|

## Example
```js
import React, {useEffect} from "react";
import {gql} from "@apollo/client";
import { ListDocumentsComponent,useTDBDocuments } from "@terminusdb/terminusdb-documents-ui-template";

// I pass this so I'm sure it exists before loading the component
export const ListDocuments = ({type,apolloClient,tdbClient}) => {    
    const {deleteDocument,
        loading,
        error,
        getGraphqlTablesConfig,
        documentTablesConfig,
        setError} = useTDBDocuments(tdbClient)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        getGraphqlTablesConfig()
    },[tdbClient])

    async function callDeleteDocument(row){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            let fullId = row['id']
            const delCall = await deleteDocument(fullId)
            if(delCall){
               //do something after delete
            }
        } 
    }

    const onViewClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
         //do something after row view button click
    }

    const onEditClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
         //do something after row edit button click
    }

    function handleCreate(e) {
        //do something after create button  click
    }

    if(loading) return <div>{`Fetching ${type} ...`}></div>
    
    const querystr  = documentTablesConfig ? documentTablesConfig.objQuery[type].query : null
    const query = querystr ? gql`${querystr}` : false
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error

    return  <React.Fragment>
             {errorMessage  && <div>Server Error: {errorMessage} </div>}}
            {query &&
            <ListDocumentsComponent type={type}
                gqlQuery={query} 
                apolloClient={apolloClient} 
                tablesConfig={documentTablesConfig} 
                onRowClick={onViewClick} 
                onViewButtonClick={onViewClick}
                onEditButtonClick={onEditClick}
                onDeleteButtonClick={callDeleteDocument}
                onCreateButtonClick={handleCreate}/>}
            </React.Fragment> 
}
```

you can see this code integrated inside a dashboard here
[ListDocuments full example code]()
[ListDocumentComponent code]()
[View the complete example in Sandbox]()


