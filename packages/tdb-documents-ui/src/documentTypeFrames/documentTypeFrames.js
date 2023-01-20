

export const makeDocumentTypeFrames = (args) => {
 
    let {frame, item}=args

    let linked_to = frame[item]

    return {linked_to}
} 