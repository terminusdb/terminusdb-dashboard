
import * as CONST from "../constants"
import * as util from "../utils"
import * as widget from "./widget"

const matchType ={
    [CONST.XSD_STRING] : CONST.STRING_TYPE,
    [CONST.XSD_ANY_URI] : CONST.STRING_TYPE,
    [CONST.XSD_LANGUAGE] : CONST.STRING_TYPE,
    [CONST.RDF_LANGSTRING] :CONST.STRING_TYPE,
    [CONST.XDD_URL] : CONST.STRING_TYPE,  
    [CONST.XDD_HTML]: CONST.STRING_TYPE,

    [CONST.SYS_JSON_TYPE] : CONST.JSON_TYPE,
    [CONST.XSD_DOUBLE] : CONST.NUMBER_TYPE,
    [CONST.XSD_NONNEGATIVEINTEGER] : CONST.NUMBER_TYPE,
    [CONST.XSD_FLOAT] : CONST.NUMBER_TYPE,
    [CONST.XSD_POSITIVE_INTEGER] : CONST.NUMBER_TYPE,
    [CONST.XSD_DECIMAL] : CONST.NUMBER_TYPE,
    [CONST.XSD_INTEGER] : CONST.NUMBER_TYPE,
    [CONST.XSD_BOOLEAN] : CONST.BOOLEAN_TYPE,

    [CONST.XSD_DATE_TIME] : CONST.DATE_TYPE,
    [CONST.XSD_TIME]: CONST.STRING_TYPE,
    [CONST.XSD_G_YEAR] : CONST.DATE_TYPE,
    [CONST.XSD_DATE] : CONST.STRING_TYPE
} 

//get data type xsd: or xdd:
export function getDataType(type) { 
    return matchType[type]
}

/** get custom codemirror config from @metadata */
export function getCodeMirrorConfig(props) {
    if(props.schema && props.schema.hasOwnProperty(CONST.METADATA)) {
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_MIN_HEIGHT)) {
            if(props.formData) {
                CONST.BASIC_CODE_MIRROR_CONFIG.minHeight = props.formData ? "auto" : props.schema[CONST.METADATA][CONST.CODE_MIRROR_MIN_HEIGHT]
            }
            else CONST.BASIC_CODE_MIRROR_CONFIG.minHeight = props.schema[CONST.METADATA][CONST.CODE_MIRROR_MIN_HEIGHT]
        }
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_LINE_NUMBERS)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.displayLines = props.schema[CONST.METADATA][CONST.CODE_MIRROR_LINE_NUMBERS]
        }
        if(props.schema[CONST.METADATA].hasOwnProperty(CONST.CODE_MIRROR_THEME)) {
            CONST.BASIC_CODE_MIRROR_CONFIG.theme = props.schema[CONST.METADATA][CONST.CODE_MIRROR_THEME]
        }
    }
    return CONST.BASIC_CODE_MIRROR_CONFIG
}

/** formats supported */
const format = {
    [CONST.XSD_ANY_URI]: "uri",
    [CONST.XSD_DATE_TIME]: "date-time",
    [CONST.XSD_DATE]: "date"
}

/**
 * 
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @returns metadata render as view
 */
 function addMetaData(frame, item, uiFrame, mode) { 
    let metaType=util.checkForMetaData(frame, item) 
    if(!metaType) return null
    if(metaType) {
        if(metaType === CONST.MARKDOWN && mode !== CONST.VIEW) {
            return widget.getMarkdownUI 
        }
        else if(metaType === CONST.MARKDOWN && mode === CONST.VIEW) {
            function viewMarkdownUI(props) {
                return widget.getViewMarkdownUI (props.formData, props.name, uiFrame)
            }
            if(uiFrame && uiFrame.hasOwnProperty(item) && uiFrame[item].hasOwnProperty("ui:diff")) {
                // this is mostly comeing from diff viewer logic to display diffs between markdown
                return uiFrame[item]["ui:diff"]
            }
            return viewMarkdownUI
        }
        /** Commenting out HTML support as of now */
        /*else if(metaType === CONST.HTML) {
            return getEditHTMLUI
        }*/
    }
}

/**
 * 
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @returns format in which data type has to be displayed
 */
export function getFormat(frame, item) {
    if(!frame.hasOwnProperty(item)) return ""
    let type=frame[item]
    return format[type]
}

/**
 * 
 * @param {*} frame - frame of data type 
 * @param {*} item - property of interest 
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} title - title of property to be displayed
 * @param {*} data - formData - filled data to be displayed in form 
 * @param {*} documentation - formData - filled data to be displayed in form 
 * @returns UI based on data type
 */
 export function getUIBasedOnType(frame, item, uiFrame, mode, data, documentation) {
    if(frame[item] === CONST.XSD_STRING && !util.checkForMetaData(frame, item) ) {
        /** return textarea if type is string 
         * Metadata render_as will have higher priority than xsd:string textarea widget
        */ 
        return widget.getTextareaUIWidget(CONST.XSD_STRING, mode, data) 
    }
    /** Commenting out HTML support as of now */
    /*else if (frame[item] === CONST.XDD_HTML) {
        return { ["ui:field"]: widget.getEditHTMLUI }
    }*/
    else if(frame[item] === CONST.XSD_ANY_URI && mode === CONST.VIEW) {
        /** display a uri widget for anyURI type in View Mode */
        return widget.getURIUIWidget(item, uiFrame) 
    }
    // In all other cases, return back standard UI Layout
    let uiLayout= {
        "ui:placeholder": frame[item], 
        //"ui:title": util.getLabelFromDocumentation(item, documentation),
        "classNames": "tdb__input mb-3 mt-3"
    } 
    // check if meta data available then add ui field 
    let metaData = addMetaData(frame, item, uiFrame, mode)
    if(metaData) uiLayout["ui:field"]=metaData

    if(mode === CONST.VIEW) {
        // add tdb__view classname to identify in view mode
        uiLayout["classNames"] = `${uiLayout["classNames"]} tdb__view`
    }

    return uiLayout
} 