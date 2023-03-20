/** Generates Frame Viewer code with current params
 * @param {*} uiFrames - uiFrames to alter look and feel of form
 * @param {*} data - instance data to view form in Edit/View Mode
 * @param {*} mode - mode in which form is to be displayed - Create, Edit or View
 * @param {*} type - type of Document being displayed in form
 */
export const generateFrameViewerCode = function(uiFrames, data, mode, type){
    return `

const TerminusClient = require("@terminusdb/terminusdb-client")
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'

/**
 * @param {*} client  terminusDB Client
 * @param {*} dataProduct Data Product Name to connect to
 * @param {*} setFrames constant to store data product frames
 * @param {*} setConnectionError  constant to store connection error 
 * @returns 
 */
export async function getFrames (client, dataProduct, setFrames) {
    if(!client) return
    client.getSchemaFrame(null, dataProduct).then((res) => {
        setFrames(res)
    })
    .catch((err) =>  {
        console.log("Error in init woql while fetching schema frames, err")
    })
}

/* Connect to TerminusDB using TerminusDB Client */
const initClient = async (setFrames, setConnectionError)=>{
    const client = new TerminusDBClient.WOQLClient(process.env.SERVER/process.env.TEAM, {
        organization: process.env.TEAM
    })
    client.setApiKey(process.env.TOKEN)
    client.db(process.env.DATA_PRODUCT)
    getFrames (client, config.dataProduct, setFrames)
}

export const Form = ({frames,
    type,
    uiFrames,
    data,
    mode}) => {
    const [frames, setFrames] = useState(false) // constants to store frames

    /* Initialize client */
    useEffect(() => {
        try{
            initClient(setFrames)
        }
        catch(e) {
            console.log(e)
        }
    }, [])

    /* Callback submit function which extracts all user input fields */
    function handleSubmit(data) {
        console.log("Data submitted from form", data)
    }

    /* uiFrames to change look and feel of form */
    let ui = '${JSON.stringify(uiFrames, null, 4)}'
    /* filled data */
    let fData= '${JSON.stringify(data, null, 4)}'

    if(!frames) return <>LOADING ... <>

    return <FrameViewer
        frame={frames}                              // frames
        uiFrame={ui}                                // ui frames           
        type={"${type}"}                            // type of document to display in form 
        formData={fData}                            // instance data 
        mode={"${mode}"}                            // mode in which to display the form
        hideSubmit={mode==="View" ? true : false}   // hide Submit button when in VIEW mode
        onSubmit={handleSubmit}                     // Callback submit function
    />
}
`
}

/** Generates Frame Viewer code with current params to support Multi Language
 * @param {*} uiFrames - uiFrames to alter look and feel of form
 * @param {*} data - instance data to view form in Edit/View Mode
 * @param {*} mode - mode in which form is to be displayed - Create, Edit or View
 * @param {*} type - type of Document being displayed in form
 */
 export const generateFrameViewerCodeForMultiLanguage = function(uiFrames, data, mode, type, language){
    return `

const TerminusClient = require("@terminusdb/terminusdb-client")
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'

/**
 * @param {*} client  terminusDB Client
 * @param {*} dataProduct Data Product Name to connect to
 * @param {*} setFrames constant to store data product frames
 * @param {*} setConnectionError  constant to store connection error 
 * @returns 
 */
export async function getFrames (client, dataProduct, setFrames) {
    if(!client) return
    client.getSchemaFrame(null, dataProduct).then((res) => {
        setFrames(res)
    })
    .catch((err) =>  {
        console.log("Error in init woql while fetching schema frames, err")
    })
}

/* Connect to TerminusDB using TerminusDB Client */
const initClient = async (setFrames, setConnectionError)=>{
    const client = new TerminusDBClient.WOQLClient(process.env.SERVER/process.env.TEAM, {
        organization: process.env.TEAM
    })
    client.setApiKey(process.env.TOKEN)
    client.db(process.env.DATA_PRODUCT)
    getFrames (client, config.dataProduct, setFrames)
}

export const Form = ({frames,
    type,
    uiFrames,
    data,
    mode,
    language}) => {
    const [frames, setFrames] = useState(false) // constants to store frames

    /* Initialize client */
    useEffect(() => {
        try{
            initClient(setFrames)
        }
        catch(e) {
            console.log(e)
        }
    }, [])

    /* Callback submit function which extracts all user input fields */
    function handleSubmit(data) {
        console.log("Data submitted from form", data)
    }

    /* uiFrames to change look and feel of form */
    let ui = '${JSON.stringify(uiFrames, null, 4)}'
    /* filled data */
    let fData= '${JSON.stringify(data, null, 4)}'

    if(!frames) return <>LOADING ... <>

    return <FrameViewer
        frame={frames}                              // frames
        uiFrame={ui}                                // ui frames           
        type={"${type}"}                            // type of document to display in form 
        formData={fData}                            // instance data 
        mode={"${mode}"}                            // mode in which to display the form
        hideSubmit={mode==="View" ? true : false}   // hide Submit button when in VIEW mode
        onSubmit={handleSubmit}                     // Callback submit function
        language={"${language}"}                    // language code 
    />
}
`
}

