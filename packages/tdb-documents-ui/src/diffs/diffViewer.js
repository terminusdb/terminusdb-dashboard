
import React, {useState, useEffect} from "react"
import ReactDiffViewer from 'react-diff-viewer'
import {ButtonGroup, Button, Card, Modal} from "react-bootstrap"
import {AiOutlineSwap, AiOutlineSwapRight, AiOutlineSwapLeft} from "react-icons/ai"
import {BsCheck2Circle, BsPatchPlus} from "react-icons/bs"
import Stack from 'react-bootstrap/Stack'

const DisplayDiff = ({left, right, useDarkTheme, disableWordDiff, leftTitle, rightTitle, showDiffOnly}) => {
    let wordDiff=true
    if(disableWordDiff) wordDiff=disableWordDiff
    return <ReactDiffViewer 
        oldValue={JSON.stringify(left, null, 2)} 
        newValue={JSON.stringify(right, null, 2)} 
        splitView={true} 
        useDarkTheme={useDarkTheme}
        linesOffset={0}
        leftTitle={leftTitle}
        showDiffOnly={showDiffOnly}
        rightTitle={rightTitle}
        disableWordDiff={wordDiff}/>
}

/**
 * 
 * @param {json} [oldValue] - Old value 
 * @param {json} [newValue] - New value 
 * @param {boolean} [useDarkTheme] - true to use dark theme
 * @param {boolean} [disableWordDiff] - true to enable word diff 
 * @returns - a rect component 
 */

export const DiffViewer = ({oldValue, newValue, useDarkTheme, disableWordDiff, patch, leftTitle, rightTitle}) => {
    const [variant, setVariant] = useState("light")
    const [textVariant, setTextVariant] = useState("text-dark")
    const [displayLeft, setDisplayLeft] = useState(oldValue)
    const [displayRight, setDisplayRight] = useState(newValue)
    const [showDiffOnly, setShowDiffOnly] = useState(true)

    useEffect(() => {
        if(useDarkTheme) {
            setVariant("secondary")
            setTextVariant("text-gray")
        }
    }, [useDarkTheme])

    return <div>
        <Stack direction="horizontal" gap={2}>
            {patch && <Button variant={variant} className={textVariant}>
                Patch 
            </Button>
            }

        </Stack>

        <DisplayDiff left={displayLeft} 
            right={displayRight} 
            leftTitle={leftTitle}
            showDiffOnly={showDiffOnly}
            rightTitle={rightTitle}
            useDarkTheme={useDarkTheme} 
            disableWordDiff={disableWordDiff}/>
    </div>
}