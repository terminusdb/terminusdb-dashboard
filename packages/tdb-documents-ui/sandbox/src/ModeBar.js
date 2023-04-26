import React, {useState} from "react"
import Stack from 'react-bootstrap/Stack'
import { CREATE, EDIT, VIEW, MODE_HELP_TEXT } from "./constants"
import { FrameObj } from "./frameInit"
import { Card } from "react-bootstrap"

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

	return <Card className="mb-3">
		<Card.Header>
			<div>{`${MODE_HELP_TEXT}. `} </div>
		</Card.Header>
		<Card.Body>
			<Stack direction="horizontal" gap={1} className="mb-2" >
				<div className="text-warning">{`${mode}`}</div>
				<div className="text-muted">{` mode selected.`} </div>
			</Stack>
			<Stack direction="horizontal" gap={3}>
				<RadioButtons mode={CREATE} handleChange={handleChange} checked={checked} />
				<RadioButtons mode={EDIT} handleChange={handleChange} checked={checked}/>
				<RadioButtons mode={VIEW} handleChange={handleChange} checked={checked}/>
			</Stack>
			
		</Card.Body>
	</Card>
}