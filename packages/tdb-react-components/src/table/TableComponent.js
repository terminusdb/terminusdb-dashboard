import React,{useEffect, useMemo} from 'react';
import { useTable, usePagination,  useSortBy } from 'react-table'
import {BiRefresh} from "react-icons/bi"
import { Table,Container,Row, Col, Pagination, PaginationItem, PaginationLink,Button} from "react-bootstrap" //replace;

/**
 * config options
 * pager - no, remote, local 
 * sort - no, local, remote
 */ 

export const TableComponent = ({columns, data, view, pages, freewidth, orderBy, rowCount, pageNumber, setLimits, setOrder, pagesizes, onRefresh})=>{

    pagesizes = pagesizes || [5, 10, 20, 30, 40, 50]
    let pager = view.config.pager()

    rowCount = rowCount || data.length 
    
    const startPageSize= view.config.pagesize() || 10
    const startPageNumber = pageNumber || 0
    let ut_config = {
        columns,
        data,
        manualPagination: pager == "remote" ? true : false,
        manualSortBy:pager == "remote" ? true : false,
        pageCount : pages || 1,
        initialState : {
            pageSize : view.config.pagesize() || 10,
            pageIndex : pageNumber || 0,
            sortBy : woql_to_order(orderBy),
            
        }
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, sortBy },
        } = useTable(ut_config, useSortBy, usePagination)

    
    let rowCountStr = ""
    if(pager){
        let st = ((pageSize * pageIndex) + 1)
        let en = page.length + st - 1
        rowCountStr = "Record " + st + " to " + en
        if(rowCount){
            rowCountStr += " of " + rowCount
        }
    } 

    useEffect(() => {
        if(pager === "remote"){
            let worder = order_to_woql(sortBy)
            if(setOrder) setOrder(worder)
        }
    }, [sortBy])

    
    
    useEffect(() => {
        if((pager === "remote") && setLimits && (pageSize !== ut_config.initialState.pageSize 
            || pageIndex != (pageNumber || 0)))
            setLimits(pageSize, (pageIndex)*pageSize)
     }, [pageIndex, pageSize ])

     
     return (
        <span>
             
            <Table {...getTableProps()} hover >
                     <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                                </span>
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps(getRowProps(row, view))}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps([
                                    getColumnProps(cell.column, view, freewidth),
                                    getCellProps(cell, view),
                                ])}>
                                    {cell.render("Cell")}
                                </td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            {pager &&
                <Row md={12} className="mr-0 ml-0">
                    <Col md={3} className="d-flex justify-content-center align-items-center">                      
                        <button onClick={() => 
                            previousPage()} 
                            disabled={!canPreviousPage}>
                        {'<'}
                        </button>{' '}
                        <button onClick={() => 
                            nextPage()} 
                            disabled={!canNextPage}>
                        {'>'}
                        </button>{' '}                      
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                         <span>
                            Page{' '}
                            <strong className="mr-3">
                                {pageIndex  + 1} of {pageCount}
                            </strong>
                        </span>
                       
                        <select value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                            {pagesizes.map(pageSizeItem => {
                                return <option key={pageSizeItem} value={pageSizeItem}>
                                            Show {pageSizeItem}
                                        </option>   
                            })}
                        </select>
                        <div className="ml-4">{rowCountStr}</div>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center align-items-center">
                        <div className="tdb__toolbar__base">
                            <button onClick={onRefresh} className="tdb__toolbar__base__button" title="Refresh table contents">
                                <BiRefresh className="tdb__toolbar__base__icon"/>
                                <span>Refresh</span>
                            </button>
                        </div>
                    </Col>
              </Row>
            }
    </span>
    )
}

function getCellProps(cell, view){
    let cs = {}
    if(view.hasCellClick(cell.row.original, cell.column.id)){
        let onc = view.getCellClick(cell.row.original, cell.column.id)
        if(onc){
            cs.onClick = function(){
                onc(cell)
            }
            cs.style = { cursor: "pointer"}
        }
    }
    return cs
}

function getRowProps(row, view){
    let cs = {}
    if(view.hasRowClick(row.original)){
        let onc = view.getRowClick(row.original)
        if(onc){
            cs.onClick = function(){
                onc(row)
            }
            cs.style = { cursor: "pointer"}
        }
    }
    return cs
}


function getColumnProps(column, view, freewidth){
    let cstyle = {}
    if(freewidth){
        cstyle = view.getColumnDimensions(column.id)
    }
    else {
        if(column.width){
            cstyle.width = column.width
        }
        if(column.maxWidth){
            cstyle.maxWidth = column.maxWidth
        }
        if(column.minWidth){
            cstyle.minWidth = column.minWidth
        }
    }
    return {
        style: cstyle
    }
}

const order_to_woql = (lorder) => {
    if(lorder.length == 0) return false
    if(!Array.isArray(lorder)) return false
    let orderarr = []
    for(var i = 0; i<lorder.length; i++){
        orderarr.push(lorder[i].id)
        orderarr.push(lorder[i].desc ? "desc" : "asc")
    }
    return orderarr
}

const woql_to_order = (ob) => {
    if(!ob) return []
    let order = []
    if(!Array.isArray(ob)) ob = [ob]
    for(var i = 0; i<ob.length; i++){
        if(ob[i] == "asc" || ob[i] == "desc"){

        }
        else {
            let nub = {id: ob[i], desc: false}
            if(i+1<ob.length && ob[i+1] == "desc") nub.desc=true
            order.push(nub)
        }
    }
    return order
}
