import React, {useState} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const DisplayCode = ({codeString}) => {
    return <SyntaxHighlighter language="javascript" style={vs2015} wrapLines={true}>
        {codeString}
    </SyntaxHighlighter>
}