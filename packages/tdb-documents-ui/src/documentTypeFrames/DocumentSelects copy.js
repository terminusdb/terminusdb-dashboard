import React, {useState, useEffect} from "react"
import {Form} from "react-bootstrap"
import AsyncSelect from 'react-select/async'
import Stack from 'react-bootstrap/Stack'
import { propTypes } from "react-bootstrap/esm/Image"
import { FcKey } from "react-icons/fc"
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai"

// display mandatory or optional values - diff
const DisplayStringValues = ({defaultValue, item, uiFrame}) => {
    if(!defaultValue) return <div/>
    // loop over uiFrames to get diff classes
    if(uiFrame && uiFrame.hasOwnProperty(item)) {
        return <span classNames={`control-label`}>{defaultValue}</span>
    }
    return <span classNames={"tdb__span__select"}>{defaultValue}</span>
}

// display set ui frames
const DisplayValues = ({defaultValue, item, uiFrame}) => {
    if(!defaultValue) return <div/>
    let elementArray=[], uiFrameMatched=[]

    // loop over uiFrames to get diff classes
    if(uiFrame.hasOwnProperty(item)) {
        if(Array.isArray(uiFrame[item])) {
            uiFrame[item].map( uiFra => {
                for(var key in uiFra) {
                    if(defaultValue.includes(key)) {
                        // match found - Swap Value 
                        uiFrameMatched.push(key) // keep a tab of values not included in uiFrame
                        if(typeof uiFra[key] === "string") {
                            elementArray.push(
                                <div className={uiFra[key]}>{key}</div>
                            )
                        }
                        // when element added {key: true}
                        else if(typeof uiFra[key] === "object"  
                            && uiFra[key].hasOwnProperty("added")
                            && uiFra[key]["added"] === true) {
                                elementArray.push(
                                    <span className="w-100">
                                        <span className={uiFra[key]["classNames"]}>{key}</span>
                                        <span className={uiFra[key]["classNames"]} style={{float: "right"}}>
                                            <AiFillPlusCircle/>
                                            <AiFillPlusCircle/>
                                            <AiFillPlusCircle/>
                                        </span>
                                    </span>
                                )
                            }
                        
                    }
                    // when element removed {key: true}
                    if(typeof uiFra[key] === "object"  
                    && uiFra[key].hasOwnProperty("added")
                    && uiFra[key]["added"] === false) {
                        elementArray.push(
                            <span className="w-100">
                                <span className={uiFra[key]["classNames"]} style={{float: "right"}}>
                                    <AiFillMinusCircle/>
                                    <AiFillMinusCircle/>
                                    <AiFillMinusCircle/>
                                </span>
                                <br/>
                                <br/>
                            </span>
                        )
                    }
                }
            })
        }
    }

    // display elements as normal if no uiFrames defined for them
    if(Array.isArray(defaultValue)) {
        defaultValue.map(def => {
            if(!uiFrameMatched.includes(def)) {
                elementArray.push(
                    <div>{def}</div>
                )
            }
        })
    }

    return <div>{elementArray}</div>

}

// filled Select - view mode 
export const FilledDocumentViewSelect = ({label, defaultValue, onTraverse, styles, description, item, uiFrame}) => {
    const [clicked, setClicked]=useState(false)

        useEffect(() => {
            //console.log("clicked", clicked)
            if(!clicked) return
            if(onTraverse) onTraverse(clicked)
        }, [clicked])

        const handleClick = (e, val) => { // view if on traverse function defined
            setClicked(val)
        }
        
        let color = "text-light"
        if(uiFrame && uiFrame.hasOwnProperty(item) && uiFrame[item].hasOwnProperty("classNames")) {
            color = uiFrame[item]["classNames"]
        }
        if (styles.hasOwnProperty("mode") && styles["mode"]==="light") color="text-dark"

        return <span className="mt-3 mb-3">
            {/*<Form.Label className="control-label ">{label}</Form.Label> */}
            <Stack direction="horizontal" gap={3} className="mt-3">
                <div>{label} </div>
                <div className="ms-auto">{description}</div>
            </Stack>
            {Array.isArray(defaultValue) && <span onClick={(e) => handleClick(e, defaultValue)} className={`mb-3 tdb__span__select ${color}`}>
                {uiFrame && <DisplayValues defaultValue={defaultValue} 
                    uiFrame={uiFrame} 
                    item={item}
                />}
                {!uiFrame && defaultValue.map(dv => {
                    return <div>{dv}</div>
                })}
             </span>
            }
            {typeof defaultValue === "string" && <span onClick={(e) => handleClick(e, defaultValue)} className={`mb-3 tdb__span__select ${color}`}>
                {uiFrame && <DisplayStringValues defaultValue={defaultValue} 
                    uiFrame={uiFrame} 
                    item={item}
                />}
                {!uiFrame && <div>{defaultValue}</div>}
            </span>}
        </span>
} 

// empty Select - edit mode
export const EmptyDocumentSelect = ({label, styles, placeholder, value, onChange, loadOptions, handleInputChange, description}) => {

    return <React.Fragment>
        <Stack direction="horizontal" gap={3}>
            <div>{label} </div>
            <div className="ms-auto">{description} </div>
        </Stack>
        <span className="mt-5"></span>
        {value && <AsyncSelect
                classNames="tdb__input"
                styles={styles}
                value={value}
                onChange={onChange}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
        />}
        {!value && <AsyncSelect
                classNames="tdb__input"
                styles={styles}
                placeholder={placeholder}
                onChange={onChange}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
        />}
    </React.Fragment>
}

// filled Select - edit mode
export const FilledDocumentSelect = ({label, styles, placeholder, defaultValue, onChange, loadOptions, handleInputChange, description}) => {
    return <React.Fragment>
        {/*<Form.Label>{label} {/*<span class="required">*</span> </Form.Label>*/}
        <Stack direction="horizontal" gap={3}>
            <div>{label} </div>
            <div className="ms-auto">{description} </div>
        </Stack>
        <AsyncSelect
            cacheOptions
            classNames="tdb__input"
            styles={styles}
            placeholder={placeholder}
            onChange={onChange}
            loadOptions={loadOptions}
            defaultOptions
            defaultValue={{value: defaultValue, label: defaultValue}}
            onInputChange={handleInputChange}
        />
    </React.Fragment>
}