
import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap" //replace
import TerminusClient from '@terminusdb/terminusdb-client'
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineMenu, AiOutlinePlus, AiOutlineDown, AiOutlineCopy } from "react-icons/ai";
import { PropertyHeader } from "./PropertyRenderer"
import { DatatypeFrameRenderer } from "./DatatypeRenderer"
import { ChoiceRenderer } from "./ChoiceRenderer"
import { DocumentRenderer } from "./DocumentRenderer"
import { ObjectRenderer } from "./ObjectRenderer"
import OutsideClickHandler from 'react-outside-click-handler';
import {RiDeleteBin5Line} from "react-icons/ri"
import Select from "react-select"
import { FrameError, addFrameControl, getTypeStruct, getDocStruct, WikiRow, hasControl, 
    getMissingPropertySelector, getFilledPropertySelector, StatusIndicator, getDocLabel} from "./utils"
import { shortenedText } from '../table/CellRenderer';


export const ValueRenderer = ({expansion, redraw, index, frame, mode, types, docs, autosave, onDelete}) => {
    const [active, setActive] = useState(false)
    const [status, setStatus] = useState(frame.status)
    const toggleActive = () => setActive(!active) 
    const activeOn = () => setActive(true) 
    const activeOff = () => setActive(false) 
    const [highlighted, setHighlighted] = useState()

    
    useEffect(() => {
        if(frame){
            if(!frame.controls){
                frame.controls = {}
            }
            if(!frame.controls.expanded){
                //addFrameControl(frame, "expanded",expansion)
            }
            if(!frame.controls.setExpanded){
                //addFrameControl(frame, "setExpanded", setExpansion)
            }
            if(autosave && autosave.delete){
                let delval = () => {
                    autosave.delete(frame, "Document deleted with wiki console")
                    .then((r) => {
                        frame.parent.removeValue(frame.get(), frame.index)
                        frame.status = "deleted"
                        if(onDelete) onDelete()
                    })
                    .catch((e) => {
                        frame.status = "error"
                        setStatus(frame.status)
                        console.log(e)
                    })
                }
                addFrameControl(frame, "delete", delval)    
            }
            if(autosave && autosave.save && !frame.controls.save){
                let updval = (v, t, l) => {
                    setStatus("loading")
                    autosave.save(frame, "Value updated on console wiki", v, t, l)
                    .then((r) => {
                        frame.status = "success"
                        frame.set(v)
                        if(t) frame.range = t
                        if(l) frame.language = l
                        setStatus(frame.status)
                        setTimeout(() => {
                            if(frame.status == "success") {
                                frame.status = "ok"
                                setStatus(frame.status)
                            }
                        }, 300);
                    })
                    .catch((e) => {
                        frame.status = "error"
                        setStatus(frame.status)
                        console.log(e)
                    })
                }
                addFrameControl(frame, "update", updval)    
            }
            addFrameControl(frame, "highlighted", highlighted)    
            addFrameControl(frame, "setHighlighted", setHighlighted)
        }
    }, [frame])

    const updval = (v, t, l) => {
        frame.controls.update(v, t, l)
    }

    let ret = null
    if(frame.isObject()){
        return <ObjectRenderer 
            ping={redraw} 
            index={index} 
            expansion={expansion} 
            frame={frame} 
            mode={mode} 
            types={types} 
            docs={docs}
            autosave={autosave}
        /> 			
   }
   else if(frame.isChoice()){  
        ret = <ChoiceRenderer 
            redraw={redraw}  
            expansion={expansion} 
            onChange={updval} 
            index={index} 
            val={frame.get()} 
            frame={frame} 
            mode={mode} 
            types={types} 
            docs={docs} 
        />
    }
   else if(frame.isDocument()){
        ret = <DocumentRenderer 
            redraw={redraw} 
            expansion="tile" 
            index={index} 
            val={frame.get()} 
            frame={frame} 
            mode={mode} 
            onChange={updval} 
            types={types} 
            docs={docs}
        />
    }
    else if(frame.isData()){
        ret = <DatatypeFrameRenderer 
            redraw={redraw} 
            expansion={expansion} 
            frame={frame} 
            mode={mode} 
            types={types} 
            docs={docs}
        />
    }
    else {
        alert("Frame has no known type")
        ret = <span>no frame</span>
        console.log(frame)
    }
    let menus = <ValueActions frame={frame} mode={mode} types={types} docs={docs} active={active}/>
    let navigation = <ValueNavigation frame={frame} mode={mode} types={types} docs={docs} active={active} />
    let tindex = ((expansion != "block-list" && expansion != "block") ? (index ? (index+1) : 1) : false)

    if(expansion && expansion == "block-list" && index > 0){
        return <span className="property-block">
            <PropertyHeader index={index} expansion={expansion} frame={frame} mode={mode} view={view} types={types} docs={docs} />
            {ret}
        </span>
    }
    let row = <WikiRow 
        menus={menus}
        navigation ={navigation}
        active={active}
        index={tindex}
        type="value"
    >
        <>{ret}</>
    </WikiRow>

    let wrapper_class = (highlighted ? "wiki-value-highlighted" : 
    (active ? "wiki-value-selected" : 
    (frame.status == "new" ? "wiki-value-new" : "")))
    if(expansion == "compressed"){
        return <span className={"wiki-value-wrapper " + wrapper_class}  onMouseEnter={activeOn} onMouseLeave={activeOff}>
            {row}
        </span>
    }
    return <div className={"wiki-value-wrapper " + wrapper_class}  onMouseEnter={activeOn} onMouseLeave={activeOff}>
        {row}
    </div>

}


export const ValueActions = ({frame, mode, status, types, docs, active}) => {
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
        {showMenu && frame &&
            <ValueActionsMenu frame={frame} toggle={toggleMenu} types={types} docs={docs} />            
        }
    </span>
}


export const ValueActionsMenu = ({frame, toggle, types, docs}) => {   
    const what = frame.parent.getLabel() 
    const getAction = (which) => {
        return function() {
            hasControl(frame, which)()
            toggle()
        }
    }

    const ting = shortenedText(frame.get(), 12)
    return <OutsideClickHandler onOutsideClick={toggle} >  
        <div className="wiki-menu">
            {hasControl(frame, 'delete') &&                    
                <div className="wiki-menu-entry wiki-menu-delete" onClick={getAction('delete')}>
                    <RiDeleteBin5Line className='wiki-menu-icon'/> Delete {ting}
                </div>                  
            }
            {hasControl(frame, 'duplicate') &&                    
                <div className="wiki-menu-entry wiki-menu-duplicate" onClick={getAction('duplicate')}>
                    <AiOutlineCopy className='wiki-menu-icon'/> Clone {ting}
                </div>    
            }              
            {(hasControl(frame, 'duplicate') || hasControl(frame, 'delete')) && 
                <div className="wiki-menu-spacer"></div>
            }
            {hasControl(frame, 'addValue') && 
                <>                    
                    <div className="wiki-menu-entry wiki-menu-add" onClick={getAction('addValue')}>
                        <AiOutlinePlus className='wiki-menu-icon'/> Add {what}
                    </div>                  
                    <div className="wiki-menu-spacer"></div>
                </>
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
                        {getAction('addProperty')(toggle)}
                </div>
            }
        </div>
    </OutsideClickHandler>
}

export const ValueNavigation = ({frame, onCollapse, expansion}) => {
    if(!(frame && frame.controls)) return null
    let toggle = () => {
        onCollapse()
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
    
