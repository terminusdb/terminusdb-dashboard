import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap" //replace
import TerminusClient from '@terminusdb/terminusdb-client'
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineMenu, AiOutlinePlus, AiOutlineDown, AiOutlineRight, AiOutlineIdcard, AiOutlineUnorderedList, AiOutlineBuild, AiFillBuild } from "react-icons/ai";
import { ValueRenderer } from "./ValueRenderer"
import { addFrameControl, getTypeStruct, getDocStruct, WikiRow, hasControl, 
    getMissingPropertySelector, getFilledPropertySelector, StatusIndicator, getDocLabel} from "./utils"
import OutsideClickHandler from 'react-outside-click-handler';
import {RiDeleteBin5Line} from "react-icons/ri"
import Select from "react-select"
import { shortenedText } from "../table/CellRenderer"


export const PropertyRenderer = ({frame, mode, view, types, docs, autosave, onDelete, ping}) => {
    if(!frame) return null
    if(!frame.getLabel){
        console.log("strange frame", frame)
        return null
    }
    if(frame.depth() == 0){
        //displayed in title pane
        if(frame.predicate == TerminusClient.UTILS.unshorten("rdfs:label") && frame.values.length == 1) return null
        if(frame.predicate == TerminusClient.UTILS.unshorten("rdfs:comment") && frame.values.length == 1) return null
    }

    const [redraw, setRedraw] = useState()
    const [rvals, setRvals] = useState()
    const [expansion, setExpansion] = useState(getInitialFrameExpansion(frame, view, types, docs))
    const [active, setActive] = useState(false)
    const toggleActive = () => setActive(!active) 
    const activeOn = () => setActive(true) 
    const activeOff = () => setActive(false) 
    const [highlighted, setHighlighted] = useState()
    const [vrows, setVRows] = useState()

    function addValue(){
        frame.addValueFrame(frame.createEmpty())
        setRvals(getPvals())
        setRedraw(redraw+1)
    }

    function onDelete(){
        setRvals(getPvals())
        setRedraw(redraw+1)
    }
    
    useEffect(() => {
        if(rvals){
            let rows = []
            for(var i = 0 ; i < rvals.length; i++){
                if(!((frame.predicate == TerminusClient.UTILS.unshorten("rdfs:label") || frame.predicate == TerminusClient.UTILS.unshorten("rdfs:comment")) && i == 0)){
                    let vframe = rvals[i]
                    addControlsToValueFrame(frame, vframe)
                    rows.push(
                        <ValueRenderer 
                            redraw={redraw} 
                            index={i} 
                            expansion={expansion} 
                            key={frame.predicate  + "_" + i}  
                            types={types} 
                            docs={docs}
                            frame={vframe} 
                            mode={mode}
                            onDelete={onDelete}
                            autosave={autosave}
                        />
                    )
                }
            }
            setVRows(rows)
        }
    }, [rvals])

    useEffect(() => setRvals(getPvals()), [frame, mode])

    useEffect(() => {
        if(frame){
            if(!frame.controls){
                frame.controls = {}
            }
            addFrameControl(frame, "expanded",expansion)
            addFrameControl(frame, "setExpanded", setExpansion)
            if(autosave && autosave.delete){
                let delprop = () => {
                    autosave.delete(frame, "Document deleted with wiki console")
                    .then((r) => {
                        frame.status = "deleted"
                        frame.parent.removeProperty(frame.predicate)
                        if(onDelete) onDelete()
                    })
                    .catch((e) => {
                        frame.status = "error"
                        setStatus(frame.status)
                        console.log(e)
                    })
                }
                addFrameControl(frame, "delete", delprop)    
            }
            if(autosave && autosave.save){
                let upddoc = () => {
                    autosave.save(frame, "Document updated with wiki console")
                    .then((r) => {
                        frame.status = "success"
                    })
                    .catch((e) => {
                        frame.status = "error"
                        setStatus(frame.status)
                        console.log(e)
                    })
                }
                addFrameControl(frame, "update", upddoc)    
            }
            addFrameControl(frame, "addValue", addValue)    
            addFrameControl(frame, "highlighted", highlighted)    
            addFrameControl(frame, "setHighlighted", setHighlighted)
        }
    }, [frame])

    if(!rvals || !rvals.length) return null


    const toggleExpanded = () => {
        if(expansion == 'compressed'){
            setExpansion(getInitialFrameExpansion(frame, view, types, docs))
        }
        else {
            setExpansion('compressed')
        }
    }  


    const deleteValue = (val, index) => {
        frame.removeValue(val)
        setRvals(getPvals())
        setRedraw(redraw+1)
    }

    function getPvals(){
        let vals = []
        const isDup = (val) => {
            if(vals.indexOf(val) == -1){
                vals.push(val)
                return false
            }
            return true
        }
        let rvals = []
        for(var i = 0 ; i < frame.values.length; i++){
            if(!isDup(frame.values[i].get())){
                rvals.push(frame.values[i])
            }
        }
        return rvals
    }

    function addControlsToValueFrame(frame, vframe){
        if(!frame.controls) return
        if(!vframe.controls) vframe.controls = {}
        if(frame.controls.addProperty) vframe.controls.addProperty = frame.controls.addProperty
        if(frame.controls.addValue) vframe.controls.addValue = frame.controls.addValue
    }

    let wrapper_class = (highlighted ? "wiki-property-highlighted" : 
        (active ? "wiki-property-selected" : ""))


    return <div className={"wiki-property-wrapper " + wrapper_class} onMouseEnter={activeOn} onMouseLeave={activeOff}>
        <PropertyHeader 
            toggleExpanded={toggleExpanded} 
            active={active} 
            expansion={expansion} 
            frame={frame} 
            mode={mode} 
            types={types} 
            docs={docs} 
        />
        {expansion != "compressed" && 
            <>{vrows}</>
        }
    </div>
}

