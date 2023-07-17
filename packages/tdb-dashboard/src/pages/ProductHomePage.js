import React from "react";
import {useParams} from 'react-router-dom'
import { DataProductsHome } from "./DataProductsHome";
import { DataProductsHomeSystem} from "./DataProductsHomeSystem"

export  const ProductHomePage =()=>{
    const {dataProduct} = useParams()

    if(dataProduct==="_system")return <DataProductsHomeSystem/>
    return <DataProductsHome/>

}