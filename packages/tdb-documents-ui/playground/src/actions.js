
import * as menu from "./menu.constants"
import * as data from "./data.constants"
import * as info from "./info.constants"
import * as link from "./links.constants"
import * as ui from "./uiFrames.constants"
import {
    generateFrameViewerCode, 
    generateMapViewerCode, 
    generateDiffViewerCode,
    generateFrameViewerCodeForMultiLanguage
} from "./generateCode"
import {CREATE, VIEW} from "./constants"

/**
 * 
 * @param {*} menuItem - selected menu item from UI
 * @param {*} mode - Mode in which to view react form - Create, Edit or View
 * @param {*} setInfoMessage - function to set current info message based on menu item which user has clicked in UI 
 */
export function getInfoMessage (menuItem, setInfoMessage) {
    if(menuItem === menu.MANDATORY) {
        setInfoMessage(info.MANDATORY_INFO_MESSAGE)
    }
    else if(menuItem === menu.OPTIONAL) {
        setInfoMessage(info.OPTIONAL_INFO_MESSAGE)
    }  
    else if(menuItem === menu.SET) {
        setInfoMessage(info.SET_INFO_MESSAGE)
    }
    else if(menuItem === menu.LIST) {
        setInfoMessage(info.LIST_INFO_MESSAGE)
    }
    else if(menuItem === menu.CHOICE_CLASSES) { // Advanced
        setInfoMessage(info.CHOICE_CLASSES_INFO_MESSAGE)
    }
    else if(menuItem === menu.CHOICE_SUBDOCUMENTS) {
        setInfoMessage(info.CHOICE_SUBDOCUMENTS_INFO_MESSAGE)
    }
    else if (menuItem === menu.BOOTSTRAP_CLASSES) { // ui frames - bootstrap class info message 
        setInfoMessage(info.UI_FRAME_BOOTSTRAP_CLASSNAMES_INFO_MESSAGE)
    } 
    else if (menuItem === menu.HIDE_UI) { // ui frames - hidden info message 
        setInfoMessage(info.UI_FRAME_HIDDEN_INfO_MESSAGE)
    } 
    else if (menuItem === menu.WIDGETS_UI) { // ui frames - hidden info message 
        setInfoMessage(info.UI_FRAME_WIDGET_INFO_MESSAGE)
    }
    else if (menuItem === menu.GEO_POINT) { // geo JSONS
        setInfoMessage(info.GEO_POINT_INFO_MESSAGE)
    }
    else if (menuItem === menu.GEO_LINE_STRING) {
        setInfoMessage(info.GEO_LINE_STRING_INFO_MESSAGE)
    }
    else if (menuItem === menu.GEO_POLYGON) { 
        setInfoMessage(info.GEO_POLYGON_INFO_MESSAGE)
    }
    else if (menuItem === menu.GEO_MULTI_POLYGON) {
        setInfoMessage(info.GEO_MULTIPOLYGON_INFO_MESSAGE)
    }
    else if(menuItem === menu.DIFF_VIEWER) {
        setInfoMessage(info.DIFF_VIEWER_INFO_MESSAGE)
    }
    else if(menuItem === menu.SYS_JSON) {
        setInfoMessage(info.SYS_JSON_INFO_MESSAGE)
    }
    else if(menuItem === menu.MULTI_LANGUAGE) {
        setInfoMessage(info.MULTI_LANGUAGE)
    }
}

/**
 * 
 * @param {*} menuItem - selected menu item from UI
 * @param {*} setType - function to set current document type to view in react form
 */
export function setDocumentType (menuItem, setType) {
   
    if(menuItem === menu.MANDATORY) {
        setType(menu.MANDATORY_DOCUMENT) 
    }
    else if(menuItem ===menu.DIFF_VIEWER) {
        setType(menu.DIFF_DOCUMENT)
    }
    else if (menuItem === menu.OPTIONAL) {
        setType(menu.OPTIONAL_DOCUMENT)
    }
    else if(menuItem === menu.SET) {
        setType(menu.SET_DOCUMENT)
    }
    else if(menuItem === menu.LIST) {
        setType(menu.LIST_DOCUMENT)
    }
    else if(menuItem === menu.CHOICE_SUBDOCUMENTS) { // choice sub documents
        setType(menu.CHOICE_CLASSES_SUBDOCUMENT_DOCUMENT) 
    } 
    else if(menuItem === menu.CHOICE_CLASSES) { // choice documents
        setType(menu.CHOICE_CLASSES_DOCUMENT) 
    }  
    else if(menuItem === menu.ONE_OF) { // one of documents
        setType(menu.ONE_OF_DOCUMENT) 
    } 
    else if(menuItem === menu.BOOTSTRAP_CLASSES) { // ui frames - bootstrap class option 
        setType(menu.MANDATORY_DOCUMENT)
    }
    else if(menuItem === menu.HIDE_UI) { // ui frames - hidden fields 
        setType(menu.HIDDEN_UI_DOCUMENT)
    }
    else if(menuItem === menu.WIDGETS_UI) { // ui frames - widgets
        setType(menu.WIDGETS_UI_DOCUMENT)
    }
    else if(menuItem === menu.GEO_POINT) { // geo types
        setType(menu.GEO_POINT_DOCUMENT) 
    }
    else if(menuItem === menu.GEO_LINE_STRING) {
        setType(menu.GEO_LINE_STRING_DOCUMENT)
    }
    else if(menuItem === menu.GEO_POLYGON) {
        setType(menu.GEO_POLYGON_DOCUMENT)
    }
    else if(menuItem === menu.GEO_MULTI_POLYGON) {
        setType(menu.GEO_MULTIPOLYGON_DOCUMENT)
    }
    else if(menuItem === menu.SYS_JSON) { //sys
        setType(menu.SYS_JSON_DOCUMENT)
    }
    else if(menu.MULTI_LANGUAGE) {
        setType(menu.MULTI_LANGUAGE_DOCUMENT)
    }
    else {
        setType(false)
    }
}

