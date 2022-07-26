import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import { ObjectRenderer, ObjectTitle, ObjectSummary } from "./ObjectRenderer"
import { DatatypeFrameRenderer } from "./DatatypeRenderer"
import OutsideClickHandler from 'react-outside-click-handler';
import {RiDeleteBin5Line} from "react-icons/ri"
import { addFrameControl, getTypeStruct, getDocStruct, WikiRow, hasControl, 
    getMissingPropertySelector, getFilledPropertySelector, StatusIndicator, getDocLabel, getDocIDLabel } from "./utils"
import { AiOutlineMenu, AiOutlinePlus, AiOutlineDown, AiOutlineRight, AiOutlineSave  } from "react-icons/ai";


export const DocumentRenderer = ({val, onDelete, mode, frame, expansion, index, view, types, docs, client, autosave}) => {
    if(!frame) return null
    const [highlighted, setHighlighted] = useState(false)
    const [redraw, setRedraw] = useState(1)
    const [compressed, setCompressed] = useState(expansion)

    const flash = () => {
        addFrameControl(frame, "addProperty", addFrameProperty)
        setRedraw(redraw+1)
    }

    const addFrameProperty = (onChange) => {
        const getAddProp = (val) => {
            if(val){
                if(onChange) onChange()                        
                frame.addProperty(val)
                console.log("added " + val)
                setRedraw(redraw+1)                    
            }
            else {
                console.log("empty property add")
            }
        }
        let txt = getDocLabel(frame, types, docs)
        txt = "Add property to " + txt
        return getMissingPropertySelector(frame, getAddProp, txt)
    }  
    addFrameControl(frame, "highlighted", highlighted)    
    addFrameControl(frame, "setHighlighted", setHighlighted)
    addFrameControl(frame, "compressed", compressed)    
    addFrameControl(frame, "setCompressed", setCompressed)
    addFrameControl(frame, "addProperty", addFrameProperty)
    if(autosave && autosave.delete){
        let deldoc = () => {
            autosave.delete(frame, "Document deleted with wiki console")
            .then((r) => {
                frame.status = "deleted"
                if(onDelete) onDelete()
            })
            .catch((e) => {
                tframe.status = "error"
                setStatus(tframe.status)
                console.log("delete error", e)
            })
        }
        addFrameControl(frame, "delete", deldoc)    
    }

    if(compressed=="tile") return <DocumentTile val={val} frame={frame} mode={mode} types={types} docs={docs} />
    return <ObjectRenderer compressed={compressed} document={true} frame={frame} ping={redraw} mode={mode} types={types} docs={docs} autosave={autosave} />
    let docls = (highlighted ? " wiki-document-highlighted" : "")
    return <div className={"wiki-document" + docls} >
        <span className="wiki-document-errors">
        </span>
        {compressed != "compressed" && 
            <span className="wiki-document-headers">
                <DocumentTitle onUpdate={flash} frame={frame} mode={mode} types={types} docs={docs} autosave={autosave}/>
                <DocumentDescription onUpdate={flash} frame={frame} mode={mode} types={types} docs={docs} autosave={autosave}/>
            </span>
        }
        <ObjectRenderer compressed={compressed} frame={frame} ping={redraw} mode={mode} types={types} docs={docs} autosave={autosave} />
    </div>            
} 

export const DocumentTile = ({val, frame, mode, view, types, docs, autosave}) => {
    let lab = getDocIDLabel(val, docs)
    return <span>{lab}</span>
}


