import React , {useEffect,useState} from 'react';
import TerminusClient from '@terminusdb/terminusdb-client'
import { AdvancedSearch } from '@terminusdb/terminusdb-react-table';
import {
   Dropdown,
   DropdownMenu,
   DropdownToggle,
   DropdownItem,
 } from "reactstrap"; 
//import {WOQLResult} from "@terminusdb/terminusdb-client";

const TestApp = (props) =>{
    const claimCaseAdvancedSearch = {
        "death_certificate_for_claim":{
           "label":"death_certificate_for_claim",
           "type":"!group",
           "subfields":{
              "country_of_death":{
                 "typevalue":"Country"
              },
              "date_of_birth":{
                 "label":"date_of_birth",
                 "type":"datetime",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"DateTime"
              },
              "date_of_death":{
                 "label":"date_of_death",
                 "type":"datetime",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"DateTime"
              },
              "name":{
                 "label":"name",
                 "type":"text",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"String"
              }
           }
        },
        "incur":{
           "label":"incur",
           "valueSources":[
              "value"
           ],
           "operators":[
              "select_equals",
              "select_not_equals"
           ],
           "defaultOperator":"select_equals",
           "type":"select",
           "fieldSettings":{
              "listValues":[
                 "SumAssured",
                 "Premium"
              ]
           },
           "typevalue":"Refund"
        },
        "policy_of_claim":{
           "label":"policy_of_claim",
           "type":"!group",
           "subfields":{
              "beneficiary":{
                 "typevalue":"Beneficiary"
              },
              "country_of_issue":{
                 "typevalue":"Country"
              },
              "life_assured_date_of_birth":{
                 "label":"life_assured_date_of_birth",
                 "type":"datetime",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"DateTime"
              },
              "life_assured_name":{
                 "label":"life_assured_name",
                 "type":"text",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"String"
              },
              "premium_paid_to_date":{
                 "label":"premium_paid_to_date",
                 "type":"number",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"Float"
              },
              "sum_assured":{
                 "label":"sum_assured",
                 "type":"number",
                 "valueSources":[
                    "value"
                 ],
                 "typevalue":"Float"
              }
           }
        }
     }

     const claimCaseAdvancedFilter = (filter) =>{
        
     }
     

     const [dropdownOpen, setDropdownOpen] = useState(false);

     const toggle = () => setDropdownOpen((prevState) => !prevState);
   
    return <div style={{marginLeft:"500px"}} >
       <div className="d-flex p-5">
       COMPLETE APP NO ModelProductPage
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>Dropdown</DropdownToggle>
        <DropdownMenu container="body">
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
      <AdvancedSearch  fields={claimCaseAdvancedSearch} setFilter={claimCaseAdvancedFilter}/>
          </div>
}           
export default TestApp;
