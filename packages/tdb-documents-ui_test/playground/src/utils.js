

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
        setConnectionError(`Error in init woql while fetching schema frames - ${err.message}`)
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
