import {render, screen} from '@testing-library/react';
import {FrameViewer} from "../FrameViewer"

// simple frames of a Person document with its name property 
let frames = {
    "@context": {
        "@base": "iri://CAMS/",
        "@schema": "iri://CAMS#",
        "@type": "Context",
    },
    "Person" : {
        "@type": "Class",
        "name": "xsd:string"
    }
}
// type of document to tell FrameViewer which document to load from Frames
let type="Person"
// instance of document class Person
let formData={
    "@id": "Person/testPersonID",
    "@type": "Person", 
    "name": "Sam"
}

describe(("Check's if FrameViewer is loaded correctly") , () => {
    /** tests in create mode */
    test ("FrameViewer in CREATE Mode", () => {
        render(
            <FrameViewer type={type}
                frame={frames}
                mode={"Create"}
                formData={{}}/>
        )
    })

    /** tests in edit mode */
    test ("FrameViewer in EDIT Mode", () => {
        render(
            <FrameViewer type={type}
                frame={frames}
                mode={"Edit"}
                formData={formData}/>
        )
    })

    /** tests in View mode */
    test ("FrameViewer in VIEW Mode", () => {
        render(
            <FrameViewer type={type}
                frame={frames}
                mode={"View"}
                formData={formData}/>
        )
    })

})

