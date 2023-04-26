import React, {useState, useEffect} from "react"
import {InitObj} from "./init"
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {OLD_VALUE, CHANGED_VALUE} from "./constants"
import {getSelectedTypeData} from "./functions"
import {oldData, changedData} from "./diff.constants"
import "../../src/css/terminusdb__styles"

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
            let result_patch = await tdbClient.getJSONDiff(oldData["Person"], changedData["Person"])
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
        "likes": {
          "@class": "Animal",
          "@type": "List"
        },
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
        "manYAddress":  {
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
      }
    } 
    
    return <div className="w-100">
        <DiffViewer 
            oldValue={oldData["Person"]} 
            newValue={changedData["Person"]}
            frame={testFrames}
            type={"Person"}
            onTraverse={handleTraverse}
            diffPatch={diff}/>
    </div>
}

