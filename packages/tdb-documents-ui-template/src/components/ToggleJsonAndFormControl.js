
import React from "react"
import {VscJson} from "react-icons/vsc"
import {BiTable} from "react-icons/bi"
import {Button, ButtonGroup} from "react-bootstrap"
import { JSON_VIEW, FORM_VIEW } from "./constants"

export const ToggleJsonAndFormControl = ({onClick}) => {
    return <ButtonGroup aria-label="json_form_toggle" className="text-nowrap float-right">
        <Button variant="light"  type="button" title="Form View" onClick={(e) => onClick(FORM_VIEW)} className="btn-sm btn d-flex text-dark">
            <BiTable className="m-1"/>
            FORM
        </Button>
        <Button variant="light"  type="button" title="JSON View" onClick={(e) => onClick(JSON_VIEW)} className="btn-sm btn d-flex text-dark">
            <VscJson className="m-1"/>
            JSON
        </Button>
    </ButtonGroup>
    
}