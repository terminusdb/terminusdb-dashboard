import React from "react"
import {useWorker} from "@terminusdb-live/react-worker"
import {Nav} from '@themesberg/react-bootstrap'

export const TDBReactNav= (props) =>{
    
    const startData= props.startData || []
    const config = props.config.navLinks || {}
    
    const display = props.config.display || "Vertical"
    //var displayCss;
    //(display == "Vertical") ? displayCss = "nav flex-column" : displayCss = "nav flex" 

    const {onChange, error, loading, dataProvider} = useWorker(startData, props.onLoad, false)

    let navLinks=[]

    const onClick = (id) =>{
        if(!props.onChangeEndPoint) return 
        if(props.onChangeFunction){
          props.onChangeFunction(props.onChangeEndPoint,{id:id},props.resultVarName)
        }else{
          onChange(props.onChangeEndPoint)
        }
    }
    
    //console.log(JSON.stringify(dataProvider,null,4))

    if(config){
        function extractFromBindings(id, curItem){
            for(var key in dataProvider){
                let repoId = dataProvider[key].Repository
                if(repoId == id){
                    let label = dataProvider[key].Label
                    let iconName=`fas ${curItem.icon} fa-1x m-2`
                    return {title: label, id: repoId, iconName: iconName, size: curItem.size}
                }
            }
            return {}
        }
        for (var key in config) {
            let id = config[key].id 
            let extracted = extractFromBindings(id, config[key])
            navLinks.push(
                <Nav.Link href="/home" key={`Link_${extracted.title}4`} className="d-flex">
                    <i className={extracted.iconName}/>
                    {extracted.title}
                </Nav.Link>
            )
        }

        return <Nav onSelect={(selectedKey)=>{onClick(selectedKey)}} defaultActiveKey="/home" className="flex-column">
                    {navLinks}
               </Nav>
    } 

    return <div>LOADING</div> 
}
