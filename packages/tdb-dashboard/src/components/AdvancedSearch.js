import React, {useState} from 'react';
import {Query, Builder, BasicConfig, Utils as QbUtils} from 'react-awesome-query-builder';
import {Button} from 'react-bootstrap'

// For AntDesign widgets only:
//import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
//import 'antd/dist/antd.css'; // or import "react-awesome-query-builder/css/antd.less";
// For MUI 4/5 widgets only:
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';

//import MuiConfig from 'react-awesome-query-builder/lib/config/mui';

// For Bootstrap widgets only:
//import BootstrapConfig from "react-awesome-query-builder/lib/config/bootstrap";

import 'react-awesome-query-builder/lib/css/styles.css';


//import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles

// Choose your skin (ant/material/vanilla):
const InitialConfig = MaterialConfig  //AntdConfig; // or MaterialConfig or MuiConfig or BootstrapConfig or BasicConfig

const typeMatch = {"string":"text"}

console.log("proxy operator", InitialConfig.operators.proximity)

console.log("InitialConfig.operators" , InitialConfig.operators)


const regex = {
  label: "Regex",
  labelForFormat: "Regex",
  jsonLogic: "regex",
  reversedOp: 'not_equal',
  cardinality: 1,
  formatOp: (field, _op, value, _valueSrc, _valueType, opDef) => `${field} ${opDef.labelForFormat} ${value}`,
  mongoFormatOp:null
}


const operators = {
  select_equals:InitialConfig.operators.select_equals,
  select_not_equals:InitialConfig.operators.select_not_equals,
  equal:InitialConfig.operators.equal,
  not_equal:InitialConfig.operators.not_equal,
  less:InitialConfig.operators.less,
  less_or_equal:InitialConfig.operators.less_or_equal,
  greater:InitialConfig.operators.greater,
  greater_or_equal:InitialConfig.operators.greater_or_equal,
  starts_with:InitialConfig.operators.starts_with,
  select_any_in:InitialConfig.operators.select_any_in, //Contains any of the terms in the list of terms
  regex:regex,
  like:InitialConfig.operators.like
};

console.log(InitialConfig.operators.like)
console.log(InitialConfig.operators.proximity.options)

console.log("TEXT", InitialConfig.types.text)




const stringFilter = {"eq": "eq", //Equality
                      "ne": "ne", //Disequality
                      "lt": "lt", //Less than
                      "le": "le", //Less than or equal
                      "gt": "gt",  //Greater than
                      "ge": "ge", // Greater than or equal
                      "regex": "regex",//Matches regex
                      "startsWith": "startsWith",// Matches the string prefix
                      "allOfTerms": "allOfTerms", //Contains all terms in the list of terms
                      "anyOfTerms": "anyOfTerms", //Contains any of the terms in the list of terms
                    }
// datetime
const numberFilter =  {"eq": "eq", //Equality
                      "ne": "ne", //Disequality
                      "lt": "lt", //Less than
                      "le": "le", //Less than or equal
                      "gt": "gt",  //Greater than
                      "ge": "ge" // Greater than or equal
                }

const booleanFilter ={"eq": "eq", //Equality
                "ne": "ne" //Disequality
              }


const defaultConfig = {
  ...InitialConfig,
  operators,
  fields: {
    rgb: {
        label: 'RGB',
        type: 'text',
        valueSources: ['value'],
        //operators: ['equal']
    },
    name: {
        label: 'Name',
        type: 'text',
        valueSources: ['value'],
       // operators: ['equal']
    }
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)

export const AdvancedSearch = (props) =>{
    const queryValue = props.queryValue || {"id": QbUtils.uuid(), "type": "group"};
    const [tree,setTree] = useState(QbUtils.loadTree(queryValue))

    console.log("AdvancedSearch",props.fields)

    if(!props.fields)return ""
    
    const config = {...InitialConfig,
      operators,fields:props.fields || {}} 
   
    const renderBuilder = (props) => (
      <div className="query-builder-container" style={{padding: '10px'}}>
        <div className="query-builder qb-lite">
            <Builder {...props} />
        </div>
      </div>
    )

    const mapField ={"AND":'_and',
                    "OR" : '_or',
                    "select_equals":'eq',
                    "select_not_equals" :"ne",
                    "equal":'eq',
                    "not_equal":"ne",
                    "like":"regex",
                    "starts_with":"regex"}
    
    const checkNot = (element, object)  => {
        if(element.properties && element.properties.not){
          return {"_not":object}
        }
        return object
    }            
    const getChildrenRule = (childrenArr,groupName) =>{
       const childrenArrtmp = [] 
        childrenArr.forEach(element => {
            if(element.type=="group"){
              const conjunction = mapField[element.properties.conjunction] || element.properties.conjunction
              const childrenRule = getChildrenRule(element.children1)
             
              childrenArrtmp.push(checkNot(element,{[conjunction] : childrenRule}))

            }else if (element.type=="rule_group"){
              let ruleGroup = element.properties.field
              const childrenRule = getChildrenRule(element.children1,`${ruleGroup}.`)

              if(groupName){
                ruleGroup = ruleGroup.replace(groupName,'')
              }

              if(childrenRule.length===1){
                if(element.properties && 
                  element.properties.mode==="multiple"){
                  childrenArrtmp.push({[ruleGroup]:{"someHave":childrenRule[0]}})
                }else{
                  childrenArrtmp.push({[ruleGroup]:childrenRule[0]})
                }

              }else{
                childrenArrtmp.push({[ruleGroup] :{"_and" : childrenRule}})
              }
            }else{
              let field = element.properties.field
              const operator = mapField[element.properties.operator] || element.properties.operator
              let value = element.properties.value[0]

              if(element.properties.operator === "like"){
                value = `(?i)${value}`
              }else if(element.properties.operator === "starts_with"){
                value = `(ˆ)${value}`
              }

              if(typeof value === "number"){
                value = `${value}`
              }
              
              if(groupName){
                field = field.replace(groupName,'')              
                //addToObj[fieldOnly]={[operator]:value}
              }
              //"element/part/name
              if(field.indexOf("/")>-1){
                const fieldArr = field.split("/");
                let fieldObj = {}
                let i = (fieldArr.length-2)
                
                fieldObj[fieldArr[fieldArr.length-1]]={[operator]:value}

                while(i>=0){
                   fieldObj={[fieldArr[i]]:fieldObj} 
                   i = i-1
                }
                childrenArrtmp.push(fieldObj)

              }else {
                childrenArrtmp.push({[field]:{[operator]:value}})
              }
            }  
        });
        return childrenArrtmp
    }

    const jsonStringToGraphQlFilter = (data)=>{
        let filterObj ={}
        if(data && Array.isArray(data.children1)){
           const filterObjArr = getChildrenRule( data.children1,filterObj)

           if(filterObjArr.length === 1) {
              return checkNot(data,filterObjArr[0])
           }
           const conjunction = data.properties && data.properties.conjunction ?  mapField[data.properties.conjunction] : "_and"
           return checkNot(data,{[conjunction]:filterObjArr})
        }
    }

    const onClick= ()=>{
        
        const jsonTree = QbUtils.getTree(tree);
        const filter = jsonStringToGraphQlFilter(jsonTree)

        if(props.setFilter) props.setFilter(filter)


    }
    
    const onChange = (immutableTree, config) => {
      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      setTree(immutableTree)
    }

    return <div>
    <Query
        {...config} 
        value={tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <Button onClick={()=>{onClick()}}>Filter Data</Button>
    </div>

    
}