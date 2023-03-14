"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.MARKDOWN_DATA_TYPE_FRAME = exports.MARKDOWN_DATA_TYPE_EDIT_DATA = exports.MARKDOWN_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Page Document and body field
var MARKDOWN_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Page": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "body": "xsd:string"
  }
};

// expected data on Create 
exports.MARKDOWN_DATA_TYPE_FRAME = MARKDOWN_DATA_TYPE_FRAME;
var MARKDOWN_DATA_TYPE_CREATE_DATA = {
  "@type": "Page",
  "body": "---\n\t__Advertisement :)__\n\t\n\t- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\n\t\tresize in browser.\n\t- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly\n\t\ti18n with plurals support and easy syntax.\n\t\n\tYou will like those projects!\n\t\n\t---\n\t\n\t# h1 Heading 8-)\n\t## h2 Heading\n\t### h3 Heading\n\t#### h4 Heading\n\t##### h5 Heading\n\t###### h6 Heading"
};

// expected data on Edit 
exports.MARKDOWN_DATA_TYPE_CREATE_DATA = MARKDOWN_DATA_TYPE_CREATE_DATA;
var MARKDOWN_DATA_TYPE_EDIT_DATA = {
  "@type": "Page",
  "body": "---\n\t__Changed Advertisement :)__\n\t\n\t- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\n\t\tresize in browser.\n\t- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer/ QA friendly\n\t\ti18n with plurals support and easy syntax.\n\t\n\tYou will like those projects coz they can be easily edited !\n\t\n\t---"
};

// create config 
exports.MARKDOWN_DATA_TYPE_EDIT_DATA = MARKDOWN_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: MARKDOWN_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Page",
  formData: {},
  input: MARKDOWN_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: MARKDOWN_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Page",
  formData: MARKDOWN_DATA_TYPE_CREATE_DATA,
  // pass created data here & we will modify with Edit data
  input: MARKDOWN_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: MARKDOWN_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Page",
  formData: MARKDOWN_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;