import React, {useContext} from "react"
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import AccordionContext from 'react-bootstrap/AccordionContext';
import * as CONST from "./constants"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"

// function to show custom buttons on Show/Hide in Accordians
function ToggleErrorDisplay({ children, eventKey, expandComponent, hideComponent, css }) {
    const { activeEventKey } = useContext(AccordionContext);

    const onExpand = useAccordionButton(eventKey, () => {});

    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
      <button 
        type="button"
        className={css}
        onClick={onExpand}
      >
        { isCurrentEventKey ?  hideComponent : expandComponent }
      </button>
    );
}

// function displays accordians per property error
/**
 * 
 * @param {*} propertyName property name
 * @param {*} errorType error description per property
 * @param {*} message message per property
 * @returns 
 */
export const DisplayErrorPerProperty = ({ propertyName, errorType, message }) => {
    return <Accordion className="bg-transparent  border-0 w-100">
      <Accordion.Item eventKey={propertyName} className={"bg-transparent border-0 alert_danger_text"}>
          <div className="mb-3">
              <div className="fw-bold d-flex">
                  <ToggleErrorDisplay eventKey={propertyName} 
                      css={CONST.ERROR_DOC_EXPAND_ICON_CLASSNAME}
                      expandComponent={<MdKeyboardArrowRight/>} 
                      hideComponent={<MdKeyboardArrowDown/>}/>
                  {errorType}
                
                  <pre className="alert_danger_border ml-1 p-1 rounded text-break">{propertyName}</pre>
              </div>
          </div>
      </Accordion.Item>
      <Accordion.Collapse eventKey={propertyName} className={"bg-transparent"}>
            <pre className="pre--error">{message}</pre>
      </Accordion.Collapse>
    </Accordion>
}


// function display error messages 
export const ErrorDisplay = ({ errorData, message, css }) => {
    return <Accordion className="bg-transparent border-0 w-100">
        <Card className="bg-transparent border-0">
            <Card.Header className="bg-transparent">
                <span>{message} </span>
                <ToggleErrorDisplay eventKey="0" expandComponent={"More Info" } hideComponent={"Hide"} css={css}/>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                
                    {/*<pre>{JSON.stringify(errorData, null, 2)}</pre>*/}
                   <pre className="pre--error">{errorData}</pre>              
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
}