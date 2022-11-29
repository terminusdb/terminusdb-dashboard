import React,{useMemo} from 'react';
import TerminusClient from '@terminusdb/terminusdb-client';
import {TableComponent} from './TableComponent';
import { CellRenderer } from "./CellRenderer"

//this only render the logic of do the query is in an external hook
export const WOQLTable = ({bindings, result, view, freewidth, query, start, limit, orderBy, totalRows, setLimits, setOrder, onRefresh, resultColumns})=>{
    let wt = TerminusClient.View.table()
    if(view)  wt.loadJSON(view.table, view.rules)
    
    //we have to review the limit must stay only in one place or we get confused
    //the table read the limit from here
    //set the limit in the view conf
    if(limit) wt.pagesize(limit)
    let woqt = new TerminusClient.WOQLTable(false, wt)
    //the current page (like 1st page , 2nd page...)
    let pagenum = (limit ? parseInt((start) / limit) : 1)
    //total number of Pages    
    let pages = (limit && totalRows ? parseInt(((totalRows-1)/limit)+1) : 1)

    if(totalRows == 0) pages = 0
    let prefixes = {} // (result && result.prefixes ? result.prefixes : (query ? query.getContext() : {}))

    const [data, columns]  = useMemo(() => makeData(), [bindings, result])

    function makeData () { 
        let qres = {}
        if(Array.isArray(result.bindings)){
            //let trans = woqt.bindings()
            qres.bindings = result.bindings
        }
        else qres.bindings = result
        let wr = new TerminusClient.WOQLResult(qres, query)
        woqt.setResult(wr, query)
        const columns = formatTableColumns(woqt)
        //const columns = resultColumns
        return [wr.rows(), columns];
    }

    function addColumnDimensions(item, col){
        let cstyle = woqt.getColumnDimensions(item)
        for(var k in cstyle){
            col[k] = cstyle[k]
        }
        return col
    }

    function renderCellValue(props, woqt){
        let rend = woqt.getSpecificRender(props.cell.column.id, props.cell.row.original)
        if(rend){
            return rend(props.cell)
        }
        else {
            if(!props.cell.value || typeof props.cell.value == "undefined"){
                return ""
            }
            let rendargs = woqt.getRenderer(props.cell.column.id, props.cell.row.original)           
            if(typeof props.cell.value == "string" || typeof props.cell.value == "number" ||
                Array.isArray(props.cell.value) ||
                (typeof props.cell.value === "object" && (props.cell.value['@type'] ||
                typeof props.cell.value['@value'] != "undefined"))){
                    return <CellRenderer
                        args={rendargs}
                        value={props.cell.value}
                        column={props.cell.column.id}
                        row={props.cell.row.original}
                        view={woqt}
                        cell={props.cell}
                        prefixes={prefixes}
                    />
            }
            
            return props.cell.value
        }
    }

    function formatTableColumns(){
        const colids = woqt.getColumnsToRender()
        if(!Array.isArray(colids))return []
        const fixedColIds = colids.map((item, index) => {
            if(item == "") { 
                item = "_" + index
            }
            return item
        })

        let listOfColumns = fixedColIds.map((item, index) => {

            let col = {
                Header: woqt.getColumnHeaderContents(item) || item,
                id: item,
                accessor: item,
                Cell: function(props){
                    return renderCellValue(props, woqt)
                }
            }
            if(!woqt.isSortableColumn(item)){
                col.disableSortBy = true
            }
            if(freewidth) return col
            return addColumnDimensions(item, col, woqt)
        })
        let colstruct = {columns:listOfColumns} 
        if(woqt.config.header()) colstruct.Header = woqt.config.header()
        else colstruct.Header = " "
        return [colstruct]
    }
    if(!data || !data.length) return null
    return(
        <TableComponent
            data={data}
            columns={columns}
            freewidth={freewidth}
            view={woqt}
            orderBy={orderBy}
            pages={pages}
            pageNumber={pagenum}
            rowCount={totalRows}
            setLimits={setLimits}
            setOrder={setOrder}
            onRefresh={onRefresh}
        />
    )
}
