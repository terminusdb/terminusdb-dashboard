
import React,{useMemo} from 'react';
import {ReactTableComponent} from './ReactTableComponent';
import { CSVLink } from "react-csv";
import {FaFileCsv} from "react-icons/fa"
import { Row,Col } from 'react-bootstrap';
import { matchType } from './ColumnFilters';
import {matchRendererType} from './TableCellRenderer'
//import './style.css'
/*
[{Header: "myHeader",
id:"myId",
accessor:"myId",
renderer:{},
filter:{},
disableFilters,
disableSortBy,
width,
minWidth,
maxWidth}]*/

//this only render the logic of do the query is in an external hook
export const GraphqlTable = ({hiddenColumnsArr, 
                              setHiddenColumns,
                              result, 
                              config, 
                              freewidth, 
                              start, 
                              filtersBy ,
                              limit, 
                              orderBy, 
                              totalRows, 
                              setLimits, 
                              setOrder, 
                              setFilters,
                              onRefresh,
                              dowloadConfig})=>{
   // let wt = TerminusClient.View.table()
   // if(view)  wt.loadJSON(view.table, view.rules)
    
    //we have to review the limit must stay only in one place or we get confused
    //the table read the limit from here
    //set the limit in the view conf
   // if(limit) wt.pagesize(limit)
   // let woqt = new TerminusClient.WOQLTable(false, wt)
    //the current page (like 1st page , 2nd page...)
    let pagenum = (limit ? parseInt((start) / limit) : 1)
    //total number of Pages    
    let pages = (limit && totalRows ? parseInt(((totalRows-1)/limit)+1) : 1)

    if(totalRows == 0) pages = 0
    let prefixes = {} // (result && result.prefixes ? result.prefixes : (query ? query.getContext() : {}))

    const [data, columns,hiddenColumns]  = useMemo(() => makeData(), [result])
   

    function makeData () { 
        const {columns, hiddenColumns} = formatTableColumns()
        return [result, columns, hiddenColumns];
    }

    //render type default is string
    // we can add extraformatter

   /* {pager:"remote", columns:[{Header: "myHeader",
    id:"myId",
    accessor:"myId",
    renderer:{},
    filter:{},
    disableFilters,
    disableSortBy,
    width,
    minWidth,
    maxWidth}]}*/

    function formatTableColumns(){
        if(!config) return {columns:[], hiddenColumns:[]}
        const hiddenColumns = hiddenColumnsArr || []
        // I visualise the id only if it is the only item
        const colArr = config.columns
        if(!Array.isArray(colArr))return []
        
        if(!hiddenColumnsArr && colArr.length > 1){
            hiddenColumns.push("_id")
        }

        let listOfColumns = colArr.map((item,index) => {
            if(item.id!== "__ACTIONS__" && !hiddenColumnsArr && index>4){
                hiddenColumns.push(item.id)
            }
            let col = item
            // check if it is a custom component
            if(typeof item.renderer === "function"){
                col.Cell=function(props){
                    return item.renderer(props)
                }
            }else if(item.renderer && matchRendererType[item.renderer.type]){
                col.Cell=function(props){
                    return matchRendererType[item.renderer.type](props)
                }
            }else{
                col.Cell= function(props){
                    const pp =  matchRendererType['default']
                    return pp(props)
                }
            }
            if(item.filter){
                const filter = item.filter
                if(filter){
                    const filterComp = matchType[filter.type]
                    col.Filter = filterComp
                    col.options = filter.options
                }
            }       
            if(freewidth) return col
        })
        let colstruct ={columns:listOfColumns}
       // if(woqt.config.header()) colstruct.Header = woqt.config.header()
       // else colstruct.Header = " "
        return {columns:listOfColumns, hiddenColumns}
    }
    // I visualize the empty data too
    if(!Array.isArray(data)) return null
    // to be review download
    let headers=[] 
    let csvData=[]
    let headersLabel = []
    if(dowloadConfig){
        headersLabel=  dowloadConfig.headersLabel || dowloadConfig.headers
        headers = dowloadConfig.headers || Object.keys(data[0])
        csvData = React.useMemo(() => {  
            return data.map((item) => {
                //array of values 
                //const values = Object.values(d)
                return headers.map(title=>{
                    if(typeof item[title] === "object"){
                        return item[title]["@value"]
                    }
                    return item[title]
                })
                
            });
        }, []);
    } 

    return(<React.Fragment>
            {dowloadConfig && <Row>
                <Col className={"d-flex justify-content-end  pr-5"}>
                    <CSVLink data={csvData} filename={dowloadConfig.filename || "download.csv"} 
                    className={dowloadConfig.className || "btn btn-primary"} headers={headersLabel} >
                    <FaFileCsv size={30}/></CSVLink>
                </Col>
            </Row>}
            <ReactTableComponent
                setHiddenColumns = {setHiddenColumns}
                setFilters={setFilters}
                data={data}
                columns={[{columns:columns,Header:" "}]}
                freewidth={freewidth}
                config={config}
                orderBy={orderBy}
                filtersBy={filtersBy}
                pages={pages}
                limit={limit}
                pageNumber={pagenum}
                rowCount={totalRows}
                setLimits={setLimits}
                setOrder={setOrder}
                hiddenColumns={hiddenColumns}
                
            />
        </React.Fragment>
    )
}
