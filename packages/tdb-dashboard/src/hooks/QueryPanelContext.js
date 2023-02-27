import React, {useState,useContext,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import {PanelQueryObj} from "./PanelQueryObj"
export const QueryPanelContext = React.createContext()
export const QueryPaneObj = () => useContext(QueryPanelContext)

//I need to register all the change so I can rebuild the view
export const QueryPaneProvider = ({children,woqlClient,newQueryPanelQuery}) => {
    const dataProduct = woqlClient.db()

    const [queryPaneList, setQueryPaneList] = useState({});
    const [updateList, setUpdateList] = useState(0);

    useEffect(() => {
        const startQueryPane= {}			    
        const obj = new PanelQueryObj(uuidv4())
        startQueryPane[obj.id] = obj
        setQueryPaneList(startQueryPane)
	},[dataProduct])

    // add a new panel query from the sidebar
    useEffect(() => {
        if(newQueryPanelQuery){
            addQueryPane(newQueryPanelQuery)
        }
	},[newQueryPanelQuery])

    // the only action that have to trigger an update is add panel 
    const addQueryPane = (query=null) =>{
        const obj = new PanelQueryObj(uuidv4())
        obj.updateEditorProps('query', query)
        if(query){
            let js = query.prettyPrint()
            obj.updateEditorProps('text', js)
        }
        queryPaneList[obj.id] = obj 
        setUpdateList(Date.now())
    }

    const getPanelObject = (queryPaneId) => {
        return queryPaneList[queryPaneId]
    }
    // we need to register the change inside the object but we not need to throw setState update
    const WOQLQueryChange =(queryPaneId, query, text, language)=>{
        const queryObj= queryPaneList[queryPaneId]
        if(queryObj){
            queryObj.updateEditorProps("query", query)
            queryObj.updateEditorProps("text", text) 
            if(language)queryObj.updateEditorProps("language", language)
        } 
    } 

    const QueryBuilderChange = (queryPaneId, isOpen) => {
        const queryObj= queryPaneList[queryPaneId]
        if(queryObj){
            queryObj.queryBuilderObj.isOpen = isOpen
        } 
    }

    return <QueryPanelContext.Provider
        value={{
            WOQLQueryChange,
            QueryBuilderChange,
            queryPaneList,
            addQueryPane,
            getPanelObject
        }}>
        {children}
    </QueryPanelContext.Provider>
}	