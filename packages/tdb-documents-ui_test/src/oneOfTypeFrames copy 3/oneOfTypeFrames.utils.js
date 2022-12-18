 

export function  getUILayout(extractedFrames, frame, item, uiFrame, mode, formData, onSelect, onTraverse, documentation) {
    let uiLayout= {} 
    console.log("extractedFrames ui", extractedFrames)
    //console.log("frame ui", frame)
    //let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    /*if(frame.hasOwnProperty("uiSchema")) {
        uiLayout=frame["uiSchema"]
    }*/
    uiLayout["classNames"]=`card bg-secondary p-4 mt-4 mb-4 `
    for(let ui in extractedFrames.uiSchema) {
        uiLayout[ui]=extractedFrames.uiSchema[ui]
    }
    //let description = getCommentFromDocumentation(item, documentation, true) 
    //uiLayout["ui:description"]=util.getSubDocumentDescription(item, description) 
    //uiLayout["ui:title"]=util.getSubDocumentLabel(item, documentation, true)
    // custom ui:schema - add to default ui schema
    //let addedCustomUI=util.addCustomUI(item, uiFrame, uiLayout) 
    return uiLayout
} 