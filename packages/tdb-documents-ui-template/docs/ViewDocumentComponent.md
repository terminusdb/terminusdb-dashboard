## ViewDocumentComponent
The edit document component help you to compose your dashboard very fast 
This element allow you to edit a existing document using the FrameViewer components from `....` and adding some useful tools.


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
|type|the document type
|documentID| the document id 
|documentJson| the document object 
|frames|The database Class Frame, or object of all class frames 
|closeButtonClick| A function which acts as a callback when the panel exit `x` button is clicked
|deleteDocument| A function which acts as a callback when the delete button is clicked
|editDocument| A function which acts as a callback when the edit button is clicked
|getDocumentById| A function which acts as a callback when the inside the document interface a link property (a link to another document) is clicked 

## Example
```js
import React, {useEffect}  from "react";
import {ViewDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const DocumentView = ({tdbClient,type, documentID}) => {      
    const {
        frames,
        selectedDocument,
        error,
        deleteDocument,
        getSelectedDocument,
        getDocumentById,
        getDocumentFrames,
        setError
    } = useTDBDocuments(tdbClient)
 
    useEffect(() => {
        getDocumentFrames()
        getSelectedDocument(documentID)
	}, [] )

    async function callDeleteDocument(){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            const delCall = await deleteDocument(documentID)
            if(delCall){
                //do something after delete document
            }
        } 
    }

    const closeButtonClick = () =>{
       // do something after click the close panel button the interface
       // like navigate to the list of documents
    }

    const gotToEditDocument = () =>{
       // do something after click the edit button like navigate to the 
       // edit page
    }


    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return <React.Fragment>
        {error && <div>Server Error: {errorMessage} </div>}
        <ViewDocumentComponent 
          type={type}
          getDocumentById={getDocumentById}
          documentJson={selectedDocument}
          frames={frames}
          closeButtonClick={closeButtonClick}
          documentID={documentID}
          deleteDocument={callDeleteDocument}
          editDocument = {gotToEditDocument}
        />
    </React.Fragment>
}
```

you can see this code integrated inside a dashboard here
[DocumentSearchComponent example]()
[Sandbox]


