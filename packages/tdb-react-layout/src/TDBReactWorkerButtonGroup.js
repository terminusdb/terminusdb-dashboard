import React, { useEffect, useState} from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {TDBReactButton} from "./TDBReactButton"

export const TDBReactWorkerButtonGroup= (props) =>{

    
    const startData= props.startData || []
    const config = props.config || []
    const variant = config.variant || "primary"
    const qName = config.queryName || "Class library"


    const {onChange, error, loading, dataProvider} = useWorker(startData, props.onLoad, false)

    const [buttons, setButtons]=useState([])

    useEffect(() => {
        let btns = []
        for(var key in dataProvider){
            if (qName == "Class library") {
                let name = dataProvider[key]["Class Name"]["@value"]
                let id = dataProvider[key]["Class ID"]
                let description = dataProvider[key]["Description"]
                let count = dataProvider[key]["Count"]["@value"]
                let bConfig = {title: description, id: id, label: name, key: `Buttons_${id}`, variant: variant, count: count}
                btns.push(<TDBReactButton key={`item__${key}`} config={bConfig} onClick={props.onClick} badge={true}/>)
            }
            else if (qName == "Property library") {
                let name = dataProvider[key]["Property Name"]["@value"]
                let id = dataProvider[key]["Property ID"]
                let description = dataProvider[key]["Property Description"]
                let bConfig = {title: description, id: id, label: name, key: `Buttons_${id}`, variant: variant}
                btns.push(<TDBReactButton key={`item__${key}`} config={bConfig} onClick={props.onClick}/>)
            }
        }
        
        setButtons(btns)
    }, [dataProvider])


    if(dataProvider){
        return <React.Fragment>{buttons}</React.Fragment>
    }
    return <React.Fragment>LOADING</React.Fragment> 
}
