import React, { useState } from "react"
import Select from 'react-select'
import chroma from 'chroma-js';
import { VIEW } from "../constants"

// sends default value from options
export function getDefaultValue(options, value) {
  let extractedOption=options.filter(opts => opts.value === value)
  return extractedOption
} 
 
export const SelectComponent = ({ options, mode, onChange, value, id, placeholder, required }) => {

  /*const optionsExample = [
    { value: 'chocolate', label: 'Chocolate', color: "#adb5bd" },
    { value: 'strawberry', label: 'Strawberry', color: "#adb5bd" },
    { value: 'vanilla', label: 'Vanilla', color: "#adb5bd" }
  ]*/

  // review - customizing color 
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "transparent", width: "100%", border: "1px solid #666" }),
    menu: (styles) => ({ ...styles, backgroundColor: '#444'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: "transparent",
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },

        ':hover': {
          ...styles[':hover'],
          backgroundColor: "black",
          color: "text-muted"
        },
      };
    }, 
    input: (styles) => {
      return {
        ...styles,
        color: "#f8f9fa !important"
      }
    },
    singleValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        color: color,
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

  function handleChange (selected) {
    //console.log("selected", selected)
    if(onChange) onChange(selected.value)
  }

  if(mode === VIEW) {
    // set menuIsOpen false when in VIEW mode
    return <Select options={options} 
    onChange={handleChange}
    placeholder={placeholder}
    data-testid="select"
    menuIsOpen = {false}
    inputId={id}
    defaultValue={value}
    styles={colourStyles}/>
  }


  return <Select options={options} 
    onChange={handleChange}
    placeholder={placeholder}
    data-testid="select"
    inputId={id}
    defaultValue={value}
    styles={colourStyles}/>
}