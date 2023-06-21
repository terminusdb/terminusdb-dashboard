import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu, Sidebar} from 'react-pro-sidebar'
//import 'react-pro-sidebar/dist/css/styles.css'
import {SearchBox} from "./SearchBox"
import {useNavigate} from "react-router-dom"
import {sortAlphabetically} from "./utils"
import {NewDataProduct} from "./NewDataProduct"
import { DOCUMENT_EXPLORER, PRODUCT_EXPLORER, PRODUCT_MODELS } from "../routing/constants"
 
/* returns a list of data products */
export const DataProductItems = (props) => {
    const {
        woqlClient, 
        setDataProduct, 
        sidebarStateObj,
        saveSidebarState,
        getLocation,
        accessControlDashboard
    } = WOQLClientObj()

    // sort list in alphabetical order
    const list = sortAlphabetically (woqlClient ? woqlClient.databases() : []) 

    // search data products
    const [searchDataProduct, setSearchDataProduct]=useState(false)

    let navigate = useNavigate();
    const { page } = getLocation()
    function handleClick(dp) {
        const {page,organization} = getLocation() 
        const currentPage = page ? `/${page}` : "" 
        navigate(`/${organization}/`+dp.name+currentPage)
        setDataProduct(dp.name)         
    }

    const DataProductMenu = ({handleClick, item}) => {
        return <MenuItem id={item.name} 
            onClick={(e) => handleClick(item)}     
            icon={false} 
            className="sub-menu-title">
            {item.label || item.name}
        </MenuItem>
    }


    return <React.Fragment>
            {accessControlDashboard && accessControlDashboard.createDB() && 
                <NewDataProduct css={"btn-sm mb-3 col-md-10 ml-4"}/>
            }  
            <SubMenu title="Data Products" 
                className="menu-title "
                defaultOpen={(page==DOCUMENT_EXPLORER || page==PRODUCT_EXPLORER) ? false : sidebarStateObj.sidebarDataProductListState}
                onOpenChange={(e) => saveSidebarState("sidebarDataProductListState",e)}>
            <SearchBox placeholder={"Search for a Data Product"} onChange={setSearchDataProduct}/>
            {list.map(item => {
                if(!searchDataProduct) {
                    return <DataProductMenu item={item} handleClick={handleClick} key={`key_${item.name}`}/>
                }
                if(searchDataProduct && (item.name.toUpperCase().includes(searchDataProduct.toUpperCase()))) {
                    return <DataProductMenu item={item} handleClick={handleClick} key={`key_${item.name}`}/>
                }
            })}
            </SubMenu>
        </React.Fragment>
}