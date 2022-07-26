import {TABLE_VIEW} from "../components/constants"

export class PanelQueryObj {
    
    constructor(id) {
        this.id = id
        this.isOpen = true
        this.resultObj = {
            error : null,
            result: null, limit: 10, currentView: TABLE_VIEW,
            start: 0,
            orderBy: null,
            totalRows: null,
            graph: null, isOpen: true
        }
        this.editorObj = { query: null, text: '', language: "js", isOpen: true } 
        this.queryBuilderObj = {isOpen: false}
    }

    resetResultObj(){
        this.resultObj = {
            result: null, limit: 10, currentView: TABLE_VIEW,
            start: 0,
            orderBy: null,
            totalRows: null,
            graph: null, isOpen: true
        }
    }

    updateEditorProps(propID, propValue) {
        this.editorObj[propID] = propValue
    }
    updateResultProps(propID, propValue) {
        this.resultObj[propID] = propValue
    }

    set mainPanelIsOpen (isOpen) {
        this.isOpen = isOpen
    }

    get mainPanelIsOpen(){
        return this.isOpen === false ? false : true
    }
    /**
     * @param {boolean} isOpen
     */
    set editorPanelIsOpen(isOpen) {
        this.editorObj.isOpen = isOpen
    }

    get editorPanelIsOpen() {
       return this.editorObj.isOpen === false ? false : true 
    }

    set resultPanelIsOpen (isOpen) {
        this.resultObj.isOpen = isOpen
    }

    get resultPanelIsOpen () {
        return this.resultObj.isOpen === false ? false : true 
    }
}
