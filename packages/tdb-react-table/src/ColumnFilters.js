import React, {useState} from 'react'

export const matchType = {"list":SelectColumnFilter,
                          "number":SliderColumnFilter}

export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const [value, setValue] = useState(filterValue)

    return (
      <input
        value={value || ''}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            // Do code here
            ev.preventDefault();
            setFilter(value)
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
    column: { filterValue, setFilter, options, id },
  }) {

    
    // Calculate the options for filtering
    // using the preFilteredRows
    /*const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])*/
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {Array.isArray(options) && options.map((option, i) => (
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
            setFilter(parseInt(e.target.value, 10))
          }}
        />
        <button onClick={() => setFilter(undefined)}>Off</button>
      </>
    )
  }