import React, {useState} from "react"
import {Button} from "react-bootstrap"
import {RiUser3Fill} from "react-icons/ri"
import { LoginModal } from "./LoginModal";

export const ChangeUser = ({css, label, showModalDefault, isClosable=true}) => {
    const [showModal, setShowModal] = useState(showModalDefault || false)

    function handleNew (evt) {
        setShowModal(true)
    }

    const extracss = css || ""

    const labelStr = label || "Change User"

    return <React.Fragment>
               {!isClosable && <Button id="new_data_product" variant="info" className={`mr-1 ml-1 pt-2 pb-2 pr-4 pl-4 btn ${extracss}`}   title="Create New Data Product" onClick={handleNew}>
                    <RiUser3Fill className="me-2"/>{labelStr}
                </Button>}
                <LoginModal setShowModal={setShowModal} showModal={showModal} isClosable/>
            </React.Fragment>
}