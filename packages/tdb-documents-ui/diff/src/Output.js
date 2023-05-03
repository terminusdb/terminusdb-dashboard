import React, {useState, useEffect} from "react"
import {InitObj} from "./init"
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {OLD_VALUE, CHANGED_VALUE} from "./constants"
import {getSelectedTypeData} from "./functions"
import {oldData, changedData} from "./diff.constants"
import '../../src/css/terminusdb__darkly.css'


export const Output = () => {
    const {
        type,
        frames, 
        tdbClient,
        diff, 
        setDiff,
        doc, 
        setDoc,
        dataProduct
	} = InitObj()
        
    useEffect(() => {
        if(type) { 
            setDoc(getSelectedTypeData(dataProduct, type))
        }
    }, [type])

    useEffect(() => { 
        async function getDiffs(tdbClient) {
            //console.log("doc", doc)
            let result_patch = await tdbClient.getJSONDiff(oldData["Definition"], changedData["Definition"])
            setDiff(result_patch)
        }
        if(tdbClient) {
            getDiffs(tdbClient)
        }
    }, [tdbClient]) 


    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."
    if(!diff) return "LOADING ..." 
    
    /*if(Object.keys(doc[OLD_VALUE]).length === 0 && 
        Object.keys(doc[CHANGED_VALUE]).length === 0) {
            return <>No data provided to show diffs ... </>
    }*/
    function handleTraverse (clicked) {
      alert(`You have clicked on ${clicked} ...`)
    }

    let testFrames = {
      "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "Context"
      },
      "Sys": {
        "@type": "Class",
        "rdfProperty": "rdf:langString",
        "jsonProp": {
          "@class": "sys:JSON",
          "@type": "Set"
        }
      },
      "MarkDown": {
        "@type": "Class",
        "@metadata": {
          "render_as": {
            "text": "markdown"
          }
        },
        "text": {
          "@class": "xsd:string",
          "@type": "Set"
        }
      },
      "Address": {
        "@documentation": [
          {
            "@comment": "An Address",
            "@label": "Address",
            "@language": "en",
            "@properties": {
              "AddressLine1": {
                "@comment": "Address Line one",
                "@label": "Address Line 1"
              },
              "Country": {
                "@comment": "A Country ",
                "@label": "Country"
              },
              "postalCode": {
                "@comment": "A valid Postal Code",
                "@label": "Zip Code"
              }
            }
          },
          {
            "@comment": "მისამართი",
            "@label": "მისამართი",
            "@language": "ka",
            "@properties": {
              "AddressLine1": {
                "@comment": "მისამართის ხაზი პირველი",
                "@label": "მისამართის ხაზი 1"
              },
              "Country": {
                "@comment": "\\x1CA5\\ვეყანა",
                "@label": "ქვეყანა"
              },
              "postalCode": {
                "@comment": "მოქმედი საფოსტო კოდი",
                "@label": "\\x1C96\\იპ კოდი"
              }
            }
          }
        ],
        "@key": {
          "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "AddressLine1": "xsd:string",
        "City": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "Country": "xsd:string",
        "postalCode": "xsd:string"
      },
      "Animal": {
        "@key": {"@type": "Random"},
        "@type": "Class",
        "@documentation": {
          "@comment": "an Animal",
          "@properties": {
              "owned_by": "owned by owner",
              "nickName": "pet's nick names",
              "category": "blah"
          }
        },
        //"@unfoldable": [],
        "owned_by":{
          "@class": "Person",
          "@type": "Optional"
        },
        "category": "xsd:string",
        "nickName": "xsd:string"
      },
      "Zoology": {
        "@documentation": [
          {
            "@language": "en",
            "@properties": {
              "Zoology_notes": {
                "@comment": "Notes taken for Zoology",
                "@label": "Zoology Notes"
              },
              "subject_name": {
                "@comment": "Course Subject Name",
                "@label": "Subject Name"
              }
            }
          },
          {
            "@language": "ka",
            "@properties": {
              "Zoology_notes": {
                "@comment": "კლასების რაოდენობა",
                "@label": "კლასები დაესწრო"
              },
              "subject_name": {
                "@comment": "კურსის დაწყების თარიღი",
                "@label": "\\x1C93\\აწყების თარიღი"
              }
            }
          }
        ],
        //"@unfoldable": [],
        "@metadata": {
          "order_by": [ "subject_name", "Zoology_notes" ]
        },
        "@inherits": [
          "Subject"
        ],
        "@key": {
          "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "Zoology_notes": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "subject_name": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      },
      "Botony": {
        "@documentation": [
          {
            "@language": "en",
            "@properties": {
              "Botony_notes": {
                "@comment": "Notes taken care of in Botony",
                "@label": "Botony Notes"
              },
              "subject_name": {
                "@comment": "Course Subject Name",
                "@label": "Subject Name"
              }
            }
          },
          {
            "@language": "ka",
            "@properties": {
              "Botony_notes": {
                "@comment": "კლასების რაოდენობა",
                "@label": "კლასები დაესწრო"
              },
              "subject_name": {
                "@comment": "კურსის დაწყების თარიღი",
                "@label": "\\x1C93\\აწყების თარიღი"
              }
            }
          }
        ],
        "@inherits": [
          "Subject"
        ],
        "@metadata": {
          "order_by": [ "subject_name", "Botony_grade", "Botony_notes" ]
        },
        //"@unfoldable": [],
        "@key": {
          "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "Botony_notes": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "Botony_grade": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "subject_name": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      },
      "Person": {
        "@key": {
          "@type": "Random"
        },
        "@type": "Class",
        "likes":  {
          "@class": "xsd:string",
          "@type": "List"
        }
        /*"likes": {
          "@class": "Animal",
          "@type": "List"
        },*/
        /*"favorite_subject": { 
          "@class": [
            {
              "@class": "Zoology",
              "@subdocument": []
            },
            {
              "@class": "Botony",
              "@subdocument": []
            }
          ],
          "@type": "Set"
        },
        "name": {
          "@class": "xsd:string",
          "@type": "Optional"
        },*/
        /*"manYAddress":  {
          "@class": {
            "@class": "Address",
            "@subdocument": []
          },
          "@type": "Set"
        },
        /*"permanentAddress":  {
          "@class": "Address",
          "@subdocument": []
        },
        "nickNames": {
          "@class": "xsd:string",
          "@type": "Set" 
        },
        "age": {
          "@class": "xsd:decimal",
          "@type": "Optional"
        },*/
      },
      "GoodStudents": {
        "@key": {
          "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "name": "xsd:string",
        "qualities": "xsd:string"
      },
      "AverageStudents": {
        "@key": {
          "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "name": "xsd:string",
        "average": "xsd:string"
      },
      "GradeReports": {
        "@key": {
          "@type": "Random"
        },
        "@oneOf": [
          {
            "Excellent": {
              "@class": "GoodStudents",
              "@subdocument": []
            },
            "Average": {
              "@class": "AverageStudents",
              "@subdocument": []
            },
            "notes": "xsd:string",
            "absent": "sys:Unit",
            "unknown": "sys:Unit"
          }
        ],
        "@subdocument": [],
        "@type": "Class"
      },
      "Graduate": {
        "@type": "Class",
        "@metadata": {
          "render_as": {
            "grades": { "expand": true }
          }
        },
        "grades": {
          "@class": {
            "@class": "GradeReports",
            "@subdocument": []
          },
          "@type": "Set"
        }
      }, 
      "One": {
        "@key": {
          "@type": "Random"
        },
        "@type": "Class",
        "likes": "Animal"
      },
      "Test": {
        "@key": {
          "@type": "Random"
        },
        "@type": "Class",
        "new": {
          "@class": "xsd:string",
          "@type": "List"
        },
       
      }
    } 

    const CODE_FRAMES = {
      "@context": {
        "@base": "terminusdb:///documentation/data/",
        "@schema": "terminusdb:///documentation/schema#",
        "@type": "Context"
      },
      "Application": {
        "@inherits": [
          "Documented",
          "Named",
          "Summarized"
        ],
        "@type": "Class",
        "language": {
          "@id": "Language",
          "@type": "Enum",
          "@values": [
            "Python",
            "Javascript"
          ]
        },
        "license": "xsd:string",
        "modules": {
          "@class": "Module",
          "@type": "Set"
        },
        "name": "xsd:string",
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "version": "xsd:string"
      },
      "Class": {
        "@inherits": [
          "Documented",
          "Named",
          "Summarized"
        ],
        "@type": "Class",
        "memberFunction": "Definition",
        "memberVariable": "Parameter",
        "name": "xsd:string",
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      },
      "Definition": {
        "@inherits": [
          "Documented",
          "Named",
          "Summarized"
        ],
        "@oneOf": [
          {
            "parameters": {
              "@class": "Parameter",
              "@dimensions": 1,
              "@type": "Array"
            },
            "receives": {
              "@class": "Parameter",
              "@dimensions": 1,
              "@type": "Array"
            }
          },
          {
            "returns": "Returns",
            "returns_multiple": {
              "@class": "Returns",
              "@dimensions": 1,
              "@type": "Array"
            },
            "void": "sys:Unit",
            "yields": "Returns"
          }
        ],
        "@type": "Class",
        "name": "xsd:string",
        "summary": { 
          "@class": "xsd:string",
          "@type": "Optional"
        }
        /*"examples": {
          "@class": "xsd:string",
          "@dimensions": 1,
          "@type": "Array"
        },
        "extendedSummary": "xsd:string",
        "index": {
          "@class": "xsd:integer",
          "@type": "Optional"
        },
        "notes": "xsd:string",
        "raises": {
          "@class": "Exception",
          "@type": "Set"
        },
        "references": "xsd:string",
        "section": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "seeAlso": {
          "@class": "Definition",
          "@type": "Set"
        },
        "signature": "xsd:string",
        }*/
      },
      "Documented": {
        "@abstract": [],
        "@inherits": [
          "Named",
          "Summarized"
        ],
        "@type": "Class",
        "name": "xsd:string",
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      },
      "Exception": {
        "@inherits": [
          "Documented",
          "Named",
          "Summarized"
        ],
        "@type": "Class",
        "name": "xsd:string",
        "paramters": {
          "@class": "xsd:string",
          "@dimensions": 1,
          "@type": "Array"
        },
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      },
      "Language": {
        "@type": "Enum",
        "@values": [
          "Python",
          "Javascript"
        ]
      },
      "Module": {
        "@inherits": [
          "Documented",
          "Named",
          "Summarized"
        ],
        "@type": "Class",
        "classes": {
          "@class": "Class",
          "@type": "Set"
        },
        "definitions": {
          "@class": "Definition",
          "@type": "Set"
        },
        "name": "xsd:string",
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      },
      "Named": {
        "@abstract": [],
        "@type": "Class",
        "name": "xsd:string"
      },
      "Parameter": {
        "@inherits": [
          "Documented",
          "Named",
          "Summarized"
        ],
        "@type": "Class",
        "default": "xsd:string",
        "name": "xsd:string",
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "type": "xsd:string"
      },
      "Returns": {
        "@type": "Class",
        "name": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "type": "xsd:string"
      },
      "Summarized": {
        "@abstract": [],
        "@type": "Class",
        "summary": {
          "@class": "xsd:string",
          "@type": "Optional"
        }
      }
    }
    
    return <div className="w-100">
        <DiffViewer 
            oldValue={oldData["Definition"]} 
            newValue={changedData["Definition"]}
            frame={CODE_FRAMES}
            type={"Definition"}
            onTraverse={handleTraverse}
            diffPatch={diff}/>
    </div>
}

