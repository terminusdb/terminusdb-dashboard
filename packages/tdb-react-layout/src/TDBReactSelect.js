
import React, {useState} from "react"
import { Form } from '@themesberg/react-bootstrap';

export const TDBReactSelect = (props) => {

    let config= props.config
    let label = config.label || "select"
    let defaultLabel = config.defaultLabel || "Open this select menu"
    const [selected, setSelected] = useState(defaultLabel)

    const Options = ({options}) => {
        let op = []

        options.map(m => {
            op.push(<option value={m} >{m}</option>)
        })
        return op
    }

    function handleChange (e) {
        if(props.handleSelect) props.handleSelect(e.target.value)
        setSelected(e.target.value)
    }

    return <Form>
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select onChange={handleChange}>
        <option defaultValue>{selected}</option>
        <Options options={config.options}/>
      </Form.Select>
    </Form.Group>
  </Form>
}