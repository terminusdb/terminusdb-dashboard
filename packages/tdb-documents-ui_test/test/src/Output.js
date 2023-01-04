import React, {useState} from "react"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CREATE, CARD_OUTPUT_TITLE} from "./constants"
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Row from "react-bootstrap/Row"

// Defined list to match with searched text for Document Links 
const SELECT_OPTIONS = [
	{ value: 'Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24', label: 'Designer' },
	{ value: 'Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Lecturer' },
	{ value: 'Jobs/csd4bddb166325e704e3w68da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Writter' }
]

const Form = ({frames}) => {
    const {
        type,
        uiFrames,
        data,
        mode,
        setData
	} = InitObj()

    //if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."

    function handleSubmit (data) {
        setData(data)
    }

    function handleSelect(inp) {
        let options=SELECT_OPTIONS, matched=[]
        options.map(item => {
            if(item.label.toUpperCase().includes(inp.toUpperCase())) {
                matched.push(item)
            }
        })
        return matched
    }

    /** component to display  */
    const Search = ({setSelected}) => {

        function handleClick(e){
            if(setSelected) setSelected({id: e.target.id, label: e.target.name})
        }
       
        return <>
            Search this dummy result ....
            <Row className="w-100 border" id={"ID 1"} name="first id" onClick={handleClick}>{"ID 1"}</Row>
            <Row className="w-100 border" id={"ID 2"} name="second id" onClick={handleClick}>{"ID 2"}</Row>
            <Row className="w-100 border" id={"ID 3"} name="third id" onClick={handleClick}>{"ID 3"}</Row>
        </>
    }

    let dummyFormData = {
        "@id": "thing/ccfc92e9e97e3ea237ddb6da1b01dd5e6f73a7a1d9b66d6f4a567c37d1843bbe",
        "@type": "thing",
        "link": [
          {
            "@id": "thing/ccfc92e9e97e3ea237ddb6da1b01dd5e6f73a7a1d9b66d6f4a567c37d1843bbe/link/address/cff7490ecff2229070acd46076b4f1164037104461a2d97f594fbd2a7fc1e750",
            "@type": "address",
            "addressline": "first",
            "zip": [
              1,
              2,
              3
            ]
          },
          {
            "@id": "thing/ccfc92e9e97e3ea237ddb6da1b01dd5e6f73a7a1d9b66d6f4a567c37d1843bbe/link/address/eee42ba96090f72a85d14f7cf3f62cd74067241e7d2edbb02b260f4ca947e5e7",
            "@type": "address",
            "addressline": "second",
            "zip": [
              34,
              555
            ]
          }
        ],
      }

    let dummyFormData_1 = {
        "@id": "stuff/ccfc92e9e97e3ea237ddb6da1b01dd5e6f73a7a1d9b66d6f4a567c37d1843bbe",
        "@type": "stuff",
        "name" : ["a", "b", "c"]
      }
    
      let testUiFrame={
        //classNames: "bg-primary p-5 border border-success rounded ", // bootstrap classes at root level will alter look and feel of the form
        /*subdoc:{
            "classNames" : "h3 text-success bg-light", // make Mandatory header 3 size 
            "placeholder":  "dumy place holder",
            "title": "Kitty",
            "description": "I m nice",
        },*/
        age: {
            "classNames" : "text-uppercase h2" // uppercase and header 2 size
        },
        PhoneNumber: {
            classNames: "text-danger fw-bold" // bootstrap classes at field level
        }
    } 
    /*"favorite_subject": {
      "@type": "Maths",
      "love_maths": true,
      "course_start_date": "2022-12-21T08:53:00.000Z",
      "level": "3",
      "Number_of_classes_attended": 12
    },*/

    let testData={ 
      //"@id": "Graduate/48b77e8c7d3d9880ca82e2e5f2f9bf1a8020bdae4fb2ba862c6ae296d69ca41a",
  //"@type": "Graduate",
  //"grade": "A"
  /*"@id": "Guy/f9bc87401a7c33ef559f61cee9c69ee1f2b1ee75cea1aab055f44f817ccfbb08",
  "@type": "Guy",
  "myGroup": "Music/musci",
  "group_set": [
    "Dance/sadasdsad",
    "Art/new%20art"
  ]*/


  

  /*"rdffffff" :[
    {"@lang": "ka", "@value": "a"}, 
    {"@lang": "ka", "@value": "asdsad"}
  ]*/
   "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54",
    "@type": "Polity",
    "general_variables": {
      "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8",
      "@type": "GeneralVariables",
      "alternative_names": [
        {
          "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/1ece914accfa98591e8b6343b44d37dd343e232ef0cfae2c1b96565fa8dea1d3",
          "@type": "AlternativeNames",
          "known": {
            "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/1ece914accfa98591e8b6343b44d37dd343e232ef0cfae2c1b96565fa8dea1d3/inferred/StringValue/bf51668319b75698e6ad8f67e05c4832d1d5f34c4ce4ad17c23f4cdfd0285aa3",
            "@type": "StringValue",
            "date_range": {
              "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/1ece914accfa98591e8b6343b44d37dd343e232ef0cfae2c1b96565fa8dea1d3/inferred/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/1ece914accfa98591e8b6343b44d37dd343e232ef0cfae2c1b96565fa8dea1d3/inferred/StringValue/bf51668319b75698e6ad8f67e05c4832d1d5f34c4ce4ad17c23f4cdfd0285aa3/date_range/DateRange/f3405dcd897c27c571e19ccafa9e58fad3b4f7ee3b9feee142ab413ddbf67a33",
              "@type": "DateRange",
              "from": 2,
              "to": 22
            },
            "value": "second"
          }
        },
        {
          "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/980f5512c21f8a08585daeb001b4376369cf8ee5373d55e70d03b31df0f08a01",
          "@type": "AlternativeNames",
          "inferred": {
            "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/980f5512c21f8a08585daeb001b4376369cf8ee5373d55e70d03b31df0f08a01/inferred/StringValue/19fe9c20ad3b821a103a43f23cc80db5789503e96fc656ff5a6d7681c569cb28",
            "@type": "StringValue",
            "date_range": {
              "@id": "Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/980f5512c21f8a08585daeb001b4376369cf8ee5373d55e70d03b31df0f08a01/inferred/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/Polity/08969f484ad92f60c6b1ecf1d274e1fb0004796e74320060cca81ce7b9214a54/general_variables/GeneralVariables/249fa5df63837e20161cee16571e20fd16db9003186236f5a4a40f9a76b84ef8/alternative_names/AlternativeNames/980f5512c21f8a08585daeb001b4376369cf8ee5373d55e70d03b31df0f08a01/inferred/StringValue/19fe9c20ad3b821a103a43f23cc80db5789503e96fc656ff5a6d7681c569cb28/date_range/DateRange/5124080126d628008a6a3c2ce5cc906119f94607ae737ddc7df203af02cdf72b",
              "@type": "DateRange",
              "from": 1,
              "to": 11
            },
            "value": "first"
          }
        }
      ]
    }
   
  /*"@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b",
  "@type": "Polity",
  "general_variables": {
    "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f",
    "@type": "GeneralVariables",
    "alternative_names": {
      "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764",
      "@type": "AlternativeNames",
     
        "inferred": {
          "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764/inferred/StringValue/ee1bc5d031010066a1d8e8f0f29533c78a66a620fda2201a0bb9b603c270cd5a",
          "@type": "StringValue",
          "date_range": {
            "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764/inferred/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764/inferred/StringValue/ee1bc5d031010066a1d8e8f0f29533c78a66a620fda2201a0bb9b603c270cd5a/date_range/DateRange/07cda8663150fa98406887a1acc15b9ca45a2f90242137a51f1f0f97d03bd34f",
            "@type": "DateRange",
            "from": 23,
            "to": 45
          },
          "value": "inferred"
        }
      
    }
  }*/

    /*"@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b",
    "@type": "Polity",
    "general_variables": {
      "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f",
      "@type": "GeneralVariables",
      "alternative_names": {
        "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764",
        "@type": "AlternativeNames",
        "@oneOf": {
          "inferred": {
            "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764/inferred/StringValue/ee1bc5d031010066a1d8e8f0f29533c78a66a620fda2201a0bb9b603c270cd5a",
            "@type": "StringValue",
            "date_range": {
              "@id": "Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764/inferred/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/Polity/9c3279ad8e312e35956c6b4a3371b43cc5a22da73aed5f52fdb66466a984657b/general_variables/GeneralVariables/cb6b0115f93e6b0277ba3d0a8041f2bac7b6b5970609d5d01b57c944005c689f/alternative_names/AlternativeNames/886e40aa6082ed69313b90025e92988b8af060580126c4d00ddec60e64b80764/inferred/StringValue/ee1bc5d031010066a1d8e8f0f29533c78a66a620fda2201a0bb9b603c270cd5a/date_range/DateRange/07cda8663150fa98406887a1acc15b9ca45a2f90242137a51f1f0f97d03bd34f",
              "@type": "DateRange",
              "from": 23,
              "to": 45
            },
            "value": "inferred"
          }
        }
      }
    }*/

    
      /*"@oneOf": {
        "report": {
          "comments": "kkk",
          "score": "Excellent",
          "@type": "GradeReport"
        },
        "marks": "123"
      }*/
    
  
      /*"report": {
        "@id": "Graduate/ca6c778ba861b2a74ab1261d5d6785126ce121ecebd065ef889011504a70323a/report/GradeReport/8ec07515beda403aecc3ee9262f741f59d0f775fb02d7e168eab114366125f38",
        "@type": "GradeReport",
        "comments": "comments",
        "score": "Excellent"
      }*/
      //"grade": "B"

    //, "Music/mus", "Art/hello"
    /*"favorite_subject": [
      {
        "@id": "Student/bdd6cdc9390dbdb3c388d7b745bb3c751cb867c9de4fbfdd1aa3ab37d0b721a0/favorite_subject/Botony/3e50941985a123986d1b4666dfc54fcb874e356d0773ca1c37a71c77fcff51c1",
        "@type": "Botony",
        "Number_of_classes_attended": 1,
        "course_start_date": "2022-12-07T12:26:00Z",
        "Botony_Grade": "botony",
        "Botony_number_of_assignments": 1
      },
      {
        "@id": "Student/bdd6cdc9390dbdb3c388d7b745bb3c751cb867c9de4fbfdd1aa3ab37d0b721a0/favorite_subject/Maths/a39acb4b5725d6a4caf2217628b56b85b3aeb623b6d216f230d5ad79660db7c9",
        "@type": "Maths",
        "Number_of_classes_attended": 23,
        "course_start_date": "2022-12-29T12:26:00Z",
        "Maths_level": "hard",
        "Maths_love_maths": true
      },
      {
        "@id": "Student/bdd6cdc9390dbdb3c388d7b745bb3c751cb867c9de4fbfdd1aa3ab37d0b721a0/favorite_subject/Zoology/64ce30ccb02889ae39e0644233da2c1aa1b90ff74f81512b272cedf2d268e7f0",
        "@type": "Zoology",
        "Number_of_classes_attended": 23,
        "course_start_date": "2022-11-28T12:26:00Z",
        "Zoology_Grade": "Zoology_Grade",
        "Zoology_Notes": "Zoology_Notes"
      }
    ](/)
  
          
        //"favorite_group": {
          //"Dance": "Dance/sadasdsad"
        //}
        /*"favorite_group": [{
          "Dance": "Dance/sadasdsad"
        },
        {
          "Art": "Art/123"
        }]*/
        /*"json": [{"name": "who"}, {"name": "two"}, {"name": "three"}],
        "sysUnit": []*/
        /*"List": [
          "23",
          "qwe"
        ],
        "Mandatory": "Mandatory",
        "Optional": "Optional",
        "Set": [
          "sadsada",
          "wdsdasd"
        ],
        "subdoc": {
          "@id": "otherThing/ac84b8e624d9899bda27815131c8ea5b053cb5cc2cf82b9d8571c89b0652c723/subdoc/subDoc/9bbb06c728eef3123540351f4bf130939207e19e5f02059589610796d3428f94",
          "@type": "subDoc",
          "address": "blah blah "
        }*/
      /*"works": "otherThing/4fe4116f141993dc2a557d99e8e43a53bf639628c5a3ea8324eed5f670dccd90",
      "works_list": [
        "otherThing/4fe4116f141993dc2a557d99e8e43a53bf639628c5a3ea8324eed5f670dccd90",
        "otherThing/6ac6400a176de1668ed41c669ca04c3731532e96cf4886cf145ceacc682c3b1c"
      ],
      "works_optional": "otherThing/4fe4116f141993dc2a557d99e8e43a53bf639628c5a3ea8324eed5f670dccd90",
      "works_set": [
        "otherThing/4fe4116f141993dc2a557d99e8e43a53bf639628c5a3ea8324eed5f670dccd90",
        "otherThing/6ac6400a176de1668ed41c669ca04c3731532e96cf4886cf145ceacc682c3b1c"
      ]*/
    }

    let testFrame={
      "Guy": {
        "@key": {
          "@type": "Random"
        },
        "@type": "Class",
        "favorite_group": {
          "@class": [
            "Art",
            "Dance",
            "Music"
          ],
          "@type": "Set"
        },
        "myGroup": [
          "Art",
          "Dance",
          "Music"
        ]
      }
    }

    return <FrameViewer
        frame={frames}
        //uiFrame={uiFrames} 
        uiFrame={testUiFrame} 
        type={type}
        formData={mode !==CREATE ? testData : {}}
        //onSelect={<Search/>}
        onSelect={handleSelect}
        language={"ka"}
        mode={mode}
        hideSubmit={mode===VIEW ? true : false}
        //onTraverse={handleTraverse}
        //submitButton={submitJSON}
        //language={"ka"}
        onSubmit={handleSubmit}
    />
}


export const Output = () => {
    const {
        type,
        frames
	} = InitObj()

    return <Card>
        <Card.Header className="bg-light text-dark">
            <Stack direction="horizontal" gap={3}>
                <div className="bg-light">{`${CARD_OUTPUT_TITLE} - ${type}`}</div>
            </Stack>
        </Card.Header>
        <Card.Body>
            <Form frames={frames}/>
        </Card.Body>
    </Card>
}