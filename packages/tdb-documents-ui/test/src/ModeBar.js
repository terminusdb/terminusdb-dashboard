import React, {useState} from "react"
import Stack from 'react-bootstrap/Stack'
import {CREATE, EDIT, VIEW} from "./constants"
import {InitObj} from "./init"

export const ModeBar = () => {

    const [checked, setChecked]=useState(CREATE)
    const {
		mode,
        setMode
	} = InitObj()

    function handleChange (event) {
        setChecked(event.target.value)
        setMode(event.target.value) 
    }

    return <div className="mb-2">
        <Stack direction="horizontal" gap={3} className="mb-3">
            <div>
                <label>
                    <input
                        type="radio"
                        name="letter"
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
                        checked={checked === VIEW}
                        onChange={handleChange}
                    />{" "}
                    {VIEW}
                </label>
            </div>
        </Stack>
    </div>
}