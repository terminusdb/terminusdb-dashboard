## DocumentClassesSummary
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
|totalDocumentCount|the total number of documents insert|
|perDocumentCount| the number of document insert for type|
|onDocumentClick| A function which acts as a callback when the document class card is clicked|

## Example
```js
import React, {useEffect} from "react"
import {DocumentClassesSummary,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const Documents = ({tdbClient}) => {   
    const {perDocumentCount,
        totalDocumentCount, 
        getDocumentNumbers,
        setError,
        loading,
        error}=useTDBDocuments(tdbClient)


    useEffect(() => {
       if(tdbClient)getDocumentNumbers()
    }, [tdbClient])

    function handleCardClick (doc) {
        // do something after click the card, 
        // maybe navigate in the document list page
    }

    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
   
    return <div className="w-100">
            {error && {error && <div>Server Error: {errorMessage} </div>}
            <DocumentClassesSummary 
                    totalDocumentCount={totalDocumentCount}
                    perDocumentCount={perDocumentCount} 
                    onDocumentClick={handleCardClick}/>
        </div>
}
```

you can see this code integrated inside a dashboard here
[DocumentSearchComponent code]()
[Sandbox]


