import React, {useState} from 'react'

export const matchType = {"list":SelectColumnFilter,
                          "number":NumberColumnFilter,
                          "default":DefaultColumnFilter,
                          "string":DefaultColumnFilter,
                          "boolean":BooleanColumnFilter}
//preFilteredRows
export function NumberColumnFilter({column}){
  if(!column.options){
    column.options ={} 
  }
  
  column.options.operator = column.options.operator ? column.options.operator : "eq"
  return <DefaultColumnFilter column={column} type="number"/>
}

export function DefaultColumnFilter({
    column: { filterValue, options , setFilter },type}) {
    const operator = options && options.operator ? options.operator : "regex"
    const startValue = filterValue ? filterValue.value : null
    const [value, setValue] = useState(startValue)
    const mode = options && options.mode ? options.mode  : undefined
    const variablePath = options && options.varPath ? options.varPath : undefined
    
    return (
      <input
        value={value || ''}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            // Do code here
            ev.preventDefault();
            if(!value) {
              setFilter(undefined)
            }else{
              const value = type === "number" ? Number(ev.target.value) : ev.target.value
              setFilter({value:value, operator:operator, varPath:variablePath, mode})
            }
          }
        }}
        onChange={e => {
          setValue(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        /*onBlur={e => {
          setFilter(value) // Set undefined to remove the filter entirely
        }}*/
        placeholder={`Search records...`}
      />
    )
  }

export function BooleanColumnFilter({
  column}) {
  if(!column.options){
    column.options ={} 
  }
  column.options.dataprovider = ["true","false"]
  column.options.operator = "eq"
  return (
    <SelectColumnFilter column={column} type={'boolean'}/>
  )
}

const mapBoolean = {"true":true, "false":false}
export function SelectColumnFilter({
  column: { filterValue, setFilter, options, id }, type="list" }) {
    // options && options.operator ? options.operator :
    const dataprovider = options ? options.dataprovider : []
    const operator = "eq"
    const variablePath = options && options.varPath ? options.varPath : undefined
    const value = filterValue ? filterValue.value : ""
    const mode = options && options.mode ? options.mode  : undefined
    return (
      <select
        style={{maxWidth:"200px"}}
        value={value}
        onChange={e => {
          const vv = e.target.value
          if(e.target.value === "") {
            setFilter(undefined)
          }else {
            const value = type === "boolean" ? mapBoolean[e.target.value] : e.target.value
            setFilter({value:value, operator:operator, varPath:variablePath, mode})
          }
        }}
      >
        <option value="">All</option>
        {Array.isArray(dataprovider) && dataprovider.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }


  export function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the min and max
    // using the preFilteredRows

    const min = 1
    const max = 10
  
    return (
      <>
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue || min}
          onChange={e => {
            setFilter({operator:"eq",value:e.target.value})//parseInt(e.target.value, 10)} )//{eq:parseInt(e.target.value, 10)})
          }}
        />
        <button onClick={() => setFilter(undefined)}>Off</button>
      </>
    )
  }