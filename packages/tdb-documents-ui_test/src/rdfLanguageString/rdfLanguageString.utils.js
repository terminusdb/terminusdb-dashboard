
import React from "react"

export function getUILayout (fullFrame, frame, item, uiFrame, mode, formData, documentation) {
    
    let uiLayout = {
        "ui:placeholder": frame[item],
        "ui:title": item,
        "@lang": {
            classNames: "tdb__input mb-3 mt-3",
            "ui:placeholder": "xsd:string"
        },
        "@value": {
            classNames: "tdb__input mb-3 mt-3",
            "ui:placeholder": "xsd:string"
        }
    }   
    
    uiLayout["classNames"]=`card bg-secondary border-secondary p-4 mt-4 mb-4 tdb__rdf`

    return uiLayout
}

