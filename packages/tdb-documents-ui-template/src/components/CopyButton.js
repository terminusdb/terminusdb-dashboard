import React from "react"
import Button from "react-bootstrap/Button"
import {FiCopy} from "react-icons/fi"
import { copyToClipboard } from "../utils"

/**
 * 
 * @param {*} id document ID 
 * @returns copy document ID to clipboard
 */
export const CopyButton = ({text, title, label, css}) => {
    return <Button variant="transparent" 
        className={`text-light ${css}`}
        title={title}
        onClick={(e) => copyToClipboard(text)}>
            <FiCopy className='mb-1'/> {label && <span>{label}</span>}
    </Button>
}