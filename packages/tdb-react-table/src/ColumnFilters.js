import React, {useState} from 'react'

export const matchType = {"list":SelectColumnFilter,
                          "number":SliderColumnFilter,
                          "default":DefaultColumnFilter,
                          "string":DefaultColumnFilter}
//preFilteredRows
export function DefaultColumnFilter({
    column: { filterValue, options , setFilter },
  }) {
    const operator = options && options.operator ? options.operator : "regex"
    const startValue = filterValue ? filterValue.value : null
    const [value, setValue] = useState(startValue)

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
              setFilter({value:value, operator:operator, varPath:variablePath})
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


export function SelectColumnFilter({
  column: { filterValue, setFilter, options, id }}) {
    // options && options.operator ? options.operator :
    const dataprovider = options ? options.dataprovider : []
    const operator = "eq"
    const variablePath = options && options.varPath ? options.varPath : undefined
    const value = filterValue ? filterValue.value : ""
    return (
      <select
        value={value}
        onChange={e => {
          const vv = e.target.value
          if(e.target.value === "") {
            setFilter(undefined)
          }else setFilter({value:e.target.value, operator:operator, varPath:variablePath})
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