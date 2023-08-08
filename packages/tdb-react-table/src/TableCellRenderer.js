import React,{useState} from 'react';
import { format } from "date-fns";


export const JSONRenderer = (props)=>{
    let strValue =  props.cell.value
    if(typeof value === "object"){
        strValue=value["@value"]
    }
    return JSON.stringify(strValue, false, 2)
}

export const ImageRenderer = (props)=>{
    let strValue =  props.cell.value
    if(typeof value === "object"){
        strValue=value["@value"]
    }
    const width = args.options &&  args.options.width ? args.options.width : "80px"
    return <div className="d-flex justify-content-center">
                <img src={strValue} width={width} style={{border: "3px solid #444", borderRadius:"25%"}}></img>
            </div>
}

export const StringRenderer = (props)=>{
    let strValue = props.cell.value
    if(typeof value === "object"){
        strValue=value.name || value._id
    }
    return (<span>
                <span data-cy={strValue} title={strValue}>{strValue} </span>
           </span>)
}

export const ArrayRenderer = ({depth, value, column, row, cell, view, args, prefixes})=>{
    if(isEmptyValue(value)){
        return ""
    }
    let maxlen = (args && args.maxlen ? args.maxlen : 5)
    let sf = (maxlen >= value.length || args && args.full)
    let canTruncate = (value.length > maxlen)
    const [showingFull, setShowingFull] = useState(sf)
    const toggleFull = (e) => {
        e.stopPropagation()
        setShowingFull(!showingFull)
    }

    function getVals(){
        let l = (showingFull ? value.length :  maxlen)
        let vals = []
        for(var i = 0; i<l; i++){
            vals.push(<CellRenderer
                key={"cellr_" + i}
                prefixes={prefixes}
                value={value[i]}
                column={column}
                row={row}
                cell={cell}
                view={view}
                args={args}
                depth={depth+1}
            />)
        }
        return vals
    }

    return <span>
        {depth > 0 &&
            <span>[ </span>
        }
        <span>{getVals()}</span>
        {depth > 0 &&
            <span> ]</span>
        }
        {depth == 0 && canTruncate &&
            <button onClick={toggleFull}> {(showingFull ? "less" : "" + (value.length-maxlen) + " more")} </button>
        }
    </span>
}

export const NumberRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let strValue = value
    if(typeof value === "object"){
        strValue=value["@value"]
    }

    let fmt = args.format || "commas"
    if(fmt == "bytes"){
        strValue = TerminusClient.UTILS.TypeHelper.formatBytes(strValue)
    }
    if(fmt == "commas"){
        strValue = TerminusClient.UTILS.TypeHelper.numberWithCommas(strValue)
    }
    return <span title={"Numeric Type: " + type}>{strValue}</span>
}

export const TimeRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let d, fstr
    try{
        let strValue = value
        if(typeof value === "object"){
            strValue=value["@value"]
        }
    
        if(typeof strValue == "number"){
            if(!isNaN(parseFloat(strValue))){
                d = new Date(parseFloat(strValue*1000))
            }else {
                return <span>{strValue}</span>
            }
        }else {
            d = new Date(strValue)
        }
        if(args && args.format) fstr = args.format
        else fstr = (type == "xsd:date" ? "d MMM yy" : "MMM d, yyyy - HH:mm:ss")

        if(d instanceof Date && !isNaN(d)){
            return <span title={"Temporal Type: " + type}>{format(d, fstr)}</span>
        }else {
            return <span>{strValue}</span>
        }
    }catch(err){
        console.log("CellRender Error")
        return ""
    }
}

export const RangeRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let strValue = value
    if(typeof value === "object"){
        strValue=value["@value"]
    }

    return <span title={"Range Type: " + type}>{strValue}</span>
}

export const HTMLRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let strValue = value
    if(typeof value === "object"){
        strValue=value["@value"]
    }
    return <span title={"HTML Type: " + type}>{strValue}</span>
}


export const matchRendererType = {
    "json":JSONRenderer,
    "number":NumberRenderer,
    "default":StringRenderer,
    "string":StringRenderer,
    "image":ImageRenderer}