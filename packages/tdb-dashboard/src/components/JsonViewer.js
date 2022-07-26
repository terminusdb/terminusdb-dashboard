import React, {useState} from "react"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
import {EDITOR_WRITE_OPTIONS} from "./constants"

export const JsonViewer = ({json}) => {
    const [value, setValue]=useState(false)

    let options=EDITOR_WRITE_OPTIONS


   return <CodeMirror
        value={json}
        options={options}
        readOnly={true}
        onChange={(editor, data, value) => {
            setValue(value)
        }}
    />
}