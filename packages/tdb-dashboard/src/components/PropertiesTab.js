import React, {useEffect, useState} from "react"
import SplitPane from 'react-split-pane'
import {handleWidthChange} from "../pages/utils"
import {WOQLGraph} from '@terminusdb-live/tdb-react-components'
import { WOQLTable,ControlledQueryHook } from "@terminusdb/terminusdb-client"
//import {ControlledQueryHook} from '@terminusdb-live/tdb-react-components'
import {getPropertyMeta} from "../queries/GeneralQueries"
import {getPropertyMetaTabConfig, getPropertyMetaGraphConfig} from "./ViewConfig"
import {Col} from "react-bootstrap"

export const PropertiesTab = ({graph, woqlClient}) => {

    const [width, setWidth] = useState("")
    const [query, setQuery] = useState(getPropertyMeta(graph))

    const [graphConfig, setGraphConfig] = useState(false)
    const [tableConfig, setTableConfig] = useState(false)


    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
    } = {}//ControlledQueryHook(woqlClient, query, false, 20)

     useEffect(() => {
        let tConf = getPropertyMetaTabConfig(result)
        setTableConfig(tConf)

        let gConf = getPropertyMetaGraphConfig(result)
        setGraphConfig(gConf)
    }, [result])

    

    const getClassFrame = (docType) => {
        woqlClient.getClassFrame(docType).then((cf) => setFrame(cf))
    }

    const showClass = (cid) => {
        if(cid) getClassFrame(cid)
    }

    return <SplitPane split="horizontal"
        defaultSize="50%"
        onChange={size => handleWidthChange(size, setWidth)}>
        <div>
            {result && graphConfig && <WOQLGraph 
                config={graphConfig.config} 
                dataProvider={graphConfig} 
                query={query} 
                
                updateQuery={updateQuery}
            />}
        </div>
        {/*<div>
            <Col md={10}>
                {result && tableConfig && <WOQLTable
                    result={result}
                    freewidth={true}
                    view={(tableConfig ? tableConfig.json() : {})}
                    limit={limit}
                    start={start}
                    orderBy={orderBy} 
                    setLimits={changeLimits}
                    setOrder={changeOrder}
                    query={query}
                    loading={loading}
                    totalRows={rowCount}
                />}
            </Col>
            
        </div>*/}
    </SplitPane>  
}