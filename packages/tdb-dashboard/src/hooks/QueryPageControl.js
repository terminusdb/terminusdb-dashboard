
import {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {useHook} from "./hook"

export const QueryPaneControl = (queryObj) => {
    const {woqlClient} = WOQLClientObj()
    const [saveQuery, setSaveQuery] = useState()
    const [saveQueryName, setSaveQueryName] = useState()
    const [needUpdate,setNeedUpdate] = useState(0)

    let dp = useHook(woqlClient, saveQuery) 

    const setExpanded = ()=>{
        const newStatus = !isExpanded
        setNeedUpdate(Date.now())
        queryObj.editorPanelIsOpen = newStatus
    }

    const setQpExpanded = ()=>{
        const newStatus = !queryObj.mainPanelIsOpen
        queryObj.mainPanelIsOpen = newStatus
        setNeedUpdate(Date.now())       
    }

    const showQueryBuilder = () => {
        const newStatus = !queryObj.queryBuilderObj
        queryObj.queryBuilderObj = newStatus
        setNeedUpdate(Date.now())
        
    }

    return {
        needUpdate,
        setExpanded,
        setQpExpanded,
        setSaveQuery,
        setSaveQueryName,
        saveQueryName,
        showQueryBuilder
    }
}
