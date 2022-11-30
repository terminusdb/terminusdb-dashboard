import React from "react"
import {getStoredQueryObject} from "../queries/GeneralQueries"
import {isArray} from "./utils"
import {SavedQueriesControl} from "../hooks/SavedQueriesControl"
import {QueryPaneObj} from "../hooks/queryPaneContext" 
import { Button } from "react-bootstrap"

export const SavedQueries = (props) => {

    const {addQueryPane} = QueryPaneObj()

    const {
        dataProvider,
        setSavedQueryId,
        setQueryObject
    } = SavedQueriesControl(addQueryPane)

    function handleClick (id) {
        let q = getStoredQueryObject(id)
        setSavedQueryId(id)
        setQueryObject(q)
    }

 
    const List = ({dataProvider}) => {
        if (isArray(dataProvider)) {
            let lts=[], elements=[]
            for (var key in dataProvider){
                let label=dataProvider[key]["Query Name"]["@value"]
                let id=dataProvider[key]["Worker"]
                lts.push({id:id, label: label, title: label, type: "link", variant: "light", size:"sm"})
            }
            
            for(var item in lts){
                const element = lts[item];
                elements.push(
                    <Button key={`button_${item}`} {...element} onClick={handleClick}>
                        {element.label}
                    </Button>
                )
            }

            return elements
        }
        return "LOADING"
    }

    
    return <div className="d-grid">
        <List dataProvider={dataProvider}/>
    </div>
}