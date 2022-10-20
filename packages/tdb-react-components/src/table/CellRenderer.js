import React,{useState} from 'react';
import TerminusClient from '@terminusdb/terminusdb-client';
import { format } from "date-fns";
import {MdExpandLess, MdExpandMore} from "react-icons/md"

export const CellRenderer = ({value, column, row, cell, view, args, depth, prefixes})=>{
    depth = depth || 0
    if(!value) return ""
    if(isEmptyValue(value)){
        return ""
    }
    else if(typeof value == "string" && TerminusClient.UTILS.isIRI(value, prefixes, true)){
        return <IRIRenderer
            value={value}
            depth={depth}
            prefixes={prefixes}
            view={view}
            row={row}
            cell={cell}
            column={column}
            args={args}
        />
    }
    else if((typeof value == "string" || typeof value == "number" ) && args && args.datatype){
        let nvalue = {"@value": value, "@type": args.datatype}
        return <LiteralRenderer
            prefixes={prefixes}
            value={nvalue}
            view={view}
            row={row}
            cell={cell}
            column={column}
            args={args}
        />
    }
    else if(Array.isArray(value)){
        if(value.length == 1 && Array.isArray(value[0])){
            value = value[0]
        }
        return <ArrayRenderer
            prefixes={prefixes}
            value={value}
            depth={depth}
            view={view}
            row={row}
            cell={cell}
            column={column}
            args={args}
        />
    }
    else if(typeof value == "object" && typeof value['@value'] !== "undefined"){
        if(args && args.types){
            return <span>
                <LiteralRenderer
                    prefixes={prefixes}
                    value={value}
                    view={view}
                    row={row}
                    cell={cell}
                    column={column}
                    args={args}
                />
                <TypeRenderer
                    prefixes={prefixes}
                    value={ty}
                    view={view}
                    row={row}
                    cell={cell}
                    column={column}
                    args={args}
                />
            </span>
        }
        else {
            return <LiteralRenderer
                prefixes={prefixes}
                value={value}
                view={view}
                row={row}
                cell={cell}
                column={column}
                args={args}
            />
        }
    }
    else if(typeof value == "object" && typeof value['@type']){
        return <JSONLDRenderer
            prefixes={prefixes}
            value={value}
            view={view}
            row={row}
            cell={cell}
            column={column}
            args={args}
        />
    }
    return value
}

export const IRIRenderer = ({value, column, row, cell, view, args, prefixes})=>{
    if(!view.uncompressed(row, column)){
        let shirival = TerminusClient.UTILS.shorten(value, prefixes)
        if(shirival != value){
            return <span className="shortened_iri" title={value}> {shirival} </span>
        }
    }
    return <span className='iri'>{ value }</span>
}

export const TypeRenderer = ({value, column, row, cell, view, args, prefixes})=>{
    if(!view.uncompressed(row, column)){
        let shirival = TerminusClient.UTILS.shorten(value, prefixes)
        if(shirival != value){
            return <span className="shortened_iri" title={"Type: " + value}> {shirival} </span>
        }
    }
    return <span className='iri'>{ value }</span>
}

export const JSONLDRenderer = ({value, column, row, cell, view, args,prefixes})=>{
    return <JSONRenderer
            prefixes={prefixes}
            value={value}
            view={view}
            row={row}
            cell={cell}
            column={column}
            args={args}
        />
}

export const JSONRenderer = ({value, column, row, cell, view, args, prefixes})=>{
    return JSON.stringify(value, false, 2)
}

function isTemporalType(ty){
    let tts = ["xsd:date", "xsd:dateTime"]
    return (tts.indexOf(ty) != -1)
}

function isHTMLType(ty){
    let tts = ["xdd:html"]
    return (tts.indexOf(ty) != -1)
}

function isJSONType(ty){
    let tts = ["xdd:json"]
    return (tts.indexOf(ty) != -1)
}

function isRangeType(ty){
    let tts = ["xdd:gYearRange", "xdd:decimalRange", "xdd:dateRange", "xdd:integerRange"]
    return (tts.indexOf(ty) != -1)
}


