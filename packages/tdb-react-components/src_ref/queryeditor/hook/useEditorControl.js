import React, {useState,useEffect} from "react";
import {makeWOQLFromString , makeWOQLIntoString} from "../queryPaneUtils"

export const useEditorControl = (initEditableLanguage, setError, initEditablecontent='', editable=true) => {
 
    const [editableLanguage, setEditableLanguage] = useState(initEditableLanguage || "js");
    const [editableContent, setEditableContent] = useState(false);

    const [showLanguage, setShowLanguage] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const [isEditable, setIsEditable] = useState(editable)
    const [editorContent, setEditorContent] = useState(editableContent)
    const [editorLanguage, setEditorLanguage] = useState(editableLanguage)
    const [showEditableButton, setShowEditableButton] = useState(false)
//
    useEffect(() => {
        setEditableContent(initEditablecontent)
        setShowContent(initEditablecontent)
    }, [initEditablecontent])

    useEffect(() => {
        if(showLanguage){
            const showedit = (isEditable && showLanguage && ["js", "json"].indexOf(showLanguage) !== -1)
            setEditorLanguage(showLanguage);
            setEditorContent(showContent);
            setShowEditableButton(showedit)
            setIsEditable(false);
         }else{
            setEditableLanguage(editableLanguage);
            setEditorContent(editableContent);
            setShowEditableButton(false)
            setIsEditable(true);
        }
    }, [showLanguage])

    /*
    * change the current editable language
    */
    const changeEditableLanguage=(lang)=>{
        /*
        * change the edit language and set the content like editable
        */
        setEditableLanguage(lang)
        setEditableContent(showContent)
        setShowContent("");
        setShowLanguage(false);
    }



    /*
    * the current language visualized
    */
    const changeCurrentLanguage=(lang)=>{
        if(lang === editableLanguage){
            setShowContent("")
            setShowLanguage(false)
        }else {
            if(typeof editableContent !=="string" || editableContent===""){
                setShowContent("")
                setShowLanguage(lang)
            }else{
                try{
                    let woql = makeWOQLFromString(editableContent, editableLanguage)
                    if(woql){
                        setShowContent(makeWOQLIntoString(woql, lang))
                        setShowLanguage(lang)
                    }
                }catch(err){
                    console.log(err)
                    setError(err)
                }
            }
        }
    }

    return {
        //changeEditorContent : (text)=>{setEditableContent(text)},
        setEditableContent,
        editableContent,
        changeEditableLanguage,
        changeCurrentLanguage,
        editorContent,
        editorLanguage,
        isEditable,
        showEditableButton
    }
}
