import React from "react"
import Button from "react-bootstrap/Button"
import {FaTimes} from "react-icons/fa"
/**
 * 
 * @param {*} type document Type
 * @returns a close button icon
 */
export const CloseButton = ({type , onClick}) => { 
    // on close button display document list table
    return <Button variant="light"  className="btn-sm text-dark"  title={`Cancel and view list of ${type}`}
                onClick={onClick}>
                <FaTimes/>
            </Button>
}
