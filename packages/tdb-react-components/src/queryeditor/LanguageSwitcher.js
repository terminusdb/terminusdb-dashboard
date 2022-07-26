import React, { useState } from "react";
import {EDIT_THIS_VERSION, LANGUAGE_NAMES, LANGUAGE_DROPDOWN, TOOLBAR_CSS} from './constants.querypane'
import {Dropdown} from "../form/Dropdown"
import PropTypes from "prop-types";

export const LanguageSwitcher = ({currentLanguage, showEditButton, languages, onChange, onEdit}) => {


     LanguageSwitcher.propTypes = {
        currentLanguage:PropTypes.string,
        showEditButton:PropTypes.bool,
        languages:PropTypes.array,
        onChange:PropTypes.func.isRequired,
        onEdit:PropTypes.func
    }

    LanguageSwitcher.defaultProps = {
        currentLanguage:"js",
        languages:['js','json','python'],
        showEditButton:false
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const setEditLanguage = () => {onEdit(currentLanguage)}

    const buttonClass=showEditButton===true ? "tdb__button__base tdb__commit__bar--button" : "tdb__button__base tdb__commit__bar--button tdb__commit__bar__vis--hidden"
    const changeLanguage = (lang) =>{
        toggle()
        onChange(lang)
    }

    let currentLabel='';
    const entries = languages.map((lang, index) => {
        let langname = LANGUAGE_NAMES[lang]
        let active= {}
        if(lang===currentLanguage){
            active={active:"active"}
            currentLabel=`${langname} `;
        }

        return(<button onClick={function(){changeLanguage(lang)}} {...active}
                    className="tdb__dropdown__button" key={lang} > {langname}</button>
                    )})

    return (
        <>
         <button className={buttonClass} onClick={setEditLanguage}>{EDIT_THIS_VERSION}
         </button>
        <Dropdown toggle={toggle} isOpen={dropdownOpen} title={currentLabel } className="nav__main__link tdb__commit__bar--drop" >
           {entries}
        </Dropdown>           
        </>
    )
}
