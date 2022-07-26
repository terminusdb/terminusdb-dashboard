import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap" //replace
import TerminusClient from '@terminusdb/terminusdb-client'
import TextareaAutosize from 'react-textarea-autosize';
import Select from "react-select"


export const ChoiceRenderer = ({val, onChange, mode, frame, expansion, index, types, docs}) => {
    const [active, setActive] = useState(false)
    const toggleActive = () => setActive(!active) 
    const activeOn = () => setActive(true) 
    const activeOff = () => setActive(false) 
    let lab = val || "Select from choices"
    let opts = frame.frame.elements.map((item) => {
        if(TerminusClient.UTILS.compareIDs(item.class, val)){
            lab = item.label["@value"]
        }
        return { value: TerminusClient.UTILS.shorten(item.class), label: item.label["@value"]}
    })

    let docChange = function(e){
        alert(e.value + " is the val")
        onChange(e.value)
    }
    let tindex = (expansion == "list" ? index + 1: false)
    if(mode == "edit") return <span className="wiki-choice-wrapper"><Select  
        className="wiki-chooser"
        defaultValue={val}
        isClearable={true}
        onChange={docChange} 
        options={opts}  
        placeholder={lab}
    /></span>
    else return <span className="wiki-chooser-box">
        <span className="wiki-chooser-box-choice">{lab}</span>
    </span>   
}
