import React, {useState, useEffect} from "react"
import {InitObj} from "./init"
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {OLD_VALUE, CHANGED_VALUE} from "./constants"
import {getSelectedTypeData} from "./functions"
import {oldData, changedData} from "./diff.constants"
import '../../src/css/terminusdb__darkly.css'
import { STAR_WAR_FRAMES, PEOPLE_OLD_VALUE, PEOPLE_NEW_VALUE } from "./starwars.constants"

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

  let test = {
    "@context": {
      "@base": "terminusdb:///star-wars/",
      "@schema": "terminusdb:///schema/star-wars#",
      "@type": "Context"
    },
    "People": {
      "@type": "Class",
      "desc": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "vehicle": {
        "@class": "Vehicle",
        "@type": "Set"
      }
    },
    "Vehicle": {
      "@type": "Class",
      "vehicle_class": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    }
  }

  let oldVal = {
    "@id": "People/1",
    "@type": "People",
    "desc": [
      "In 2015, the character was selected by Empire magazine as the 50th greatest movie character of all time.[2] On their list of the 100 Greatest Fictional Characters, Fandomania.com ranked the character at number 14.[3]\n\nIn his younger years, Luke used to be called Lukey and it annoyed him very much.\n\n54 43 That's My Number.",
      "Luke Skywalker is a fictional character and the main protagonist of the original film trilogy of the Star Wars franchise created by George Lucas. The character, portrayed by Mark Hamill, is an important figure in the Rebel Alliance's struggle against the Galactic Empire. He is the twin brother of Rebellion leader Princess Leia Organa of Alderaan, a friend and brother-in-law of smuggler Han Solo, an apprentice to Jedi Masters Obi-Wan \"Ben\" Kenobi and Yoda, the son of fallen Jedi Anakin Skywalker (Darth Vader) and Queen of Naboo/Republic Senator Padmé Amidala and maternal uncle of Kylo Ren / Ben Solo. The now non-canon Star Wars expanded universe depicts him as a powerful Jedi Master, husband of Mara Jade, the father of Ben Skywalker and maternal uncle of Jaina, Jacen and Anakin Solo.\n\nHappy go lucky."
    ],
    "vehicle": [
      "Vehicle/14",
      "Vehicle/30"
    ]
  }

  let newVal = {
    "@id": "People/1",
    "@type": "People",
    "desc": [
      "KITTY In 2015, the character was selected by Empire magazine as the 50th greatest movie character of all time.[2] On their list of the 100 Greatest Fictional Characters, Fandomania.com ranked the character at number 14.[3]\n\nIn his younger years, Luke used to be called Lukey and it annoyed him very much.\n\n54 43 That's My Number.",
      "Luke Skywalker is a fictional character and the main protagonist of the original film trilogy of the Star Wars franchise created by George Lucas. The character, portrayed by Mark Hamill, is an important figure in the Rebel Alliance's struggle against the Galactic Empire. He is the twin brother of Rebellion leader Princess Leia Organa of Alderaan, a friend and brother-in-law of smuggler Han Solo, an apprentice to Jedi Masters Obi-Wan \"Ben\" Kenobi and Yoda, the son of fallen Jedi Anakin Skywalker (Darth Vader) and Queen of Naboo/Republic Senator Padmé Amidala and maternal uncle of Kylo Ren / Ben Solo. The now non-canon Star Wars expanded universe depicts him as a powerful Jedi Master, husband of Mara Jade, the father of Ben Skywalker and maternal uncle of Jaina, Jacen and Anakin Solo.\n\nHappy go lucky."
    ],
    "vehicle": [
      "Vehicle/14",
      "Vehicle/24",
      "Vehicle/30"
    ]
  }
        
    useEffect(() => {
        if(type) {  
            setDoc(getSelectedTypeData(dataProduct, type))
        }
    }, [type])

    useEffect(() => { 
        async function getDiffs(tdbClient) {
            //console.log("doc", doc)
            let result_patch = await tdbClient.getJSONDiff(oldVal, newVal)
            setDiff(result_patch)
        }
        if(tdbClient) {
            getDiffs(tdbClient)
        }
    }, [tdbClient]) 


    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."
    if(!diff) return "LOADING ..." 

    function handleTraverse (clicked) {
      alert(`You have clicked on ${clicked} ...`)
    }

    

    return <div className="w-100">
        <DiffViewer 
            oldValue={oldVal} 
            newValue={newVal}
            frame={test}
            type={"People"}
            onTraverse={handleTraverse}
            diffPatch={diff}/>
    </div>
}

