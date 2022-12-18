

/**
 * 
 * @param {*} client  terminusDB Client
 * @param {*} dataProduct Data Product Name to connect to
 * @param {*} setFrames constant to store data product frames
 * @param {*} setConnectionError  constant to store connection error 
 * @returns 
 */
export async function getFrames (client, dataProduct, setFrames, setConnectionError) {
    if(!client) return
    await client.getSchemaFrame(null, dataProduct).then((res) => {
        setFrames(res)
    })
    .catch((err) =>  {
        setConnectionError(`Error in init client while fetching schema frames - ${err.message}`)
    })
}

/**
 * 
 * @param {*} client  terminusDB Client
 * @param {*} setDocumentClassList constant to store document classes list
 * @param {*} setConnectionError  constant to store connection error 
 */
export async function getDocumentClasses (client, setDocumentClassList, setConnectionError) { //get all the Document Classes (no abstract or subdocument)
    if(!client) return
    await client.getClassDocuments(client.db()).then((res) => {
        if(setDocumentClassList) setDocumentClassList(res)
    })
    .catch((err) =>  {
        setConnectionError("Error in init client while fetching document classes of data product", err.message)
    })
}

/**
 * 
 * @param {*} client  terminusDB Client
 * @param {*} documentID document ID to fetch instance data
 * @param {*} setData constant to store data to display instance in Edit/ View Mode
 * @param {*} setConnectionError  constant to store connection error 
 */
export async function getDocumentData(client, documentID, setData, setConnectionError) {
    if(!client) return
    let params={}
    params['id']=documentID
    params['as_list']=false
    await client.getDocument(params, client.db()).then((res) => {
        if(setData) setData(res)
    })
    .catch((err) =>  {
        setConnectionError("Error in init client while fetching document classes of data product", err.message)
    })
}

/**
 * 
 * @param {*} setMessage constants to clear messages in UI 
 */
export function clearMessages(setMessage) {
    setMessage(false)
}

/**
 * 
 * @param {*} code - function is called to copy example code to clipboard 
 */
export function copyToClipboard (code) {
    navigator.clipboard.writeText(code).then(() => {
        console.log("copied code", code)
    },(err) => {
    /* Rejected - clipboard failed */
        console.log("err", err)
    })
}
