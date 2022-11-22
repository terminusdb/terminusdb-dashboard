import React, {useState, useEffect} from "react"
import {Form} from "react-bootstrap"
import AsyncSelect from 'react-select/async'
import Button from 'react-bootstrap/Button'
import {BsSearch} from "react-icons/bs"
import { propsWithBsClassName } from "react-bootstrap-typeahead/types/utils"
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import {AiFillDelete, AiOutlineCheck} from "react-icons/ai"

// filled Select - view mode 
export const FilledDocumentViewSelect = ({label, defaultValue, required, onTraverse, styles, description}) => {
    const [clicked, setClicked]=useState(false)

        useEffect(() => {
            //console.log("clicked", clicked)
            if(!clicked) return
            if(onTraverse) onTraverse(clicked)
        }, [clicked])

        const handleClick = (e, val) => { // view if on traverse function defined
            setClicked(val)
        }

        let color = "text-light"
        
        if (styles.hasOwnProperty("mode") && styles["mode"]==="light") color="text-dark"

        return <React.Fragment>
            <div className="ms-auto">{description} </div>
            <span onClick={(e) => handleClick(e, defaultValue)} className={`tdb__span__select ${color}`}>
                {defaultValue}
            </span>
        </React.Fragment>
} 

// empty Select - edit mode
export const EmptyDocumentSelect = ({label, required, styles, placeholder, value, onChange, loadOptions, handleInputChange, description}) => {

    return <React.Fragment>
        <span data-cy={`test_cy_${label}`}>
            <label className="control-label" htmlFor={`root_${label}`}>
                <span >{label}</span>
                {required && <span className="required">*</span>}
            </label>
            <div className="ms-auto">{description} </div>
            {value && <AsyncSelect
                    classNames="tdb__input"
                    styles={styles}
                    value={value}
                    onChange={onChange}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
            />}
            {!value && <AsyncSelect
                    classNames="tdb__input"
                    styles={styles}
                    placeholder={placeholder}
                    onChange={onChange}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
            />}
        </span>
    </React.Fragment>
}

// filled Select - edit mode
export const FilledDocumentSelect = ({label, styles, placeholder, defaultValue, onChange, loadOptions, handleInputChange, description}) => {
   
    return <React.Fragment> 
        <span data-cy={`test_cy_${label}`}>
            <div className="ms-auto">{description} </div>
            <AsyncSelect
                cacheOptions
                classNames="tdb__input"
                styles={styles}
                placeholder={placeholder}
                onChange={onChange}
                loadOptions={loadOptions}
                defaultOptions
                defaultValue={{value: defaultValue, label: defaultValue}}
                onInputChange={handleInputChange}
            />
        </span>
    </React.Fragment>
}


// empty Select - edit mode
export const DocumentSearch = ({label, onChange, value, required, linked_to, display, description}) => {

    console.log("DocumentSearch",  linked_to)

    // modal constants
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // selected ID constants
    const [selected, setSelected]=useState(value ? value : false)

    // pass props 
    const displayComponent = React.cloneElement(display, { setSelected: setSelected, doctype: linked_to})

    useEffect(() => {
        if(selected && onChange) onChange(selected)
    }, [selected])

    function handleClear(e) { 
        setSelected(false)
    }


    return <React.Fragment>
        <span data-cy={`test_cy_${label}`}>
            <label className="control-label" htmlFor={`root_${label}`}>
                <span >{label}</span>
                {required && <span className="required">*</span>}
            </label>
            <div className="ms-auto">{description} </div>
        </span>
        <Stack direction="horizontal" gap={3}>
            <div className="text-muted">
                {linked_to && <small>{`Click on Search to link ${linked_to}`}</small>}
            </div>
            <div className="ms-auto">
                <Button className="btn btn-sm bg-light text-dark"
                    title={`Click here to search for a ${linked_to}`}
                    onClick={handleShow}>
                    <BsSearch/> {label}
                </Button>
            </div>
        </Stack>
        {selected && selected.original && <>
            <AiOutlineCheck className="text-success mr-2"/>
            <small>{"Selected: "}</small>
            <div className="d-flex tdb__input">
                <label className="text-decoration-underline">{selected.original.id}</label>
                {!required && <Button className="btn btn-sm bg-transparent border-0 text-danger"
                        title={`Click here to search for a ${linked_to}`}
                        onClick={handleClear}>
                    <AiFillDelete className="h6"/> 
                </Button>}
            </div>
        </>}
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