/**
 * 
 * @param {*} menuItem - selected menu item from UI
 * @param {*} mode - Mode in which to view react form - Create, Edit or View
 * @param {*} setData - function to set data/ instance of a document in edit/ view mode
 * @returns 
 */
export function setModeData (menuItem, mode, setData) {
    if(mode === CREATE) return
    if(menuItem === menu.MANDATORY) {
        setData(data.MANDATORY_DOCUMENT)
    }
    else if (menuItem === menu.OPTIONAL) {
        setData(data.OPTIONAL_DOCUMENT)
    }
    else if(menuItem === menu.SET) {
        setData(data.SET_DOCUMENT)
    }
    else if(menuItem === menu.LIST) {
        setData(data.LIST_DOCUMENT)
    }
    else if(menuItem === menu.CHOICE_SUBDOCUMENTS) { // choice sub documents
        setData(data.CHOICE_SUB_DOCUMENT) 
    }
    else if(menuItem === menu.CHOICE_CLASSES) { // choice classes
        setData(data.CHOICE_CLASSES_DOCUMENT)
    }
    else if(menuItem === menu.ONE_OF) { // one ofs
        setData(data.ONE_OF_DOCUMENT) 
    }
    else if(menuItem === menu.BOOTSTRAP_CLASSES) { // ui frames - bootstrap class option 
        setData(data.MANDATORY_DOCUMENT)
    } 
    else if(menuItem === menu.WIDGETS_UI) { // ui frames - widgets
        setData(data.UI_WIDGET_DOCUMENT) 
    }
    else if(menuItem === menu.GEO_POINT) { // Geo json - point type
        setData(data.GEO_POINT_DOCUMENT)
    }
    else if(menuItem === menu.GEO_LINE_STRING) { // Geo json - point type
        setData(data.GEO_LINE_STRING_DOCUMENT)
    }
    else if(menuItem === menu.GEO_POLYGON) { // Geo json - point type
        setData(data.GEO_POLYGON_DOCUMENT)
    }
    else if(menuItem === menu.GEO_MULTI_POLYGON) {
        setData(data.GEO_MULTIPOLYGON_DOCUMENT)
    }
    else if(menuItem == menu.SYS_JSON) { //sys
        setData(data.SYS_JSON_DOCUMENT)
    }
    else if(menuItem === menu.MULTI_LANGUAGE) { // multi language
        setData(data.MULTI_LANGUAGE_DOCUMENT)
    }
}


/**
 * 
 * @param {*} menuItem - selected menu item from UI
 * @param {*} mode - Mode in which to view react form - Create, Edit or View
 * @param {*} setExampleCode - function to set example code generate react form as Output 
 * @returns 
 */
export function setExampleCodeData(uiFrames, data, menuItem, mode, setExampleCode, language) {
    if((menuItem === menu.GEO_POINT || menuItem === menu.GEO_LINE_STRING || menuItem === menu.GEO_POLYGON || menuItem === menu.GEO_MULTI_POLYGON) && mode === VIEW) {
        let code = generateMapViewerCode(uiFrames, data)
        setExampleCode(code)
    }
    else if(menuItem === menu.MULTI_LANGUAGE) {
        let code = generateFrameViewerCodeForMultiLanguage(uiFrames, data, mode, menu.MULTI_LANGUAGE_DOCUMENT, language)
        setExampleCode(code)
    }
    else if(menuItem === menu.DIFF_VIEWER) {
        let code=generateDiffViewerCode()
        setExampleCode(code)
    }
    else { 
        let code = generateFrameViewerCode(uiFrames, data, mode, menu.MANDATORY_DOCUMENT)
        setExampleCode(code)
    }
}

/**
 * 
 * @param {*} menuItem - selected menu item from UI
 * @param {*} mode - Mode in which to view react form - Create, Edit or View
 * @param {*} setLinkData - function to set documentation link to TerminusDB website
 * @returns 
 */
export function setLinkData (menuItem, mode, setLinks) {
    if(menuItem === menu.MANDATORY) {
        setLinks(link.MANDATORY_LINK) 
    }
    else if (menuItem === menu.OPTIONAL) {
        setLinks(link.OPTIONAL_LINK) 
    }
    else if (menuItem === menu.SET) {
        setLinks(link.SET_LINK) 
    }
    else if (menuItem === menu.LIST) {
        setLinks(link.LIST_LINK) 
    }
}

/**
 * 
 * @param {*} menuItem - selected menu item from UI
 * @param {*} setUIFrames - function to set UI frames to change look and feel of React form
 */
export function setExampleUIFrames(menuItem, mode, setUIFrames) {
    if(menuItem === menu.BOOTSTRAP_CLASSES) { // ui frames - bootstrap class option 
        setUIFrames(ui.BOOTSTRAP_CLASSES_UI_FRAME)
    }
    else if(menuItem === menu.HIDE_UI){ // uiframes - hide fields option
        setUIFrames(ui.HIDDEN_UI_FRAME)
    }
    else if (menuItem === menu.WIDGETS_UI) { // uiframes - widget options
        setUIFrames(ui.WIDGETS_UI_FRAME)
    }
    else if(menuItem === menu.GEO_LINE_STRING && mode === VIEW) {
        setUIFrames(ui.LINE_STRING_UI_FRAME)
    }
}
