import React, {useState} from "react"
import {AiOutlineSearch} from "react-icons/ai"
import {Form, InputGroup} from "react-bootstrap"

export const SearchBox = ({placeholder, onChange}) => {
    const [inputSearch, setInputSearch]=useState("")

    function handleOnChange(e) {
        e.preventDefault()
        let searchText = e.target.value
        setInputSearch(searchText)
        onChange(searchText)
    }

    return <Form className="navbar-search mr-3 mt-3">
        <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
                <InputGroup.Text style={{border: "1px solid rgb(102, 102, 102)"}}>
                    <AiOutlineSearch/>
                </InputGroup.Text>
                <Form.Control type="text" placeholder={placeholder} value={inputSearch} className="bg-transparent search-input" onChange={handleOnChange}/>
            </InputGroup>
        </Form.Group>
    </Form>
}