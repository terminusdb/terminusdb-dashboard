import React, {useState, useEffect} from "react"
import {Row, Form, Col} from "react-bootstrap"
import {printts, checkIfObject, isClassType, deleteBlankField} from "./utils"
import {RenderFrameProperties} from "./RenderFrameProperties"
import {WOQLClientObj} from '../init-woql-client'
import {FORM_VIEW, JSON_VIEW, EDIT_DOCUMENT, CREATE_DOCUMENT} from "./constants"
import {DocumentationTypeFrame} from "./DocumentationTypeFrame"
import {SubDocumentTypeFrame} from "./SubDocumentTypeFrame"


export const OptionalFrames = ({documentObject, propertyID, property, object, handleChange, handleSelect, handleSetSelect, setFormFields, formFields}) => {

    const {
        documentClasses,
        woqlClient
    } = WOQLClientObj()




    const DataOrClassFrameViewer = ()  => {

        let newDocumentObject={ // in case of a normal datatype or class document 
            action: CREATE_DOCUMENT,
            type: property,
            view: FORM_VIEW,
            submit: false,
            frames: object,
            filledFrame: {},
            message: false
        }

        if(isClassType(object["@class"], documentClasses)) { // point to class doc
            return <RenderFrameProperties 
                documentObject={newDocumentObject} 
                documentClasses={documentClasses}
                propertyID={propertyID}
                optional={property}
                handleSelect={handleSelect}
                formFields={formFields}
            />
        }

        // data type xsd:string 
        return <RenderFrameProperties 
            documentObject={newDocumentObject} 
            documentClasses={documentClasses}
            propertyID={propertyID}
            optional={property}
            handleChange={(e) => handleChange(e, propertyID)}
            setFormFields={setFormFields}
            formFields={formFields}

        />

    }


    return <React.Fragment>

        {!checkIfObject(object["@class"]) && <DataOrClassFrameViewer/>
        }

        
    </React.Fragment>
}



