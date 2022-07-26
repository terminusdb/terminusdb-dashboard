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

                <Button id="new_data_product" variant="info" className={`btn-new-data-product mr-1 pt-2 pb-2 pr-4 pl-4 btn ${css}`}   title="Create New Data Product" onClick={handleNew}>
                    <FaPlus className="me-2"/>New Data Product
                </Button>
                <NewDatabaseModal setShowModal={setShowModal} showModal={showModal}/>
           </React.Fragment>
}