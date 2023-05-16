## EditDocumentComponent
The newedit document component help you to compose your dashboard very fast 
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
|type|the document type|
|documentJson| the document object|
|documentID| the document id|
|frames|The database Class Frame, or object of all class frames |
|closeButtonClick|A function which acts as a callback when the panel exit `x` button is clicked|
|updateDocument| A function which acts as a callback when the `submit` button is clicked|
|SearchComponent| a react component that should be used as search component  |

## Example
```js
import React, {useEffect}  from "react";
import {EditDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const DocumentEdit = ({type, documentID, tdbClient}) => { 
    const {
        updateDocument,
        getDocument,
        selectedDocument,
        getDocumentFrames,
        frames,
        error,
        setError
    } = useTDBDocuments(tdbClient)

     const  updateDocumentHandler = async (jsonDoc) =>{
        const docUp = await updateDocument(jsonDoc)
        if(docUp){
            getDocument(documentID)
            // do somethig after update document
        }
   }
    // implement the chage method
    useEffect(() => {
        getDocumentFrames()
        getDocument(documentID)
	},[])

    const closeButtonClick = () =>{
       // do something after click the close panel button the interface
    }

    const DocumentSearchComponent = () =>{
        //make you document search component
        return </div>
    }
  
    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
   
    return <React.Fragment>
            {error && <div>Server Error: {errorMessage} </div>}
            <EditDocumentComponent
                SearchComponent={DocumentSearchComponent}
                documentID={documentID} 
                updateDocument={updateDocumentHandler}
                type={type}
                frames={frames}
                closeButtonClick={closeButtonClick}
                documentJson={selectedDocument}
            />
        </React.Fragment>
}
```

you can see this code integrated inside a dashboard here
[DocumentSearchComponent example]()
[Sandbox]


