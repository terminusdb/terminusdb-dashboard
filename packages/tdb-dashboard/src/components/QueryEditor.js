import React from "react"
import {WOQLEditorControlled} from '@terminusdb-live/tdb-react-components'
import {LANGUAGE_LIST} from './constants.js'
import {QueryPaneObj} from '../hooks/QueryPanelContext'

export const QueryEditor = ({queryObj , setMainError}) => { 
    //every time it change we set the query
    //string and type

    const {WOQLQueryChange} = QueryPaneObj() 

    //save the change in the context obj
    const handleWOQLQueryChange =(query, text, language)=>{ 
        WOQLQueryChange(queryObj.id, query, text, language) 
    } 
    //to be review
    const handleError = (err) => {
        const error = typeof err === "string" ? err : err.message 
        setMainError(err)
    }


    //we don't use query prop in the query editor 
    return(
        <div className="editor-pallet">
            <WOQLEditorControlled 
                languages={LANGUAGE_LIST}
                startLanguage={queryObj.editorObj.language || "js"}  
                setWOQLQuery={handleWOQLQueryChange} 
                initcontent={queryObj.editorObj.text}
                query={queryObj.editorObj.query}
                editable={true}
                setMainError={handleError}
                showLanguageSwitcher={false} 
                theme="dark"/>
        </div> 
    )
}