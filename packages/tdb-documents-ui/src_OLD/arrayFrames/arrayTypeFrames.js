
import {
    getLayout, 
    getUILayout
} from "./arrayType.utils"

export const makeSetTypeFrames = (frame, item, uiFrame, mode, formData, onTraverse, onSelect, fullFrame, documentation) => {
    //console.log("frame", frame)

    let layout=getLayout(frame, item, mode, formData, documentation)
    
    let uiLayout=getUILayout(frame, item, uiFrame, mode, formData, documentation)


    return {layout, uiLayout}
} 