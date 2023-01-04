import React, {useState}  from "react";
import {DocumentTable} from "../components/DocumentTable"

export const DocumentsList01 = () => {   

    const [barLoading, setBarLoading]=useState(false) 
    const [viewTable, setViewTable]=useState(false) 

    return <div>DOCUMENT LIST type</div>

    //<DocumentTable setBarLoading = {setBarLoading} setViewTable={setViewTable}/>
}