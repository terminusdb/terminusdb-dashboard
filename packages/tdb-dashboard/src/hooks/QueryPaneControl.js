import {useState} from "react"

export const QueryPaneControl = ({queryObj,setSaveQuery}) => {
    const [saveQueryName, setSaveQueryName] = useState()
    const [needUpdate,setNeedUpdate] = useState(0)
    
    //we can move the queryEditorRunnerHook here 
    const setExpanded = (isExpanded)=>{
        queryObj.editorPanelIsOpen = isExpanded
        setNeedUpdate(Date.now())
    }

    const setQpExpanded = ()=>{
        const newStatus = !queryObj.mainPanelIsOpen
        queryObj.mainPanelIsOpen = newStatus
        setNeedUpdate(Date.now())       
    }

    

    return {
        needUpdate,
        setExpanded,
        setQpExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName
    }
}