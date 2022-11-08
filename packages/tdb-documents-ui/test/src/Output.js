import React from "react"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CARD_OUTPUT_TITLE} from "./constants"
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'


const Form = ({frames}) => {
    const {
        type,
        uiFrames,
        data,
        mode,
        setData
	} = InitObj()

    //if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."

    function handleSubmit (data) {
        setData(data)
    }

    function handleSelect(inp) {
        let options=SELECT_OPTIONS, matched=[]
        options.map(item => {
            if(item.value.toUpperCase() === inp.toUpperCase()){
                matched.push(item)
            }
        })
        return matched
    }

    /*let dummyFrame = {
        "@context": {
          "@base": "terminusdb:///data/",
          "@schema": "terminusdb:///schema#",
          "@type": "Context",
          "xsd": "http://www.w3.org/2001/XMLSchema#"
        },
        "Text":{
            "@key": {
              "@type": "Random"
            },
            "@metadata": {
                "render_as" :{
                    "mk": {
                        "widget": "markdown",
                        "minHeight": "200px",
                        "displayLines": false,
                        "theme": "dark"
                    }
                }
            },
            "@type": "Class",
            "mk": "xsd:string",
            "sys:metadata": "terminusdb:///json/JSON/SHA1/7ef4c3f09827a42ffd5382fafe2993d310b8c6ef"
        },
        "HTML":{
            "@key": {
              "@type": "Random"
            },
            "@metadata": {
                "render_as" :{
                    "html": {
                        "widget": "HTML",
                        "minHeight": "200px",
                        "displayLines": false,
                        "theme": "dark"
                    }
                }
            },
            "@type": "Class",
            "html": "xsd:string",
            "sys:metadata": "terminusdb:///json/JSON/SHA1/7ef4c3f09827a42ffd5382fafe2993d310b8c6ef"
        }
    }

    var dummyMarkDownFormData = {
        "@id": "Text/32049239842309482340328940324",
        "@type": "Text",
        "mk": "# Header 1 #\n## Header 2 ##\n### Header 3 ###             (Hashes on right are optional)\n## Markdown plus h2 with a custom ID ##   {#id-goes-here}\n[Link back to H2](#id-goes-here)\n\n```js\nvar x = \"string\";\nfunction f() {\n  return x;\n}\n```\n\n<!-- html madness -->\n<div class=\"custom-class\" markdown=\"1\">\n  <div>\n    nested div\n  </div>\n  <script type='text/x-koka'>\n    function( x: int ) { return x*x; }\n  </script>\n  This is a div _with_ underscores\n  and a & <b class=\"bold\">bold</b> element.\n  <style>\n    body { font: \"Consolas\" }\n  </style>\n</div>\n\n* Bullet lists are easy too\n- Another one\n+ Another one\n\nThis is a paragraph, which is text surrounded by\nwhitespace. Paragraphs can be on one\nline (or many), and can drone on for hours.\n\nNow some inline markup like _italics_,  **bold**,\nand `code()`. Note that underscores\nin_words_are ignored.\n\n````application/json\n  { value: [\"or with a mime type\"] }\n````\n\n> Blockquotes are like quoted text in email replies\n>> And, they can be nested\n\n1. A numbered list\n2. Which is numbered\n3. With periods and a space\n\nAnd now some code:\n\n    // Code is just text indented a bit\n    which(is_easy) to_remember();\n\nAnd a block\n\n~~~\n// Markdown extra adds un-indented code blocks too\n\nif (this_is_more_code == true && !indented) {\n    // tild wrapped code blocks, also not indented\n}\n~~~\n\nText with\ntwo trailing spaces\n(on the right)\ncan be used\nfor things like poems\n\n### Horizontal rules\n\n* * * *\n****\n--------------------------\n\n![picture alt](/images/photo.jpeg \"Title is optional\")\n\n## Markdown plus tables ##\n\n| Header | Header | Right  |\n| ------ | ------ | -----: |\n|  Cell  |  Cell  |   $10  |\n|  Cell  |  Cell  |   $20  |\n\n* Outer pipes on tables are optional\n* Colon used for alignment (right versus left)\n\n## Markdown plus definition lists ##\n\nBottled water\n: $ 1.25\n: $ 1.55 (Large)\n\nMilk\nPop\n: $ 1.75\n\n* Multiple definitions and terms are possible\n* Definitions can include multiple paragraphs too\n\n*[ABBR]: Markdown plus abbreviations (produces an <abbr> tag)",
         "sys:metadata": "terminusdb:///json/JSON/SHA1/7ef4c3f09827a42ffd5382fafe2993d310b8c6ef"
    }, dummyData = {}
    
    var dummyHTMLFormData = {
        "@id": "HTML/32049239842309482340328940324",
        "@type": "HTML",
        "html": "<!DOCTYPE HTML>\n<!--Example of comments in HTML-->\n<html>\n<head>\n  <!--This is the head section-->\n  <title>HTML Sample</title>\n  <meta charset=\"utf-8\">\n\n  <!--This is the style tag to set style on elements-->\n  <style type=\"text/css\">\n    h1\n    {\n      font-family: Tahoma;\n      font-size: 40px;\n      font-weight: normal;\n      margin: 50px;\n      color: #a0a0a0;\n    }\n\n    h2\n    {\n      font-family: Tahoma;\n      font-size: 30px;\n      font-weight: normal;\n      margin: 50px;\n      color: #fff;\n    }\n\n    p\n    {\n      font-family: Tahoma;\n      font-size: 17px;\n      font-weight: normal;\n      margin: 0px 200px;\n      color: #fff;\n    }\n\n    div.Center\n    {\n      text-align: center;\n    }\n\n    div.Blue\n    {\n      padding: 50px;\n      background-color: #7bd2ff;\n    }\n\n    button.Gray\n    {\n      font-family: Tahoma;\n      font-size: 17px;\n      font-weight: normal;\n      margin-top: 100px;\n      padding: 10px 50px;\n      background-color: #727272;\n      color: #fff;\n      outline: 0;\n          border: none;\n          cursor: pointer;\n    }\n\n    button.Gray:hover\n    {\n      background-color: #898888;\n    }\n\n    button.Gray:active\n    {\n      background-color: #636161;\n    }\n\n  </style>\n\n  <!--This is the script tag-->\n  <script type=\"text/javascript\">\n    function ButtonClick(){\n      // Example of comments in JavaScript\n      window.alert(\"I'm an alert sample!\");\n    }\n  </script>\n</head>\n<body>\n  <!--This is the body section-->\n  <div class=\"Center\">\n    <h1>NAME OF SITE</h1>\n  </div>\n  <div class=\"Center Blue\">\n      <h2>I'm h2 Header! Edit me in &lt;h2&gt;</h2>\n      <p>\n        I'm a paragraph! Edit me in &lt;p&gt;\n        to add your own content and make changes to the style and font.\n        It's easy! Just change the text between &lt;p&gt; ... &lt;/p&gt; and change the style in &lt;style&gt;.\n        You can make it as long as you wish. The browser will automatically wrap the lines to accommodate the\n        size of the browser window.\n      </p>\n      <button class=\"Gray\" onclick=\"ButtonClick()\">Click Me!</button>\n  </div>\n</body>\n</html>\n"
    }
    if(type == "Text") dummyData=dummyMarkDownFormData
    if(type == "HTML") dummyData=dummyHTMLFormData
    if(mode === "Create") dummyData = {}*/
    

    return <FrameViewer
        frame={frames}
        uiFrame={uiFrames} 
        type={type}
        formData={data}
        onSelect={handleSelect}
        mode={mode}
        hideSubmit={mode===VIEW ? true : false}
        //onTraverse={handleTraverse}
        //submitButton={submitJSON}
        //language={"ka"}
        onSubmit={handleSubmit}
    />
}


export const Output = () => {
    const {
        type,
        frames
	} = InitObj()

    return <Card>
        <Card.Header className="bg-light text-dark">
            <Stack direction="horizontal" gap={3}>
                <div className="bg-light">{`${CARD_OUTPUT_TITLE} - ${type}`}</div>
            </Stack>
        </Card.Header>
        <Card.Body>
            <Form frames={frames}/>
        </Card.Body>
    </Card>
}