export const LiteralRenderer = ({value, column, row, cell, view, args, prefixes})=>{
    let ty = (value["@type"] ? TerminusClient.UTILS.shorten(value["@type"], prefixes) : "xsd:string")
    let vy = value['@value']
    args = args || {}
    if(args.type=="time" || (!args.type && isTemporalType(ty))){
        return <TimeRenderer
            value={vy}
            type={ty}
            prefixes={prefixes}
            column={column}
            row={row}
            cell={cell}
            view={view}
            args={args}
        />
    }
    if(args.type=="number" || (!args.type && typeof vy == "number")){
        return <NumberRenderer
            value={vy}
            type={ty}
            prefixes={prefixes}
            column={column}
            row={row}
            cell={cell}
            view={view}
            args={args}
        />
    }
    if(args.type=="html" || (!args.type && isHTMLType(ty))){
        return <HTMLRenderer
            value={vy}
            type={ty}
            prefixes={prefixes}
            column={column}
            row={row}
            cell={cell}
            view={view}
            args={args}
        />
    }
    if(args.type=="json" || (!args.type && isJSONType(ty))){
        return <JSONRenderer
            value={vy}
            type={ty}
            prefixes={prefixes}
            column={column}
            row={row}
            cell={cell}
            view={view}
            args={args}
        />
    }
    if(args.type=="range" || (!args.type && isRangeType(ty))){
        return <RangeRenderer
            value={vy}
            type={ty}
            prefixes={prefixes}
            column={column}
            row={row}
            cell={cell}
            view={view}
            args={args}
        />
    }
    return <StringRenderer
        value={vy}
        type={ty}
        prefixes={prefixes}
        column={column}
        row={row}
        cell={cell}
        view={view}
        args={args}
    />
}

export const StringRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let maxlen = (args && args.maxlen ? args.maxlen : 200)
    let maxword = (args && args.maxword ? args.maxword : 32)
    let txt = shortenedText(value, maxlen, maxword)
    let sf = (txt == value || args && args.full)
    let canTruncate = !(txt == value)
    const [showingFull, setShowingFull] = useState(sf)
    const toggleFull = (e) => {
        e.stopPropagation()
        setShowingFull(!showingFull)
    }
    return (<span>
        {showingFull && 
            <span title={"String Type: " + type}>{value} </span>
        }
        {!showingFull &&
            <span title={"Type: " + type + ", Value: " + value}>{txt} </span>
        }
        {/*canTruncate &&
            <button onClick={toggleFull}> {(showingFull ? "less" : "more")} </button>
        */}
        {canTruncate && showingFull && <span className="" title={"Show Less"} onClick={toggleFull}>
            <MdExpandLess color="#0055bb" className=''/>
        </span>
        }
        {canTruncate && !showingFull && <span className="" title={"Show More"} onClick={toggleFull}>
            <MdExpandMore color="#0055bb" className=''/>
        </span>
        }
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



export const shortenedText = (text, max_cell_size, max_word_size) => {
	if(max_cell_size && (text.length > max_cell_size)){
        text = text.substring(0, max_cell_size)
        let lastword = text.lastIndexOf(" ")
        if((text.length - lastword) < 15) text = text.substring(0, lastword)
        text += "... ";
	}
	if(text && text.length > max_word_size){
		const replacements = {}
		const words = text.split(" ");
		for(var i = 0; i < words.length; i++){
			var word = words[i];
			if(word.length > max_word_size){
				var newstr = word.substring(0, max_word_size) + "...";
				replacements[word] = newstr;
			}
		}
		for(var k in replacements){
			text = text.replace(k, replacements[k]);
		}
    }
    return text
}



export const NumberRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let fmt = args.format || "commas"
    if(fmt == "bytes"){
        value = TerminusClient.UTILS.TypeHelper.formatBytes(value)
    }
    if(fmt == "commas"){
        value = TerminusClient.UTILS.TypeHelper.numberWithCommas(value)
    }
    return <span title={"Numeric Type: " + type}>{value}</span>
}

export const TimeRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    let d, fstr
    if(typeof value == "number"){
        if(!isNaN(parseFloat(value))){
            d = new Date(parseFloat(value*1000))
         }else {
             return <span>{value}</span>
         }
    }else {
        d = new Date(value)
    }
    if(args && args.format) fstr = args.format
    else fstr = (type == "xsd:date" ? "d MMM yy" : "MMM d, yyyy - HH:mm:ss")

    if(d instanceof Date && !isNaN(d)){
        return <span title={"Temporal Type: " + type}>{format(d, fstr)}</span>
    }else {
        return <span>{value}</span>
    }
}

export const RangeRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    return <span title={"Range Type: " + type}>{value}</span>
}

export const HTMLRenderer = ({value, type, column, row, cell, view, args, prefixes})=>{
    return <span title={"HTML Type: " + type}>{value}</span>
}

function isEmptyValue(val){
    if(!val)return false
    if(val == "system:unknown") return true
    if(val === "") return true
    if(typeof val == "object" && val['@value'] === "") return true
    if(Array.isArray(val) && val.length == 0) return true
    if(Array.isArray(val) && val.length == 1 && isEmptyValue(val[1])) return true
    return false
}
