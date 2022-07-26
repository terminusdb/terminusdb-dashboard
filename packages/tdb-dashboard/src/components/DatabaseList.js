import React, {useState} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {SearchBox} from "./SearchBox"
import {useNavigate} from "react-router-dom"
 
/* returns a list of data products */
export const DataProductItems = (props) => {
    const {
        woqlClient, 
        setDataProduct, 
        sidebarStateObj,
        saveSidebarState,
        getLocation
    } = WOQLClientObj()

    let list = woqlClient ? woqlClient.databases() : [] 

    // search data products
    const [searchDataProduct, setSearchDataProduct]=useState(false)

    let navigate = useNavigate();
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
            {item.label}
        </MenuItem>
    }

    return <React.Fragment>
            <SubMenu title="Data Products" 
                className="menu-title"
                defaultOpen={sidebarStateObj.sidebarDataProductListState}
                onOpenChange={(e) => saveSidebarState("sidebarDataProductListState",e)}
                >
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