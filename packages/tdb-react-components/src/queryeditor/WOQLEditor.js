import React, {useState} from "react"
import PropTypes from "prop-types";
import { CodeEditor, CodeViewer } from './Editor'
import {makeWOQLFromString} from "./queryPaneUtils"
/**
 * Controls the display of query viewer and editor
 */
export const WOQLEditor = ({editorObject, editable, setEditorContent, setMainError, setWOQLQuery, theme}) => {

    const [syntaxError, setSyntaxError] = useState(false)
    WOQLEditor.propTypes = {
       // selectedLanguage:PropTypes.string,
        content:PropTypes.string,
        setMainError:PropTypes.func,
        setWOQLQuery:PropTypes.func,
        setEditorContent:PropTypes.func,
        editable:PropTypes.bool
    }

    WOQLEditor.defaultProps = {
        content: '',
       // selectedLanguage:"js",
        editable:true
    };
    

    const onBlur = (value) =>{
        /*
        *save the editor string
        */
       setSyntaxError(false)
       if(setEditorContent)setEditorContent(value);
       editorObject.text = value

       const woql=checkContent(value);
       if(setWOQLQuery) setWOQLQuery(woql, value, editorObject.language)
       editorObject.query = woql
    }
    /*
    * onBlur
    */
    function checkContent(content){
        try{
            const woql = makeWOQLFromString(content, editorObject.language)
            return woql
        }catch(err){
            if(setMainError)setMainError (err.message)
            setSyntaxError(`SYNTAX ERROR:  ${err.message}`)
            return false;
        }
    }

    return <React.Fragment>
                {syntaxError && <h4 className="text-danger">{syntaxError}</h4>}
                <CodeEditor  onBlur={onBlur} text={editorObject.text} theme={theme}/>
            </React.Fragment>  

    return(
        <>
        { editable && !content &&
            <CodeEditor  onBlur={onBlur}  language={language} theme={theme}/>
        }
        { editable && content &&
            <CodeEditor  onBlur={onBlur} text={content} language={language} theme={theme}/>
        }
        {!editable &&
            <CodeViewer text={content} language={language} theme={theme}/>
        }
        </>
    )
}

/*
return(
    <>
    { editable && !content &&
        <CodeEditor  onBlur={onBlur}  language={language}/>
    }
    { editable && content &&
        <CodeEditor  onBlur={onBlur} text={content} language={language}/>
    }
    {!editable &&
        <CodeViewer text={content} language={language}/>
    }
    </>
)
*/