export const DocumentTitle = ({frame, mode, adVal, types, docs, autosave}) => {
    if(!frame) return null
    const [active, setActive] = useState(false)
    const [status, setStatus] = useState(frame.status)
    const activate = () => setActive(true)
    const deactivate = () => setActive(false)
    const [titleProp, setTitleProp] = useState(getFrameTitleProp(frame, "label"))
    useEffect(() => {
        if(titleProp){
            copyDocumentControls(titleProp, frame, adVal, updateTitle(titleProp), deleteTitle(titleProp))
            if(frame.controls && frame.controls.compressed){
                addFrameControl(titleProp, "compressed", frame.controls.compressed)
            }
            if(frame.controls && frame.controls.setCompressed){
                addFrameControl(titleProp, "setCompressed", frame.controls.setCompressed)
            }
        
        }
    }, [titleProp])

    const updateTitle = (tframe) => {
        return function(v, t, l){
            if(autosave && autosave.save && v !== ""){
                setStatus("loading")
                autosave.save(tframe, "Title updated on console wiki", v, t, l)
                .then((r) => {
                    tframe.status = "success"
                    tframe.set(v)
                    if(t) tframe.range = t
                    if(l) tframe.language = l
                   
                    setStatus(tframe.status)
                    setTimeout(() => {
                        if(tframe.status == "success") {
                            tframe.status = "ok"
                            setStatus(tframe.status)
                        }
                    }, 300);
                })
                .catch((e) => {
                    tframe.status = "error"
                    setStatus(tframe.status)
                    console.log("Update error", e)
                })
            }
            else {
                console.log("no save", tframe)
            }
        }
    }

    const deleteTitle = (tframe) => {
        return function(){
            setTitleProp()
            if(autosave && autosave.delete){
                setStatus("loading")
                autosave.delete(tframe, "Title deleted with console wiki")
                .then((r) => {
                    tframe.status = "deleted"
                    setStatus(tframe.status)
                    frame.removePropertyValue("rdfs:label", tframe.get(), tframe.index)
                    setTitleProp(getFrameTitleProp(frame, "label"))
                })
                .catch((e) => {
                    tframe.status = "error"
                    setStatus(tframe.status)
                    console.log("Delete error", e)
                })
            }
            else {
                console.log("no save", tframe)
            }
        }
    }

    if(!titleProp) return null


    const getPlaceHolder = () => {
        let tstruct = getTypeStruct(frame.cls, types)
        return "Enter " + tstruct.label + " Title"
    }

    let menus = <DocumentActions active={active} frame={titleProp} mode={mode} status={status} type="label" types={types} docs={docs} />
    let navigation = <DocumentNavigation active={active} frame={titleProp} status={status} mode={mode} types={types} docs={docs} type="label"/>
    if(!titleProp.display_options) titleProp.display_options = {}
    if(!titleProp.display_options.placeholder) titleProp.display_options.placeholder = getPlaceHolder()

    return <div className="wiki-document-title" onMouseEnter={activate} onMouseLeave={deactivate}>
        <WikiRow 
            menus={menus}
            navigation ={navigation}
            active={active}
            type="object"
        >
            <span className="wiki-title">
                <DatatypeFrameRenderer frame={titleProp} mode={mode} types={types} docs={docs}/>
            </span>        
        </WikiRow>
    </div>
}

function copyDocumentControls(propframe, docframe, addValue, update, ddelete ){
    if(addValue) addFrameControl(propframe, "addValue", addValue)
    if(update) addFrameControl(propframe, "update", update)
    if(ddelete) addFrameControl(propframe, "delete", ddelete)
    if(docframe.controls && docframe.controls.delete){
        addFrameControl(propframe, "deleteDocument", docframe.controls.delete)
    }
    if(docframe.controls && docframe.controls.duplicate){
        addFrameControl(propframe, "duplicateDocument", docframe.controls.duplicate)
    }
    if(docframe.controls && docframe.controls.highlighted){
        addFrameControl(propframe, "highlighted", docframe.controls.highlighted)
    }
    if(docframe.controls && docframe.controls.setHighlighted){
        addFrameControl(propframe, "setHighlighted", docframe.controls.setHighlighted)
    }
    if(docframe.controls && docframe.controls.addProperty){
        addFrameControl(propframe, "addProperty", docframe.controls.addProperty)
    }
}

export const DocumentDescription = ({frame, mode, adVal, types, docs, autosave}) => {
    if(!frame) return null
    const [active, setActive] = useState(false)
    const [status, setStatus] = useState(frame.status)
    const activate = () => setActive(true)
    const deactivate = () => setActive(false)
    const [titleProp, setTitleProp] = useState(getFrameTitleProp(frame, "description"))
    useEffect(() => {
        if(titleProp){
            copyDocumentControls(titleProp, frame, adVal, updateDesc(titleProp), deleteDesc(titleProp))
            if(frame.controls && frame.controls.compressed){
                addFrameControl(titleProp, "compressed", frame.controls.compressed)
            }
            if(frame.controls && frame.controls.setCompressed){
                addFrameControl(titleProp, "setCompressed", frame.controls.setCompressed)
            }
        
        }
    }, [titleProp])

    const updateDesc = (tframe) => {
        return function(v, t, l) {
            if(autosave && autosave.save){
                setStatus("loading")
                autosave.save(tframe, "Description updated on console wiki", v, t, l)
                .then((r) => {
                    tframe.status = "success"
                    setStatus(tframe.status)
                    tframe.set(v)
                    if(t) tframe.range = t
                    if(l) tframe.language = l                   
                    setTimeout(() => {
                        if(tframe.status == "success") {
                            tframe.status = "ok"
                            setStatus(tframe.status)
                        }
                    }, 300);
                })
                .catch((e) => {console.log(e)})
            }
            else {
                console.log("no autosave", tframe)
            }
        }
    }

    const deleteDesc = (tframe) => {
        return function(){
            if(autosave && autosave.delete){
                setStatus("loading")
                autosave.delete(tframe, "Description deleted with console wiki")
                .then((r) => {
                    frame.removePropertyValue("rdfs:label", tframe.get(), tframe.index)
                    tframe.status = "deleted"
                    setStatus(tframe.status)
                })
                .catch((e) => {
                    tframe.status = "error"
                    setStatus(tframe.status)
                    console.log("Delete Error", e)
                })
            }
            else {
                console.log("no save", tframe)
            }
        }
    }
    
    const getPlaceHolder = () => {
        let tlab = getDocLabel(frame, types, docs)
        return "Enter " + tlab + " Description"
    }
    if(!titleProp) return null
    let menus = <DocumentActions active={active} frame={titleProp} mode={mode} types={types} docs={docs} status={status} type="description" />
    let navigation = <DocumentNavigation active={active} frame={titleProp} types={types} docs={docs} status={status} mode={mode} type="description"/>
    if(!titleProp.display_options) titleProp.display_options = {}
    if(!titleProp.display_options.placeholder) titleProp.display_options.placeholder = getPlaceHolder()

    return <div className="wiki-document-description" onMouseEnter={activate} onMouseLeave={deactivate}>
        <WikiRow 
            menus={menus}
            navigation ={navigation}
            active={active}
            type="object"
        >
            <span className="wiki-description">
                <DatatypeFrameRenderer frame={titleProp} mode={mode} types={types} docs={docs} />
            </span>        
        </WikiRow>
    </div>
}

