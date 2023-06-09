import React, {useEffect,useRef} from "react";
import { Layout } from "./Layout";
import { useOpenAI } from "../hooks/useOpenAI";
//import type { ValidationContext, SDLValidationContext } from 'graphql';

import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/jump';
import 'codemirror/addon/search/search';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import { ValidationRule,buildClientSchema } from 'graphql';

// React.createElement(QueryEditor, { editorTheme: props.editorTheme, keyMap: props.keyMap, onClickReference: onClickReference, onCopyQuery: props.onCopyQuery, onEdit: props.onEditQuery, readOnly: props.readOnly })),
                                

const AUTO_COMPLETE_AFTER_KEY = /^[a-zA-Z0-9_@(]$/;

export function GraphqlHandlerbarsPage({}) {

   // const textInput = useRef(null)

    const ref = useRef(null); //<HTMLDivElement>
    const codeMirrorRef = useRef(); //<CodeMirrorType>
    
  const onClickReferenceRef = useRef((reference ) => {

    console.log(reference)

  }); //<NonNullable<UseQueryEditorArgs['onClickReference']>

    const {getGraphQLSchema,graphqlSchema} = useOpenAI()

   

    const ExampleRule = context => {
      // your custom rules here
      const schema = context.getSchema();
      const document = context.getDocument();
      return {
        NamedType(node) {
          if (node.name.value !== node.name.value.toLowercase()) {
            context.reportError('only lowercase type names allowed!');
          }
        },
      };
    };

    useEffect(()=>{
      if(graphqlSchema===false)getGraphQLSchema()
    },[])
//validationRules: [ExampleRule],
    useEffect(()=>{
      if(ref && ref.current && graphqlSchema){
        const buildSchema = buildClientSchema(graphqlSchema)
        codeMirrorRef.current = CodeMirror;

        const container = ref.current;
       
        const newEditor =  CodeMirror.fromTextArea(container, {
          lineNumbers: true,
          tabSize: 2,
          foldGutter: true,
          mode: 'graphql',
          autoCloseBrackets: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
     
            mode: 'graphql',
            lint: {
              schema: buildSchema
              
            },
            hintOptions: {
              schema: buildSchema,
            },
            info: {
              schema: buildSchema,
             // renderDescription: (text) => markdown.render(text),
              onClick: (reference) => {
                onClickReferenceRef.current(reference);
              },
            },
            jump: {
              schema: buildSchema,
              onClick: (reference) => {
                onClickReferenceRef.current(reference);
              },
            },
          })

    newEditor.addKeyMap({
        'Cmd-Space'() {
          newEditor.showHint({ completeSingle: true, container });
        },
        'Ctrl-Space'() {
          newEditor.showHint({ completeSingle: true, container });
        },
        'Alt-Space'() {
          newEditor.showHint({ completeSingle: true, container });
        },
        'Shift-Space'() {
          newEditor.showHint({ completeSingle: true, container });
        },
        'Shift-Alt-Space'() {
          newEditor.showHint({ completeSingle: true, container });
        },
      });

      newEditor.on('keyup', (editorInstance, event) => {
        if (AUTO_COMPLETE_AFTER_KEY.test(event.key)) {
          editorInstance.execCommand('autocomplete');
        }
      });

      let showingHints = false;

      // fired whenever a hint dialog opens
      newEditor.on('startCompletion', () => {
        showingHints = true;
      });

      // the codemirror hint extension fires this anytime the dialog is closed
      // via any method (e.g. focus blur, escape key, ...)
      newEditor.on('endCompletion', () => {
        showingHints = false;
      });

      newEditor.on('keydown', (editorInstance, event) => {
        if (event.key === 'Escape' && showingHints) {
          event.stopPropagation();
        }
      });

      newEditor.on('beforeChange', (editorInstance, change) => {
        // The update function is only present on non-redo, non-undo events.
        if (change.origin === 'paste') {
          const text = change.text.map(normalizeWhitespace);
          change.update?.(change.from, change.to, text);
        }
      });

    }
    },[ref.current,graphqlSchema])

    return (

        <Layout  showLeftSideBar={true}>
          
          <textarea className="graphiql-editor" ref={ref}></textarea>
        </Layout>
  

    )

}

// <div className="graphiql-editor" ref={ref} />