function getInitialFrameExpansion(frame, view, types, docs){
    if(!frame) return "list"
    let longs = ["xdd:json", "xdd:html", "xdd:coordinatePolyline", "xdd:coordinatePolygon"]
    let t = frame.range()
    if(frame.display_options && typeof frame.display_options.collapse != "undefined"){
        if(frame.display_options.collapse) return "compressed"
        return "list"
    }

    if(frame.isObject()) return "list"
    if(frame.values.length > 1){
        if(frame.display_options && typeof frame.display_options.args != "undefined"){
            if(frame.display_options && frame.display_options.args['block']) return "block-list"
        }
        if(longs.indexOf(TerminusClient.UTILS.shorten(t)) != -1) return "block-list"
        return "list"
    }
    else {
        if(frame.display_options && typeof frame.display_options.args != "undefined"){
            if(frame.display_options.args['block']) return "block"
        }
        //if(longs.indexOf(TerminusClient.UTILS.shorten(t)) == -1) return "compressed"
        return "block"
    }
}

export const PropertyHeader = ({frame, mode, types, docs, active, expansion, index}) => {
    const [localActive, setActive] = useState(false)
    const activate = () => setActive(true)
    const deactivate = () => setActive(false)
    let menus = <PropertyActions frame={frame} mode={mode} types={types} docs={docs} active={localActive}/>
    let navigation = <PropertyNavigation frame={frame} mode={mode} types={types} docs={docs} active={active} />
    let tindex = (expansion == "block-list" ? (index ? (index+1) : 1) : false)

    return <div className="wiki-property-header" onMouseEnter={activate} onMouseLeave={deactivate}>
        <WikiRow 
            menus={menus}
            navigation ={navigation}
            active={active}
            index={tindex}
            type="property"
        >
            <PropertyTitle frame={frame} mode={mode} expansion={expansion} types={types} docs={docs} index={tindex} />
            {expansion == "compressed" && 
                <PropertySummary frame={frame} mode={mode} expansion={expansion} types={types} docs={docs} />
            }
        </WikiRow>
    </div>
}

export const PropertyTitle = ({frame, mode, types, docs, expansion, index}) => {
    return <span className="wiki-property-title">
        {getHeaderTag(frame, expansion, index)}
    </span>
}

const getHeaderTag = (frame, compressed, index) => {
    let l = frame.depth() + 2
    let cname = (frame.isObject() || frame.isClassChoice() 
        ? "wiki-property-header wiki-propery-header-" + l 
        : "wiki-property-label wiki-propery-label-" + l) 
    let lab = frame.getLabel()
    let p = TerminusClient.UTILS.shorten(frame.predicate)
    if(frame.depth() == 0 && (p == "rdfs:label" || p == "rdfs:comment")){
        lab = "Alternative " + lab
    }
    if(index) lab += " (" + index + ")"
    let tit = p + " " + (frame.getComment() || "") 
    if(compressed) return <span title={tit} className={cname}>{lab}</span>
    return <div title={tit} className={cname}>{lab}</div>
}

export const PropertySummary = ({frame, mode, view, types, docs, toggleExpanded}) => {
    const [active, setActive] = useState(false)
    const toggleActive = () => { setActive(!active) }
    let sname = frame.getLabel() 
    let sample1, sample2
    if(frame.values.length > 0){
        sample1 = frame.values[0]
        if(frame.values.length > 1){
            sample2 = frame.values[1]
        }
    }
    return <span className="wiki-property-summary">
        <PropertyStats frame={frame} mode={mode} types={types} docs={docs}/>
        <span className="wiki-property-summary-tiles">
            <PropertySummarySample label={sname} value={sample1} value2={sample2}/>
        </span>
    </span>
}

