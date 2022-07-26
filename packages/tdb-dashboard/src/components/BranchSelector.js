import React, {useState, useEffect} from "react"
import Select from 'react-select'
import {singleSelectStyle} from "./constants"
import {BranchControl} from "../hooks/BranchControl"
import {WOQLClientObj} from '../init-woql-client' 

export const BranchSelector = () =>{

    const [options, setOptions] = useState(false)
    const [defaultValue, setDefaultValue] = useState(false)

    const { 
         handleSwitch
     } = BranchControl()

    const {
        branches,
        branch
    } = WOQLClientObj()

    function handleChange(val) {
        handleSwitch(val.value)
    }

    function getDefaultOption (opts, defaultVal) {
        for (var x=0; x<opts.length; x++) {
            let val = opts[x]
            if(val.value == defaultVal) {
                setDefaultValue(val)
            }
        }
    }

    useEffect(() => {
        if(!branch) return
        if(!branches) return
        let opts =[]
        for(var key in branches) {
            opts.push({value: key, label: key})
        }
        setOptions(opts)
        getDefaultOption(opts, branch)
    }, [branches]) 

    return  <React.Fragment>
        {defaultValue && <Select options={options}
            onChange={handleChange}
            styles={singleSelectStyle}
            className="mb-3 basic-single"
            defaultValue={defaultValue} 
        />}
    </React.Fragment>
}
