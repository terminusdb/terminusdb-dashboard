import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
export const PolygonContext = React.createContext()
export const PolygonObj = () => useContext(PolygonContext)

export const PolygonProvider = ({ children, woqlClient, newQueryPanelQuery }) => {
    
	// the only action that have to trigger an update is add polygon 
	const addPolygon = () =>{
		/*const obj = new PanelQueryObj(uuidv4())
		obj.updateEditorProps('query', query)
		if(query){
				let js = query.prettyPrint()
				obj.updateEditorProps('text', js)
		}
		queryPaneList[obj.id] = obj 
		setUpdateList(Date.now())*/
	}

	

	return <PolygonContext.Provider
		value={{
			addPolygon
		}}>
		{children}
	</PolygonContext.Provider>
}	