export const PropertySummarySample = ({label, value, value2}) => {
    let x = value.get()
    let val = x ? shortenedText(x, 20) : ""
    if(value2){
        x = value2.get()
        if(x) val += ", " + shortenedText(x, 20)
    } 
    return <span className="wiki-summary-sample">
        <span className="wiki-summary-label">{label} </span>
        <span className="wiki-summary-value"> {val}</span>
    </span>
}

export const PropertyStats = ({frame, mode, types, docs}) => {
    let vals = frame.values.length;
    let sz = TerminusClient.UTILS.TypeHelper.formatBytes(JSON.stringify(frame.extract()).length)
    let vtitle = (vals == 1) ? "Value" : "Values"
    return <span className="wiki-property-stats">
        <span className='wiki-icon wiki-stats-icon wiki-values-icon' title={vtitle}>
           <AiOutlineBuild  className='wiki-ricon' /> {vals}
        </span>
        <span className='wiki-icon wiki-stats-icon wiki-size-icon' title={sz}>
            <AiFillBuild className='wiki-ricon'/> {sz}
        </span>
    </span>
}

export const PropertyActions = ({frame, mode, status, types, docs, active}) => {
    const [showMenu, setShowMenu] = useState(status=="loading")
    const toggleMenu = () => {
        if(status != "loading"){
            window.global_popup_lock = !showMenu
            setShowMenu(!showMenu)
            if(hasControl(frame, "setHighlighted")) frame.controls.setHighlighted(!showMenu)
        }
        else setShowMenu(false)
    }
    
    const addEntry = () => {
        if(frame.controls && frame.controls.addValue){
            frame.controls.addValue()
        }
    }

    let see_actions = (active && frame && (mode == "edit") && !window.global_popup_lock)
    return <span className="wiki-left-contents">
        {active && 
            <StatusIndicator type="object" status={status} />
        }
        {see_actions && <>
            <span className="wiki-left-icon" onClick={toggleMenu}><AiOutlineMenu /></span>
            <span className="wiki-left-icon" onClick={addEntry}><AiOutlinePlus /></span>
        </>}
        {showMenu  &&
            <PropertyActionMenu frame={frame} toggle={toggleMenu} types={types} docs={docs} />            
        }
    </span>
}


export const PropertyActionMenu = ({frame, toggle, types, docs}) => {   
    const what = frame.getLabel() 
    const getAction = (which) => {
        return function() {
            hasControl(frame, which)()
            toggle()
        }
    }
    return <OutsideClickHandler onOutsideClick={toggle} >  
        <div className="wiki-menu">
            {hasControl(frame, 'addValue') && 
                <>                    
                    <div className="wiki-menu-entry wiki-menu-add" onClick={getAction('addValue')}>
                        <AiOutlinePlus className='wiki-menu-icon'/> Add {what} value
                    </div>                  
                    <div className="wiki-menu-spacer"></div>
                </>
            }
            {hasControl(frame, 'delete') &&                    
                <div className="wiki-menu-entry wiki-menu-delete" onClick={getAction('delete')}>
                    <RiDeleteBin5Line className='wiki-menu-icon'/> Delete all {what} values
                </div>                  
            }
            {(hasControl(frame, 'addValue') || hasControl(frame, 'delete')) && 
                <div className="wiki-menu-spacer"></div>
            }
            {hasControl(frame, 'getViewSelector') &&                    
                <>
                    <div className="wiki-menu-selector wiki-menu-addparent">
                        {ViewChooser}
                    </div>
                    <div className="wiki-menu-spacer"></div>
                </>
            }
            {hasControl(frame, 'addProperty') &&                    
                <div className="wiki-menu-selector wiki-menu-addparent">
                        {hasControl(frame, 'addProperty')(toggle)}
                </div>
            }
        </div>
    </OutsideClickHandler>
}

export const PropertyNavigation = ({frame, expansion}) => {
    if(!(frame && frame.controls)) return null
    let toggle = () => {
        if(frame.controls.setCompressed){
            if(expansion != "compressed"){
                frame.controls.setCompressed("compressed")
            }
            else {
                frame.controls.setCompressed("block")
            }
        }
    } 
    return <span className="wiki-right-contents">
        {expansion != "compressed" &&  
            <span className="wiki-right-icon" onClick={toggle}><AiOutlineDown /></span>
        }
        {expansion == "compressed"  && 
            <span className="wiki-right-icon" onClick={toggle}><AiOutlineRight /></span>
        }
    </span>
}
    

