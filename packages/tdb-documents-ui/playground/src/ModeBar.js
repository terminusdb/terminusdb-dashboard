import React, {useState} from "react"
import Stack from 'react-bootstrap/Stack'
import {CREATE, EDIT, VIEW, MODE_HELP_TEXT} from "./constants"
import {InitObj} from "./init"
import {DIFF_VIEWER} from "./menu.constants"

export const ModeBar = () => {

    const [checked, setChecked]=useState(CREATE)
    const {
		mode,
        setMode,
        setData,
        menuItem
	} = InitObj()

    if(menuItem === DIFF_VIEWER) {
        return <div/>
    }

    function handleChange (event) {
        setChecked(event.target.value)
        setData({})
        setMode(event.target.value) 
    }

    return <div className="mb-2">
        <Stack direction="horizontal" gap={3} >
            <div>
                <label>
                    <input
                        type="radio"
                        name="letter"
                        data-cy="create_mode"
                        value={CREATE}
                        checked={checked === CREATE}
                        onChange={handleChange}
                    />{" "}
                    {CREATE}
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="letter"
                        value={EDIT}
                        data-cy="edit_mode"
                        checked={checked === EDIT}
                        onChange={handleChange}
                    />{" "}
                    {EDIT}
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="letter"
                        value={VIEW}
                        data-cy="view_mode"
                        checked={checked === VIEW}
                        onChange={handleChange}
                    />{" "}
                    {VIEW}
                </label>
            </div>
        </Stack>
        <Stack direction="horizontal" gap={1} >
            <small className="text-muted">{`${MODE_HELP_TEXT}. `} </small>
            <small className="text-warning">{`${mode}`}</small>
            <small className="text-muted">{` mode selected.`} </small>
        </Stack>
    </div>
}