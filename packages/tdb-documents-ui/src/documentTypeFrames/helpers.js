import React, {useEffect, useState} from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import {
    AiOutlineSearch, 
    AiOutlineClose, 
    AiFillDelete, 
    AiOutlineCheck,
    AiOutlineLink
} from "react-icons/ai"
import {BsInfoCircle} from "react-icons/bs"
import Stack from 'react-bootstrap/Stack';

// View mode 
export const DocumentView = ({props, onTraverse}) => {
    const [clicked, setClicked]=useState(false)


    useEffect(() => {
        if(!clicked.id) return
        if(onTraverse) onTraverse(clicked.id)
    }, [clicked.update])

    const handleClick = (e, val) => { // view if on traverse function defined
        setClicked({id: val, update: Date.now()})
    }

    let color = "text-light"
    //if (styles && styles.hasOwnProperty("mode") && styles["mode"]==="light") color="text-dark"

    if(!props.formData) return <div/>
 
    return <div className="mb-4 d-flex">
        {<div className="control-label">
            {props.name}
        </div>}
        {/*<div className="ms-auto">{description} </div>*/}
        <span onClick={(e) => handleClick(e, props.formData)} className={`tdb__span__select ${color} text-break`}>
            {props.formData}
        </span>
    </div>
}

// description to link an existing document 
export function getLinkExistingDescription (frame, item) {
    let linked = frame[item]
    return  <div>
        <Stack direction="horizontal" gap={2} className="fw-bold">
            {/*<BsInfoCircle className="text-warning h6"/>*/}
            <small className="fst-italic text-muted">
                {`Link an existing document to property ${item}. Use the above select option to `}
                {`either link an existing ${linked} or create a new ${linked}`}
            </small>
        </Stack>
        {getLinkedDescription (linked)}
    </div>
}

// description field used only in CREATE Mode
export function getCreateDescription (frame, item) {
    let linked = frame[item]
    return  <div>
        <Stack direction="horizontal" gap={2} className="fw-bold">
            {/*<BsInfoCircle className="text-warning h6"/>*/}
            <small className="fst-italic text-muted">
                {`Create new document and link to property ${item}. Use the above select option to `}
                {`Use the select option above to either link an existing  ${linked} or create a new ${linked}`}
            </small>
        </Stack>
        {getLinkedDescription (linked)}
    </div>
}

// description field used only in EDIT or VIEW Mode
export function getLinkedDescription (linked) {
    return  <Stack direction="horizontal" gap={2} className="fw-bold">
        <AiOutlineLink className="text-warning h6"/>
        <small className="fst-italic text-muted">
            {`Linked to document: `}
            <span className="text-warning fw-bold">{linked}</span>
        </small>
    </Stack>
}

// checks if @unfoldable is false if there is filled data in EDIT Mode only
function fetchSelected (props) {
    if(typeof props.formData=== CONST.STRING_TYPE && 
        props.formData) return {id: props.formData, label: props.formData}
    return false
}
 
// displays Search Component
const DocumentSearch = ({display, setSelected, linked, showSearch, setShowSearch, mode}) => {

    // if mode is in View dont display Document Search Component
    if(mode === CONST.VIEW) return <div/>
    
    // display is not provided for VIEW MODE
    if(!display) return <div/>

    const displayComponent = React.cloneElement(display, { setSelected: setSelected, doctype: linked })

    function handleClose(e) {
        // closes search component from UI 
        setShowSearch(false)
    }
    
    function handleDisplay(e) {
        // displays search component in UI 
        setShowSearch(Date.now())
    }

    return <div className="p-2 w-100">
        <small className="fst-italic text-muted">
            {`Click on the button to search for an existing ${linked}`}
        </small>
        <Button className="btn btn-sm bg-light text-dark float-right" 
            title={`Click here to search for an existing ${linked}`}
            style={{float: "right"}}
            onClick={handleDisplay}>
                <AiOutlineSearch className="mr-1"/> 
                <>{`Link to an existing ${linked}`}</>
        </Button>
        {showSearch && <div className="mt-3 w-100 d-block p-2">
            <Button className="btn btn-sm bg-light text-dark float-right" 
                title="Close"
                style={{float: "right"}}
                onClick={handleClose}>
                    <AiOutlineClose/> 
            </Button>
            {displayComponent}
        </div>}
    </div>

}

// returns selected label if id not available from select component
function fetchSelectedLabel (selected) {
    if(!selected) return false
    if(selected.label) return selected.label
    return selected.id
}

// displays selected existing Link & displays search component
export function displaySearchComponent(props, onSelect, linked, mode) { 
    const [selected, setSelected] = useState(fetchSelected(props))
    const [showSearch, setShowSearch]=useState(false)


    useEffect (() => {
        if(selected && props.onChange) {
            props.onChange(selected.id)
            setSelected(selected)
            setShowSearch(false)
        }
    }, [selected])

    //let label = fetchSelectedLabel(selected)


    const Selected = ({selected, mode}) => {
        if(!selected) return <div/>

        function handleDelete() {
            setSelected(false)
            props.onChange("")
        }

        if(mode === CONST.VIEW) {
            return <div className="w-100 d-flex justify-content-end">
                <AiOutlineCheck className="text-success mr-1 mt-1"/>
                <label className="text-break">{selected.label ? selected.label : selected.id} </label>  
            </div>
        }


        return <div className="w-100 d-flex justify-content-end">
            <small className="fst-italic fw-bold text-warning mt-1">
                {`Selected:  `}
            </small>
            <AiOutlineCheck className="text-success mr-1 mt-1"/>
            <label className="text-break">{selected.label ? selected.label : selected.id} </label>
            <Button className="btn btn-sm bg-transparent border-0" 
                title="Delete"
                onClick={handleDelete}>
                    <AiFillDelete className="text-danger"/> 
            </Button>
        </div>
    }

    return <Card className="w-100 bg-secondary border border-dark">
        <DocumentSearch display={onSelect} 
            setSelected={setSelected} 
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            mode={mode}
            property={props.name}
            linked={linked}/>
        {selected && <Selected selected={selected} mode={mode}/>}
    </Card>
}

export function linkedDocumentProvider () {}