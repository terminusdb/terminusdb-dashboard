import React,{useEffect, useMemo} from 'react';
import { useTable, usePagination,  useSortBy, useFilters } from 'react-table'
import {BiRefresh} from "react-icons/bi"
import {MdOutlineResetTv} from "react-icons/md"
import { Table,Container,Row, Col, Pagination, PaginationItem, PaginationLink,Button} from "react-bootstrap" //replace;
import {CheckboxDropdown} from "./ColumsVisibilityComponent"
import { DefaultColumnFilter } from './ColumnFilters';
/**
 * config options
 * pager - no, remote, local 
 * sort - no, local, remote
 */ 

export const ReactTableComponent = ({columns, data, config, pages, freewidth, filtersBy, orderBy, rowCount, pageNumber, setLimits, setOrder, setFilters, pagesizes, onRefresh,hiddenColumns})=>{

   // console.log("COLUMS", JSON.stringify(columns,null,4))

    pagesizes = pagesizes || [5, 10, 20, 30, 40, 50]
    let pager = "remote"//config.pager()

    rowCount = rowCount || data.length 
    
    const startPageSize=  10
    const startPageNumber = pageNumber || 0
    let ut_config = {
        columns,
        defaultColumn:{ Filter: DefaultColumnFilter },
        data,
      
        manualFilters:true,
        manualPagination: pager === "remote" ? true : false,
        manualSortBy:pager === "remote" ? true : false,
        pageCount : pages || 1,
        initialState : {
            filters : filtersBy || [],
            pageSize : 10,
            pageIndex : pageNumber || 0,
            hiddenColumns: hiddenColumns
            //sortBy : orderBy,
        }
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        setAllFilters,
        prepareRow,
      //  columns,
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
        allColumns,
        getToggleHideAllColumnsProps,
        state: { pageIndex, pageSize, sortBy ,filters},
        } = useTable(ut_config, useFilters,useSortBy, usePagination)



    
    let rowCountStr = ""
    let total= ""
    if(pager){
        let st = ((pageSize * pageIndex) + 1)
        let en = page.length + st - 1
        rowCountStr = "Record " + st + " to " + en
        if(rowCount){
            total += " of " + rowCount
        }
    } 

    useEffect(() => {
        if(pager === "remote" && sortBy!== orderBy ){//ut_config.initialState.sortBy){
            //let worder = order_to_woql(sortBy)
            //old method with woql
            //if(!setFilters){
              //  setOrder(worder)
               // return 
            //}
            if(setOrder) setOrder(sortBy)
        }
    }, [sortBy])

    useEffect(() => {
           //console.log(filters)
           if(pager === "remote" && filters!== ut_config.initialState.filters){
                if(setFilters)setFilters(filters)
           }
    }, [filters])

    
    
    useEffect(() => {
        if((pager === "remote") && setLimits && (pageSize !== ut_config.initialState.pageSize 
            || pageIndex != (pageNumber || 0)))
            setLimits(pageSize, (pageIndex)*pageSize)
     }, [pageIndex, pageSize ])


     return (
        <span>
        <div className='d-flex justify-content-end'>
        {setFilters && <Button title="Reset filters" className="bg-light text-dark" onClick={() => setAllFilters([])}><MdOutlineResetTv/></Button>}
        <CheckboxDropdown allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}/>
        </div>
        <div className="h-4" />
            <Table {...getTableProps()} hover >
                     <thead>
                        {headerGroups.map((headerGroup,index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={`header__${index}`}>
                            {headerGroup.headers.map((column,index) => (
                            <th key={`column__${index}`}>
                                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </div>
                                <div className="mt-3">{setFilters && column.canFilter ? column.render("Filter") : ""}</div>                          
                                </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps(getRowProps(row, config))} key={`page__${i}`} >
                            {row.cells.map((cell,i) => {
                                return <td key={`cell__${i}`} {...cell.getCellProps([
                                    getColumnProps(cell.column, config, freewidth),
                                    getCellProps(cell, config),
                                ])}>
                                    {cell.render("Cell")}
                                </td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            {data.length === 0 && <h4>No Result Data</h4>}
            {pager && data.length>0 &&
                <Row md={12} className="mr-0 ml-0">
                    <Col md={3} className="d-flex justify-content-center align-items-center">                      
                        <button id="table_previous" onClick={() => 
                            previousPage()} 
                            disabled={!canPreviousPage}>
                        {'<'}
                        </button>{' '}
                        <button id="table_next" onClick={() => 
                            nextPage()} 
                            disabled={!canNextPage}>
                        {'>'}
                        </button>{' '}                      
                    </Col>
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        
                        <span id="table_page_number">
                            Page{' '}
                            <strong className="mr-3">
                                {pageIndex  + 1} of {pageCount}
                            </strong>
                        </span>
                      
                        <select value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                            {pagesizes.map((pageSizeItem,i) => {
                                return <option  value={pageSizeItem} key={`pageSize__${i}`}>
                                            Show {pageSizeItem}
                                        </option>   
                            })}
                        </select>
                    
                       
                        <div className="ml-4" >{rowCountStr}<span id="table_row_total">{total}</span></div>
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
   /* let cs = {}
    if(view.hasCellClick(cell.row.original, cell.column.id)){
        let onc = view.getCellClick(cell.row.original, cell.column.id)
        if(onc){
            cs.onClick = function(){
                onc(cell)
            }
            cs.style = { cursor: "pointer"}
        }
    }
    return cs*/
    return {}
}

function getRowProps(row, config){
    let cs = {}
    if(config.rowClick){
        cs.onClick = function(){
            config.rowClick(row)
        }
        cs.style = { cursor: "pointer"}
    }
    return cs
}


function getColumnProps(column, view, freewidth){
    let cstyle = {}
    /*if(freewidth){
        cstyle = view.getColumnDimensions(column.id)
    }*/
    if(column.width){
            cstyle.width = column.width
        }
    if(column.maxWidth){
            cstyle.maxWidth = column.maxWidth
        }
     if(column.minWidth){
            cstyle.minWidth = column.minWidth
        }
    return {
        style: cstyle
    }
}