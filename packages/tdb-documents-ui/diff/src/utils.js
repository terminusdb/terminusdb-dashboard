
import * as CONST from "./constants"
import * as nuclear from "./nuclear.constants" 
import * as CAMS from "./cams.constants" 
import * as DIFF from "./diff.constants"
import * as seshat from "./seshat.constants"

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
 * @param {*} type document type selected from UI 
 * @returns oldValue and changedValue based on type selected
 */
 export function getSelectedTypeData(dataProduct, type) {
    let obj={}
    if(dataProduct === CONST.NUCLEAR_DATA_PRODUCT) {
        obj[CONST.OLD_VALUE]=nuclear.oldData.hasOwnProperty(type) ? nuclear.oldData[type] : {}
        obj[CONST.CHANGED_VALUE]=nuclear.changedData.hasOwnProperty(type) ? nuclear.changedData[type] : {}
    }
    else if(dataProduct === CONST.CAMS_DATA_PEODUCT) {
        obj[CONST.OLD_VALUE]=CAMS.oldData.hasOwnProperty(type) ? CAMS.oldData[type] : {}
        obj[CONST.CHANGED_VALUE]=CAMS.changedData.hasOwnProperty(type) ? CAMS.changedData[type] : {}
    }
    else if(dataProduct === CONST.MY_TEST_DATA_PRODUCT) {
        obj[CONST.OLD_VALUE]=seshat.oldData.hasOwnProperty(type) ? seshat.oldData[type] : {}
        obj[CONST.CHANGED_VALUE]=seshat.changedData.hasOwnProperty(type) ? seshat.changedData[type] : {}
    } 
    else if(dataProduct === CONST.DIFF_DATA_PRODUCT) {
        obj[CONST.OLD_VALUE]=DIFF.oldData.hasOwnProperty(type) ? DIFF.oldData[type] : {}
        obj[CONST.CHANGED_VALUE]=DIFF.changedData.hasOwnProperty(type) ? DIFF.changedData[type] : {}
    }
    return obj
}



