import React, {useState,useMemo} from "react"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {ResultController} from "./ResultController"
import {tableViewConfig, graphViewConfig} from "../functions/ViewConfig"
import {GRAPH_VIEW, TABLE_VIEW, JSON_VIEW, EDITOR_WRITE_OPTIONS} from "./constants"
import {TDBCollapse} from './layout/TDBCollapse'
import {TDBReactResizable} from './layout/TDBReactResizable'
import {ControlledQueryHook} from '@terminusdb-live/tdb-react-components'
import {WOQLClientObj} from '../init-woql-client'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {DOCUMENT_EXPLORER} from "../routing/constants"
import history from '../routing/history'
import {FORM_VIEW, VIEW_DOCUMENT, PROGRESS_BAR_COMPONENT} from "./constants"
import {Loading} from "./Loading"
//import {ViewPane} from "./ViewPane"

export const Results = ({freewidth, queryObj, woql, changeLimits,setOrder,loading})=>{

    const queryResult = queryObj.resultObj || {}
    const result = queryResult.result
    const totalRows = queryResult.totalRows

    const bindings = (result && result.bindings) ? result.bindings : []
  //const [graphConfig, setGraphConf]=useState(queryResult.graph || graphViewConfig(bindings))

    const {
        setSelectedDocument,
        selectedDocument
    } = WOQLClientObj()


    function onRowClick (row) {
       if(row.original["Subject"]) {
            setSelectedDocument({
                action: VIEW_DOCUMENT,
                //type: row.original["@type"],
                view: FORM_VIEW,
                submit: false,
                currentDocument: row.original["Subject"],
                frames: {},
                filledFrame: {},
                loading: <Loading message={`Fetching document ${row.original["@id"]} ...`} type={PROGRESS_BAR_COMPONENT}/>,
                message: false,
                update:false
            })
            history.push(DOCUMENT_EXPLORER)
       }
    }

    const [tableConfig, setTableConfig]=useState(tableViewConfig(onRowClick))
    const [currentView, setCurrentView]=useState(queryResult.currentView)
    const [isExpanded, setPanelExpanded] = useState(queryObj.resultPanelIsOpen)

    const [queryRunTime, setQueryRunTime] = useState(false)

    let options = EDITOR_WRITE_OPTIONS

    const setGraphConfig=(config)=>{
        setGraphConf(config)
        queryObj.updateResultProps('graph',config)

    }

    const setExpanded = ()=>{
        const newStatus=!isExpanded
        // setPanelExpanded(newStatus)
        queryObj.resultPanelIsOpen = newStatus

    }

    const setView = (viewType) =>{
        setCurrentView(viewType)
        queryObj.updateResultProps('currentView',viewType)
    }

    const setLimits=(limit, start)=>{
        if(limit)queryObj.updateResultProps('limit',limit)
        if(start)queryObj.updateResultProps('start',start)
        changeLimits(limit, start)
    }

    const saveGraph = () =>{

    }

    function queryTimeDisplay(currentReport){
        let qtime = (currentReport.duration ? currentReport.duration / 1000 : false)
        return (qtime ? qtime + " seconds" : false)
    }


    useMemo(()=>{
        if(result && result.error){
            //setError(result)
        }
        if(result) {
            let qtime = queryTimeDisplay(result)
            setQueryRunTime(qtime)
           /* if(currentView == GRAPH_VIEW) {
                setGraphConf(graphViewConfig(result.bindings))
            }*/
        }
    },[result, totalRows, currentView])

    

    return(
        <React.Fragment>
        <TDBReactResizable style={{margin: "10px", minWidth: "100%"}}>
            <ResultController onClick={setView}
                             isExpanded={queryObj.resultPanelIsOpen}
                             setExpanded={setExpanded}
                             currentView={currentView}
                             queryRunTime={queryRunTime}/>
            {/*<ViewPane queryObj={queryObj} setGraphConfig={setGraphConfig}/> */}
            <TDBCollapse isExpanded={queryObj.resultPanelIsOpen}>            
                {/*currentView==GRAPH_VIEW &&
                    <React.Fragment>
                    <ViewPane queryObj={queryObj} setGraphConfig={setGraphConfig}/>
                    <div className="graph-bg-color">
                        <WOQLGraph
                            config={graphConfig.config}
                            dataProvider={graphConfig}
                            query={queryObj.editorObj.query}
                            //updateQuery={updateQuery}
                        />
                        </div>
                    </React.Fragment>
    */}
                {currentView==TABLE_VIEW &&
                    <WOQLTable
                        result={queryResult.result}
                        freewidth={freewidth}
                        view={(tableConfig ? tableConfig.json() : {})}
                        limit={queryResult.limit}
                        start={queryResult.start}
                        orderBy={queryResult.orderBy}
                        setLimits={setLimits}
                        setOrder={setOrder}
                        query={false}
                        loading={loading}
                        totalRows={queryResult.totalRows}
                    />
                    }
                {currentView==JSON_VIEW &&
                    <CodeMirror
                        value={JSON.stringify(bindings, null, 2)}
                        readOnly= {true}
                        options={options}
                    />
                }
            </TDBCollapse>
        </TDBReactResizable>
        </React.Fragment>
        )
}

/*




 <WOQLTable
                                result={extractedResults}
                                freewidth={true}
                                view={(tableConfig ? tableConfig.json() : {})}
                                limit={limit}
                                start={start}
                                orderBy={orderBy}
                                setLimits={changeLimits}
                                setOrder={changeOrder}
                                resultColumns={getColumnsFromResults(extractedResults)}
                                query={false}
                                loading={loading}
                                totalRows={rowCount}
                            />*/

/*
  {currentView==GRAPH_VIEW && <div className="graph-bg-color">
                    <WOQLGraph
                        config={graphConfig.config}
                        dataProvider={graphConfig}
                        query={queryObj.editorObj.query}
                        //updateQuery={updateQuery}
                    />
                </div>}*/
