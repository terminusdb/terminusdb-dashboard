import React, {useState, useEffect} from "react"
import AsyncSelect from 'react-select/async'
import Button from 'react-bootstrap/Button'
import {BsSearch} from "react-icons/bs"
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import {AiFillDelete, AiOutlineCheck} from "react-icons/ai"

// Select - create/ edit mode
export const DocumentSelect = ({label, required, styles, placeholder, value, onChange, loadOptions, handleInputChange, description}) => {
    
    //console.log("loadOptions", loadOptions)

    return <React.Fragment>
        <div data-cy={`test_cy_${label}`} className="w-100 d-flex">
            <label className="control-label mr-3" htmlFor={`root_${label}`}>
                <span >{label}</span>
                {/*required && <span className="required">*</span>*/}
            </label>
            {/*description && <div className="ms-auto">{description} </div>*/}
            <div style={{width: "100%"}}>
                {value && <AsyncSelect
                        classNames="tdb__input w-100"
                        styles={styles}
                        value={value}
                        onChange={onChange}
                        loadOptions={loadOptions}
                        onInputChange={handleInputChange}
                />}
                {!value && <AsyncSelect
                        classNames="tdb__input w-100"
                        styles={styles}
                        placeholder={placeholder}
                        onChange={onChange}
                        loadOptions={loadOptions}
                        onInputChange={handleInputChange}
                />}
            </div>
        </div>
    </React.Fragment>
}

// View mode
export const DocumentView = ({label, required, value, onTraverse, description, styles}) => {
    const [clicked, setClicked]=useState(false)

    useEffect(() => {
        if(!clicked) return
        if(onTraverse) onTraverse(clicked)
    }, [clicked])

    const handleClick = (e, val) => { // view if on traverse function defined
        setClicked(val)
    }

    let color = "text-light"
    
    if (styles.hasOwnProperty("mode") && styles["mode"]==="light") color="text-dark"

    if(!value) return <div/>
 
    return <React.Fragment>
        {/*<div className="control-label">
            {label}
            {/*required && <span className="required">*</span>*//*}
        </div>*/}
        {/*<div className="ms-auto">{description} </div>*/}
        <span onClick={(e) => handleClick(e, value)} className={`tdb__span__select ${color} text-break`}>
            {value}
        </span>
    </React.Fragment>
}

/**
 * @returns display field ui
 */
const DisplayField = ({label, description, linked_to, required, handleShow}) => {
    return <React.Fragment>
        <Stack direction="horizontal" gap={3} className="w-100">
            <div data-cy={`test_cy_${label}`}>
                <label className="control-label" htmlFor={`root_${label}`}>
                    <span >{label}</span>
                    {/*required && <span className="required">*</span>*/}
                </label>
                <div className="ms-auto">{description} </div>
            </div>
            <div className="text-muted ms-auto fst-italic">
                {linked_to && <small>{`Click on ${label} button to search for ${linked_to}`}</small>}
            </div>
            <div>
                <Button className="btn btn-sm bg-light text-dark"
                    title={`Click here to search for a ${linked_to}`}
                    onClick={handleShow}>
                    <BsSearch/> {label}
                </Button>
            </div>
        </Stack>
    </React.Fragment>
}

/**
 * @returns displays selected document to link
 */
const DisplaySelectedDocument = ({selected, required, linked_to, handleClear}) => {
    return <Stack direction="horizontal" gap={1}>
        {selected && selected.hasOwnProperty("id") && selected.id && <>
            <AiOutlineCheck className="text-success mr-2"/>
            <label className="text-muted fw-bold">{"Selected: "}</label>
            <div className="d-flex tdb__input">
                <label className="text-decoration-underline text-break">{selected.label ? selected.label : selected.id}</label>
                {!required && <Button className="btn btn-sm bg-transparent border-0 text-danger"
                        title={`Click here to search for a ${linked_to}`}
                        onClick={handleClear}>
                    <AiFillDelete className="h6"/> 
                </Button>}
            </div>
        </>}
    </Stack>
}

// empty Select - edit mode
export const DocumentSearch = ({label, onChange, value, required, linked_to, display, description}) => {
 
    // modal constants
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // selected ID constants
    const [selected, setSelected]=useState(value ? value : false)

    // pass props 
    const displayComponent = React.cloneElement(display, { setSelected: setSelected, doctype: linked_to})

    useEffect(() => {
        if(selected && selected.hasOwnProperty("id") && onChange) {
            //console.log("selected", selected)
            onChange(selected.id)
            setShow(false)
        }
    }, [selected])

    function handleClear(e) { 
        setSelected(false)
    }

    return <React.Fragment>
        <Stack gap={1}>
            <DisplayField label={label} 
                description={description} 
                linked_to={linked_to} 
                required={required} 
                handleShow={handleShow}/>
            <DisplaySelectedDocument selected={selected} 
                linked_to={linked_to} 
                required={required} 
                handleClear={handleClear}/>
        </Stack>
        <Modal centered 
            show={show} 
            dialogClassName="modal-90w"
            onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                {linked_to && <Modal.Title className="text-success h6">{`Search for ${linked_to}`}</Modal.Title>}
            </Modal.Header>
            <Modal.Body className="overflow-auto">
                {displayComponent}
            </Modal.Body>
        </Modal>
    </React.Fragment>
}