/**
 * @param {*} uiFrames - uiFrames to alter look and feel of form
 * @param {*} data - instance data to view maps
 */
export const generateMapViewerCode = (uiFrames, data) => {
    return `
const TerminusClient = require("@terminusdb/terminusdb-client")
import {MapViewer} from '@terminusdb/terminusdb-documents-ui'

/**
 * @param {*} client  terminusDB Client
 * @param {*} dataProduct Data Product Name to connect to
 * @param {*} setFrames constant to store data product frames
 * @param {*} setConnectionError  constant to store connection error 
 * @returns 
 */
export async function getFrames (client, dataProduct, setFrames) {
    if(!client) return
    client.getSchemaFrame(null, dataProduct).then((res) => {
        setFrames(res)
    })
    .catch((err) =>  {
        console.log("Error in init woql while fetching schema frames, err")
    })
}

/* Connect to TerminusDB using TerminusDB Client */
const initClient = async (setFrames, setConnectionError)=>{
    const client = new TerminusDBClient.WOQLClient(process.env.SERVER/process.env.TEAM, {
        organization: process.env.TEAM
    })
    client.setApiKey(process.env.TOKEN)
    client.db(process.env.DATA_PRODUCT)
    getFrames (client, config.dataProduct, setFrames)
}

export const Form = ({frames,
    type,
    uiFrames,
    data,
    mode}) => {
    const [frames, setFrames] = useState(false) // constants to store frames

    /* Initialize client */
    useEffect(() => {
        try{
            initClient(setFrames)
        }
        catch(e) {
            console.log(e)
        }
    }, [])

    /* Callback submit function which extracts all user input fields */
    function handleSubmit(data) {
        console.log("Data submitted from form", data)
    }

    /* uiFrames to change look and feel of form */
    let ui = '${JSON.stringify(uiFrames, null, 4)}'
    /* filled data */
    let fData= '${JSON.stringify(data, null, 4)}'

    if(!fData.hasOwnProperty("coordinates")) return <div/>
    if(!Array.isArray(fData["coordinates"]) && fData["coordinates"].length === 0) return <div/>

    let coordinates = [{lat: fData["coordinates"][0], lng: fData["coordinates"][1]}]

    return <MapViewer 
        documents={coordinates} 
        scrollWheelZoom={true}
    /> 
}`
}

export const generateDiffViewerCode = () => {
    return `
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'


export const View = () => {

    /* old JSON Value */
    let oldValue = {
        "@id": "Person/Jane",
        "@type": "Person",
        age: 18,
        name: "Jane",
    }
   
    /* new JSON Value */
    let newValue = {
        "@id": "Person/Jane",
        "@type": "Person",
        age: 18,
        name: "Janine",
    }
    
    return <DiffViewer  
        oldValue={oldValue}             // old JSON document
        newValue={newValue}             // new JSON document
        useDarkTheme={true}             // true/ false to enable dark mode
        leftTitle={'Old Value'}         // title to for old Value
        rightTitle={'New Value'}/>      // title to for new Value
}`
}
