import React, {useState} from "react"
import {Button} from "react-bootstrap"
import {FaPlus} from "react-icons/fa"
import {NewDatabaseModal} from "../components/NewDatabaseModal"
 
export const NewDataProduct = ({css}) => {
    const [showModal, setShowModal] = useState(false)
    
    function handleNew (evt) {
        evt.preventDefault()
        evt.stopPropagation()
        setShowModal(true)
    }

    return <React.Fragment>
        <Button id="new_data_product" variant="info" className={`btn-new-data-product btn ${css}`}   title="Create New Data Product" onClick={handleNew}>
            <FaPlus className="me-2"/> <label className="opacity-1 fw-bold">New Data Product</label>
        </Button>
        <NewDatabaseModal setShowModal={setShowModal} showModal={showModal}/>
    </React.Fragment>
}