export const DocumentActions = ({frame, mode, type, status, types, docs, active}) => {
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
        <span className="wiki-dummy-icon"></span>
        {active &&  
            <StatusIndicator type="data" status={status} />
        }
        {see_actions && <>
            <span className="wiki-left-icon" onClick={toggleMenu}><AiOutlineMenu /></span>
            <span className="wiki-left-icon" onClick={addEntry}><AiOutlinePlus /></span>
        </>}
        {showMenu &&
            <DocumentActionMenu frame={frame} type={type} toggle={toggleMenu} types={types} docs={docs} />            
        }
    </span>
}

export const DocumentActionMenu = ({frame, toggle, type, types, docs}) => {
    
    const what = frame.getLabel() || type
    const docname = getDocLabel(frame.parent.parent, types, docs)
    const getAction = (which) => {
        return function() {
            hasControl(frame, which)()
            toggle()
        }
    }
    
    return <OutsideClickHandler onOutsideClick={toggle} >  
        <div className="wiki-menu">
            {hasControl(frame, 'deleteDocument') &&                    
                <div className="wiki-menu-entry wiki-menu-delete" onClick={getAction('deleteDocument')}>
                    <RiDeleteBin5Line className='wiki-menu-icon'/> Delete {docname}
                </div>                  
            }
            {hasControl(frame, 'duplicateDocument') &&                    
                <div className="wiki-menu-entry wiki-menu-delete" onClick={getAction('duplicateDocument')}>
                    <AiOutlineCopy className='wiki-menu-icon'/> Clone {docname}
                </div>                  
            }
            {(hasControl(frame, 'duplicateDocument') || hasControl(frame, 'deleteDocument')) && 
                <div className="wiki-menu-spacer"></div>
            }
            {hasControl(frame, 'delete') &&                    
                <div className="wiki-menu-entry wiki-menu-delete" onClick={getAction('delete')}>
                    <RiDeleteBin5Line className='wiki-menu-icon'/> Delete {what}
                </div>                  
            }
            {hasControl(frame, 'duplicate') &&                    
                <div className="wiki-menu-entry wiki-menu-duplicate" onClick={getAction('duplicate')}>
                    <AiOutlineCopy className='wiki-menu-icon'/> Clone {what}
                </div>    
            }              
            {(hasControl(frame, 'duplicate') || hasControl(frame, 'delete')) && 
                <div className="wiki-menu-spacer"></div>
            }
            {hasControl(frame, 'addValue') && 
                <>                    
                    <div className="wiki-menu-entry wiki-menu-add" onClick={getAction('addValue')}>
                        <AiOutlinePlus className='wiki-menu-icon'/> Add Alternative {what}
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
                        {getAction('addProperty')()}
                </div>
            }
        </div>
    </OutsideClickHandler>
}

export const DocumentNavigation = ({frame, mode, view, types, active}) => {
    if(!(frame && frame.controls)) return null
    const [compressed, setCompressed] = useState(frame.controls.compressed || "block")
    let toggle = () => {
        if(compressed != "compressed"){
            frame.controls.setCompressed("compressed")
            setCompressed("compressed")
        }
        else {
            frame.controls.setCompressed("block")
            setCompressed("block")
        }
    } 
    return <span className="wiki-right-contents">
        {compressed != "compressed" &&  
            <span className="wiki-right-icon" onClick={toggle}><AiOutlineDown /></span>
        }
        {compressed == "compressed"  && 
            <span className="wiki-right-icon" onClick={toggle}><AiOutlineRight /></span>
        }
    </span>
}


function getFrameTitleProp(frame, which){
    let tag = (which == "label" ? "rdfs:label" : "rdfs:comment")
    
    let prop = frame.properties[tag] || frame.properties[TerminusClient.UTILS.unshorten(tag)]
    if(!prop) prop = frame.addProperty(tag)
    let vprop = prop ? prop.values[0] : false
    return vprop
}
