/** Generates Frame Viewer code with current params
 * @param {*} uiFrames - uiFrames to alter look and feel of form
 * @param {*} data - instance data to view form in Edit/View Mode
 * @param {*} mode - mode in which form is to be displayed - Create, Edit or View
 * @param {*} type - type of Document being displayed in form
 */
export const generateFrameViewerCode = function(data, mode, type){
    return `

/***
 * frames - JSON frames of all document types (mandatory)
 * type - document type to be displayed (mandatory)
 * data - data to be displayed in form (mandatory for EDIT/ VIEW mode - if nothing to display pass {})
 * mode - the mode in which form is to be displayed - Create/ Edit or View
 * onTraverse - a js function which gets back the ID of a document on click
 */
export const Form = ({ frames, type, data, mode }) => {

    /* Callback submit function which extracts all user input fields */
    function handleSubmit(data) {
        console.log("Data submitted from form", data)
    }

    /* filled data */
    let fData= '${JSON.stringify(data, null, 4)}'

    if(!frames) return <>LOADING ... <>

    return <FrameViewer
        frame={frames}                              // frames
        type={"${type}"}                            // type of document to display in form 
        formData={fData}                            // instance data 
        mode={"${mode}"}                            // mode in which to display the form
        onSubmit={handleSubmit}                     // Callback submit function
    />
}
`
}
