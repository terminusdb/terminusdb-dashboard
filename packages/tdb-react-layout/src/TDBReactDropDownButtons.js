import React, {useState, useEffect} from "react"
import { Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
 
export const TDBReactDropDownButtons = (props) => {
    let config=props.config || {}
    const [list, setList] = useState(config.list)
    const [dropdownList, setDropdownList] = useState([])
    const [selected, setSelected]=useState(list[0])
    const variant=config.variant || "primary"

    useEffect(() => { 
        let extracted=[]

        function handleChange(id){
            if(!id) return
            setSelected(id)
            if(props.onChange) props.onChange(id)
        }

        for (var item = 0; item < list.length; item++) {
            extracted.push(<Dropdown.Item key={list[item]} id={list[item]} onClick={(e) => handleChange(e.target.id)}>{list[item]}</Dropdown.Item>)
        }
        setDropdownList(extracted)
    }, [list])
    
    return  <React.Fragment>
        <Dropdown drop={"fas faAngleDown"} as={ButtonGroup} className="me-2 mb-2 ml-3">
            <Button variant={variant}>{selected}</Button>
            <Dropdown.Toggle split variant={variant}>
                <i className={"fas faAngleDown"}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropdownList}
            </Dropdown.Menu>
        </Dropdown>
    </React.Fragment>
}
