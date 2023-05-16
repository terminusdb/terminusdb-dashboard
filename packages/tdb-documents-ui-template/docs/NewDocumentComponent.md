## NewDocumentComponent
The new document component help you to compose your dashboard very fast 
This element allow you to create a new documents using the FrameViewer components from `....` and adding some useful tools.


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
|documentJson| the document object, it start empty ({}) for new
|createDocument|A function which acts as a callback when the `submit` button is clicked
|frames|The database Class Frame, or object of all class frames 
|closeButtonClick|A function which acts as a callback when the panel exit `x` button is clicked
|SearchComponent| a react component that should be used as search component  |

## Example
```js
//This is use the NewDocumentComponent template to create a new document type
import React, {useEffect}  from "react";
//we import the NewDocumentComponent and the useTDBDocuments from the terminusdb-documents-ui-template
//you need to pass your terminusdb-client instance and the document type 
import {NewDocumentComponent,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"

export const DocumentNew = ({type,tdbClient}) => {  
    const {
        frames,
        error,
        getDocumentFrames,
        createDocument,
        setError
    } = useTDBDocuments(tdbClient)
  
    useEffect(() => {
        getDocumentFrames()
	},[])

    const callCreateDocument = async (jsonDocument) =>{
        const created = await createDocument(jsonDocument)
        if(created){
            //do something after create a new element
        }
    }

    const closeButtonClick = () =>{
       // do something after click the close panel button the interface
    }

    const DocumentSearchComponent = () =>{
        //make you document search component
        return </div>
    }

    if(!frames) return  <div>{`Fetching frames for document type ${type} ...`}</div>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return  <React.Fragment>
            {error && <div>Server Error: {errorMessage} </div>}
                <NewDocumentComponent
                    SearchComponent={DocumentSearchComponent}
                    frames={frames}
                    createDocument={callCreateDocument}
                    type={type}
                    closeButtonClick={closeButtonClick}
                />     
            </React.Fragment>
}
```

you can see this code integrated inside a dashboard here
[DocumentSearchComponent example]()
[Sandbox]


