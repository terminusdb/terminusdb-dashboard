import React, {useState} from "react"
import Stack from 'react-bootstrap/Stack'
import { CREATE, EDIT, VIEW, MODE_HELP_TEXT } from "./constants"
import { FrameObj } from "./frameInit"

const RadioButtons = ({ mode, handleChange, checked }) => {
	return <div>
		<label>
				<input
						type="radio"
						name="letter"
						data-cy={`${mode}_mode`}
						value={mode}
						checked={checked === mode}
						onChange={handleChange}
				/>{" "}
				{mode}
		</label>
	</div>
}

export const ModeBar = () => {

	const [checked, setChecked]=useState(CREATE)
	const {
		mode,
		setMode,
	} = FrameObj()

	function handleChange (event) {
		setChecked(event.target.value)
		setMode(event.target.value)
	}

	return <div className="mb-3">
		<Stack direction="horizontal" gap={3} className="p-3">
			<RadioButtons mode={CREATE} handleChange={handleChange} checked={checked} />
			<RadioButtons mode={EDIT} handleChange={handleChange} checked={checked}/>
			<RadioButtons mode={VIEW} handleChange={handleChange} checked={checked}/>
		</Stack>
		<Stack direction="horizontal" gap={1} >
			<div className="text-muted small">{`${MODE_HELP_TEXT}. `} </div>
			<div className="text-warning small">{`${mode}`}</div>
			<div className="text-muted small">{` mode selected.`} </div>
		</Stack>
	</div>
}