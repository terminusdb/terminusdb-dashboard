export const queryDescription = [ 
    {
      "id": "WOQL.eval",
      "longname": "WOQL.eval",
      "name": "eval",
      "kind": "member",
      "scope": "static",
      "description": "Evaluates the passed arithmetic expression and generates or matches the result value",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "object",
              "WOQLQuery",
              "string"
            ]
          },
          "description": "query or JSON-LD representing the query",
          "name": "arithExp"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "output variable",
          "name": "resultVarName"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "WOQLQuery"
        }
      ],
      "meta": {
        "lineno": 463,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 35
    },
    {
      "id": "WOQL.using",
      "longname": "WOQL.using",
      "name": "using",
      "kind": "function",
      "scope": "static",
      "description": "Query running against any specific commit Id",
      "memberof": "WOQL",
      "params": [
        { 
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "path to specific reference Id or commit Id",
          "name": "refPath"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "subquery for the specific commit point",
          "name": "subquery"
        }
      ],
      "examples": [
        "WOQL.using(\"userName/dbName/local/commit|branch/commitID\").triple(\"v:A\", \"v:B\", \"v:C\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 46,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 2
    },
    {
      "id": "WOQL.comment",
      "longname": "WOQL.comment",
      "name": "comment",
      "kind": "function",
      "scope": "static",
      "description": "Adds a text comment to a query - can also be used to wrap any part of a query to turn it off",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "text comment",
          "name": "comment"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "query that is \"commented out\"",
          "name": "subquery"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 56,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 3
    },
    {
      "id": "WOQL.select",
      "longname": "WOQL.select",
      "name": "select",
      "kind": "function",
      "scope": "static",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "variable": true,
          "description": "only these variables are returned",
          "name": "varNames"
        }
      ],
      "examples": [
        "WOQL.select(\"v:a\",triple(\"v:a\",\"v:b\",\"v:c\"))\nFilters the query so that only the variables included in [V1...Vn] are returned in the bindings"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 66,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 4
    },
    {
      "id": "WOQL.distinct",
      "longname": "WOQL.distinct",
      "name": "distinct",
      "kind": "function",
      "scope": "static",
      "description": "Filter the query to return only results that are distinct in the given variables",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "variable": true,
          "description": "these variables are guaranteed to be unique as a tuple",
          "name": "varNames"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 75,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 5
    },
    {
      "id": "WOQL.and",
      "longname": "WOQL.and",
      "name": "and",
      "kind": "function",
      "scope": "static",
      "description": "Logical conjunction of the contained queries - all queries must match or the entire clause fails",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "variable": true,
          "description": "A list of one or more woql queries to execute as a conjunction",
          "name": "subqueries"
        }
      ],
      "examples": [
        "//find triples that are of type scm:Journey, and have\n//a start_station v:Start, and that start_station is labeled\n//v:Start_Label\n\nWOQL.and(\n     WOQL.triple(\"v:Journey\", \"type\", \"scm:Journey\"),\n     WOQL.triple(\"v:Journey\", \"start_station\", \"v:Start\"),\n     WOQL.triple(\"v:Start\", \"label\", \"v:Start_Label\"))"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery object containing the conjunction of queries"
        }
      ],
      "meta": {
        "lineno": 95,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 6
    },
    {
      "id": "WOQL.or",
      "longname": "WOQL.or",
      "name": "or",
      "kind": "function",
      "scope": "static",
      "description": "Creates a logical OR of the arguments",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "variable": true,
          "description": "A list of one or more woql queries to execute as alternatives",
          "name": "subqueries"
        }
      ],
      "examples": [
        "or(\n  triple(\"v:Subject\", 'label', \"A\"),\n  triple(\"v:Subject\", \"label\", \"a\")\n )"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery object containing the logical Or of the subqueries"
        }
      ],
      "meta": {
        "lineno": 109,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 7
    },
    {
      "id": "WOQL.from",
      "longname": "WOQL.from",
      "name": "from",
      "kind": "function",
      "scope": "static",
      "description": "Specifies the database URL that will be the default database for the enclosed query",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef-"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "The query",
          "name": "query"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the from expression"
        }
      ],
      "meta": {
        "lineno": 120,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 8
    },
    {
      "id": "WOQL.into",
      "longname": "WOQL.into",
      "name": "into",
      "kind": "function",
      "scope": "static",
      "description": "Specifies the graph resource to write the contained query into",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef-"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "The query which will be written into the graph",
          "name": "subquery"
        }
      ],
      "examples": [
        "//Subq is an argument or a chained query\nusing(\"admin/minecraft\").into(\"instance/main\").add_triple(\"a\", \"type\", \"scm:X\")\n//writes a single tripe (doc:a, rdf:type, scm:X) into the main instance graph"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which will be written into the graph in question"
        }
      ],
      "meta": {
        "lineno": 135,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 9
    },
    {
      "id": "WOQL.triple",
      "longname": "WOQL.triple",
      "name": "triple",
      "kind": "function",
      "scope": "static",
      "description": "Creates a triple pattern matching rule for the triple [S, P, O] (Subject, Predicate, Object)",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 146,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 10
    },
    {
      "id": "WOQL.added_triple",
      "longname": "WOQL.added_triple",
      "name": "added_triple",
      "kind": "function",
      "scope": "static",
      "description": "Creates a triple pattern matching rule for the triple [S, P, O] (Subject, Predicate, Object) added in the current layer",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 157,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 11
    },
    {
      "id": "WOQL.removed_triple",
      "longname": "WOQL.removed_triple",
      "name": "removed_triple",
      "kind": "function",
      "scope": "static",
      "description": "Creates a triple pattern matching rule for the triple [S, P, O] (Subject, Predicate, Object) added in the current commit",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 168,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 12
    },
    {
      "id": "WOQL.quad",
      "longname": "WOQL.quad",
      "name": "quad",
      "kind": "function",
      "scope": "static",
      "description": "Creates a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph)",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 180,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 13
    },
    {
      "id": "WOQL.added_quad",
      "longname": "WOQL.added_quad",
      "name": "added_quad",
      "kind": "function",
      "scope": "static",
      "description": "Creates a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph) removed from the current commit",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef-"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 192,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 14
    },
    {
      "id": "WOQL.removed_quad",
      "longname": "WOQL.removed_quad",
      "name": "removed_quad",
      "kind": "function",
      "scope": "static",
      "description": "Creates a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph) removed from the current commit",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef-"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 204,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 15
    },
    {
      "id": "WOQL.sub",
      "longname": "WOQL.sub",
      "name": "sub",
      "kind": "function",
      "scope": "static",
      "description": "Returns true if ClassA subsumes ClassB, according to the current DB schema",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "ClassA",
          "name": "classA"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "ClassB",
          "name": "classB"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "boolean"
            ]
          },
          "description": "WOQLQuery"
        }
      ],
      "meta": {
        "lineno": 214,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 16
    },
    {
      "id": "WOQL.eq",
      "longname": "WOQL.eq",
      "name": "eq",
      "kind": "function",
      "scope": "static",
      "description": "Matches if a is equal to b",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "literal, variable or id",
          "name": "varName"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "literal, variable or id",
          "name": "varValue"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 228,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 17
    },
    {
      "id": "WOQL.substr",
      "longname": "WOQL.substr",
      "name": "substr",
      "kind": "function",
      "scope": "static",
      "description": "Substring",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "String or variable",
          "name": "string"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "integer or variable (characters from start to begin)",
          "name": "before"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "integer or variable (length of substring)",
          "name": "length"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "integer or variable (number of characters after substring)",
          "name": "after"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "String or variable",
          "name": "substring"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 243,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 18
    },
    {
      "id": "WOQL.update_object",
      "longname": "WOQL.update_object",
      "name": "update_object",
      "kind": "function",
      "scope": "static",
      "description": "Updates a document (or any object) in the db with the passed copy",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "JSON-LD document",
          "name": "JSON"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 253,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 19
    },
    {
      "id": "WOQL.delete_object",
      "longname": "WOQL.delete_object",
      "name": "delete_object",
      "kind": "function",
      "scope": "static",
      "description": "Deletes a node identified by an IRI or a JSON-LD document",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "object"
            ]
          },
          "description": "IRI or a JSON-LD document",
          "name": "JSON_or_IRI"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 262,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 20
    },
    {
      "id": "WOQL.read_object",
      "longname": "WOQL.read_object",
      "name": "read_object",
      "kind": "function",
      "scope": "static",
      "description": "Saves the entire document with IRI DocumentIRI into the JSONLD variable",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "either an IRI literal or a variable containing an IRI",
          "name": "IRI"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "a variable into which the document’s will be saved",
          "name": "output"
        },
        {
          "type": {
            "names": [
              "typedef.DataFormatObj"
            ]
          },
          "optional": true,
          "description": "the export format descriptor, default value is JSON-LD",
          "name": "formatObj"
        }
      ],
      "examples": [
        "const [mydoc] = vars(\"mydoc\")\nread_object(\"doc:a\", mydoc)\n//mydoc will have the json-ld document with ID doc:x stored in it"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the document retrieval expression"
        }
      ],
      "meta": {
        "lineno": 277,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 21
    },
    {
      "id": "WOQL.get",
      "longname": "WOQL.get",
      "name": "get",
      "kind": "function",
      "scope": "static",
      "description": "Retrieves the exernal resource defined by QueryResource and copies values from it into variables defined in AsVars",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "an array of AsVar variable mappings (see as for format below)",
          "name": "asvars"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "an external resource (remote, file, post) to query",
          "name": "queryResource"
        }
      ],
      "examples": [
        "let [a, b] = vars(\"a\", \"b\")\nget(as(\"a\", a).as(\"b\", b)).remote(\"http://my.url.com/x.csv\")\n//copies the values from column headed \"a\" into a variable a and from column\n//\"b\" into a variable b from remote CSV"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the get expression"
        }
      ],
      "meta": {
        "lineno": 292,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 22
    },
    {
      "id": "WOQL.put",
      "longname": "WOQL.put",
      "name": "put",
      "kind": "function",
      "scope": "static",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "an array of AsVar variable mappings (see as for format below)",
          "name": "varsToExp"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "The query which will be executed to produce the results",
          "name": "query"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "an file resource local to the server",
          "name": "fileResource"
        }
      ],
      "examples": [
        "let [s, p, o] = vars(\"Subject\", \"Predicate\", \"Object\")\nWOQL.put(WOQL.as(\"s\", s).as(\"p\", p).as(\"o\", o), WOQL.all())\n.file(\"/app/local_files/dump.csv\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the put expression"
        }
      ],
      "customTags": [
        {
          "tag": "put",
          "value": "Outputs the results of a query to a file"
        }
      ],
      "meta": {
        "lineno": 307,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 23
    },
    {
      "id": "WOQL.as",
      "longname": "WOQL.as",
      "name": "as",
      "kind": "function",
      "scope": "static",
      "description": "Imports the value identified by Source to a Target variable",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "Source",
          "name": "source"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "Target",
          "name": "target"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "type to cast value to string|number etc...",
          "name": "type"
        }
      ],
      "examples": [
        "WOQL.as(\"first var\", \"v:First_Var\", \"string\").as(\"second var\", \"v:Second_Var\")\n WOQL.as([\"first var\", \"v:First_Var\", \"string\"], [\"second var\", \"v:Second_Var\"])"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 322,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 24
    },
    {
      "id": "WOQL.remote",
      "longname": "WOQL.remote",
      "name": "remote",
      "kind": "function",
      "scope": "static",
      "description": "Identifies a remote resource by URL and specifies the format of the resource through the options",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The URL at which the remote resource can be accessed",
          "name": "url"
        },
        {
          "type": {
            "names": [
              "typedef.DataFormatObj"
            ]
          },
          "optional": true,
          "description": "The format of the resource data {}",
          "name": "formatObj"
        }
      ],
      "examples": [
        "remote(\"http://url.of.resource\", {type: \"csv\"})"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the remote resource identifier"
        }
      ],
      "meta": {
        "lineno": 335,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 25
    },
    {
      "id": "WOQL.file",
      "longname": "WOQL.file",
      "name": "file",
      "kind": "function",
      "scope": "static",
      "description": "Identifies a file resource as a path on the server and specifies the format through the options",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "The Path on the server at which the file resource can be accessed",
          "name": "url"
        },
        {
          "type": {
            "names": [
              "typedef.DataFormatObj"
            ]
          },
          "optional": true,
          "description": "imput options",
          "name": "formatObj"
        }
      ],
      "examples": [
        "file(\"/path/to/file\", {type: 'turtle'} )"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the file resource identifier"
        }
      ],
      "meta": {
        "lineno": 347,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 26
    },
    {
      "id": "WOQL.post",
      "longname": "WOQL.post",
      "name": "post",
      "kind": "function",
      "scope": "static",
      "description": "Identifies a resource as a local path on the client, to be sent to the server through a\nHTTP POST request, with the format defined through the options",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The Path on the server at which the file resource can be accessed",
          "name": "url"
        },
        {
          "type": {
            "names": [
              "typedef.DataFormatObj"
            ]
          },
          "optional": true,
          "description": "imput options, optional",
          "name": "formatObj"
        }
      ],
      "examples": [
        "post(\"/.../.../\", {type:'csv'})"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Post resource identifier"
        }
      ],
      "meta": {
        "lineno": 360,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 27
    },
    {
      "id": "WOQL.delete_triple",
      "longname": "WOQL.delete_triple",
      "name": "delete_triple",
      "kind": "function",
      "scope": "static",
      "description": "Deletes a single triple from the default graph of the database",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        }
      ],
      "examples": [
        "delete_triple(\"john\", \"age\", 42)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Triple Deletion statement"
        }
      ],
      "meta": {
        "lineno": 373,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 28
    },
    {
      "id": "WOQL.delete_quad",
      "longname": "WOQL.delete_quad",
      "name": "delete_quad",
      "kind": "function",
      "scope": "static",
      "description": "Deletes a single triple from the graph [Subject, Predicate, Object, Graph]",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef"
        }
      ],
      "examples": [
        "remove the class Person from the schema/main graph\nWOQL.delete_quad(\"Person\", \"type\", \"owl:Class\", \"schema/main\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Delete Quad Statement"
        }
      ],
      "meta": {
        "lineno": 387,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 29
    },
    {
      "id": "WOQL.add_triple",
      "longname": "WOQL.add_triple",
      "name": "add_triple",
      "kind": "function",
      "scope": "static",
      "description": "Adds triples according to the the pattern [subject,predicate,object]",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "WOQLQuery"
        }
      ],
      "meta": {
        "lineno": 398,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 30
    },
    {
      "id": "WOQL.add_quad",
      "longname": "WOQL.add_quad",
      "name": "add_quad",
      "kind": "function",
      "scope": "static",
      "description": "Adds quads according to the pattern [S,P,O,G]",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef-"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "WOQLQuery"
        }
      ],
      "meta": {
        "lineno": 410,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 31
    },
    {
      "id": "WOQL.when",
      "longname": "WOQL.when",
      "name": "when",
      "kind": "function",
      "scope": "static",
      "description": "When the subquery is met, the update query is executed",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "the condition query",
          "name": "subquery"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "name": "updateQuery"
        }
      ],
      "examples": [
        "when(true()).triple(\"a\", \"b\", \"c\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "-  A WOQLQuery which contains the when expression"
        }
      ],
      "meta": {
        "lineno": 425,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 32
    },
    {
      "id": "WOQL.trim",
      "longname": "WOQL.trim",
      "name": "trim",
      "kind": "function",
      "scope": "static",
      "description": "Remove whitespace from both sides of a string:",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A string or variable containing the untrimmed version of the string",
          "name": "inputStr"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A string or variable containing the trimmed version of the string",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "trim(\"hello   \",\"v:trimmed\")\n//trimmed contains \"hello\""
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Trim pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 439,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 33
    },
    {
      "id": "WOQL.evaluate",
      "longname": "WOQL.evaluate",
      "name": "evaluate",
      "kind": "function",
      "scope": "static",
      "description": "Evaluates the passed arithmetic expression and generates or matches the result value",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "object",
              "WOQLQuery",
              "string"
            ]
          },
          "description": "A WOQL query containing a valid WOQL Arithmetic Expression, which is evaluated by the function",
          "name": "arithExp"
        },
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "Either a variable, in which the result of the expression will be stored, or a numeric literal which will be used as a test of result of the evaluated expression",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "evaluate(plus(2, minus(3, 1)), \"v:result\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Arithmetic function"
        }
      ],
      "meta": {
        "lineno": 452,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 34
    },
    {
      "id": "WOQL.plus",
      "longname": "WOQL.plus",
      "name": "plus",
      "kind": "function",
      "scope": "static",
      "description": "Adds the numbers together",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "variable": true,
          "description": "a variable or numeric containing the values to add",
          "name": "args"
        }
      ],
      "examples": [
        "evaluate(plus(2, plus(3, 1)), \"v:result\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the addition expression"
        }
      ],
      "meta": {
        "lineno": 473,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 36
    },
    {
      "id": "WOQL.minus",
      "longname": "WOQL.minus",
      "name": "minus",
      "kind": "function",
      "scope": "static",
      "description": "Subtracts Numbers N1..Nn",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "variable": true,
          "description": "variable or numeric containing the value that will be subtracted from",
          "name": "args"
        }
      ],
      "examples": [
        "evaluate(minus(2.1, plus(0.2, 1)), \"v:result\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the subtraction expression"
        }
      ],
      "meta": {
        "lineno": 485,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 37
    },
    {
      "id": "WOQL.times",
      "longname": "WOQL.times",
      "name": "times",
      "kind": "function",
      "scope": "static",
      "description": "Multiplies numbers N1...Nn together",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "variable": true,
          "description": "a variable or numeric containing the value",
          "name": "args"
        }
      ],
      "examples": [
        "evaluate(times(10, minus(2.1, plus(0.2, 1))), \"v:result\")\n //result contains 9.000000000000002y"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the multiplication expression"
        }
      ],
      "meta": {
        "lineno": 498,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 38
    },
    {
      "id": "WOQL.divide",
      "longname": "WOQL.divide",
      "name": "divide",
      "kind": "function",
      "scope": "static",
      "description": "Divides numbers N1...Nn by each other left, to right precedence",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "variable": true,
          "description": "numbers to tbe divided",
          "name": "args"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the division expression\nevaluate(divide(times(10, minus(2.1, plus(0.2, 1))), 10), \"v:result\")\n //result contains 0.9000000000000001"
        }
      ],
      "meta": {
        "lineno": 510,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 39
    },
    {
      "id": "WOQL.div",
      "longname": "WOQL.div",
      "name": "div",
      "kind": "function",
      "scope": "static",
      "description": "Division - integer division - args are divided left to right",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "variable": true,
          "description": "numbers for division",
          "name": "args"
        }
      ],
      "examples": [
        "let [result] = vars(\"result\")\nevaluate(div(10, 3), result)\n//result contains 3"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the division expression"
        }
      ],
      "meta": {
        "lineno": 524,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 40
    },
    {
      "id": "WOQL.exp",
      "longname": "WOQL.exp",
      "name": "exp",
      "kind": "function",
      "scope": "static",
      "description": "Exponent - raises varNum01 to the power of varNum02",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "a variable or numeric containing the number to be raised to the power of the second number",
          "name": "varNum"
        },
        {
          "type": {
            "names": [
              "number"
            ]
          },
          "description": "a variable or numeric containing the exponent",
          "name": "expNum"
        }
      ],
      "examples": [
        "evaluate(exp(3, 2), \"v:result\")\n//result contains 9"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the exponent expression"
        }
      ],
      "meta": {
        "lineno": 543,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 41
    },
    {
      "id": "WOQL.floor",
      "longname": "WOQL.floor",
      "name": "floor",
      "kind": "function",
      "scope": "static",
      "description": "Generates the nearest lower integer to the passed number",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "Variable or numeric containing the number to be floored",
          "name": "varNum"
        }
      ],
      "examples": [
        "let [result] = vars(\"result\")\nevaluate(divide(floor(times(10, minus(2.1, plus(0.2, 1)))), 10), result)\n//result contains 0.9 - floating point error removed"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the floor expression"
        }
      ],
      "meta": {
        "lineno": 557,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 42
    },
    {
      "id": "WOQL.isa",
      "longname": "WOQL.isa",
      "name": "isa",
      "kind": "function",
      "scope": "static",
      "description": "Tests whether a given instance IRI has type Class, according to the current state of the DB",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A string IRI or a variable that identify the class instance",
          "name": "instanceIRI"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A Class IRI or a variable",
          "name": "classId"
        }
      ],
      "examples": [
        "let [subject] = vars(\"subject\")\nisa(subject, \"Person\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the type test"
        }
      ],
      "meta": {
        "lineno": 571,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 43
    },
    {
      "id": "WOQL.like",
      "longname": "WOQL.like",
      "name": "like",
      "kind": "function",
      "scope": "static",
      "description": "Generates a string Leverstein distance measure between stringA and stringB",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string literal or variable representing a string to be compared",
          "name": "stringA"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string literal or variable representing the other string to be compared",
          "name": "stringB"
        },
        {
          "type": {
            "names": [
              "number",
              "string"
            ]
          },
          "description": "variable representing the distance between the variables",
          "name": "distance"
        }
      ],
      "examples": [
        "let [dist] = vars('dist')\nlike(\"hello\", \"hallo\", dist)\n//dist contains 0.7265420560747664"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Like pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 587,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 44
    },
    {
      "id": "WOQL.less",
      "longname": "WOQL.less",
      "name": "less",
      "kind": "function",
      "scope": "static",
      "description": "Compares the value of v1 against v2 and returns true if v1 is less than v2",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "a variable or numeric containing the number to be compared",
          "name": "varNum01"
        },
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "a variable or numeric containing the second comporator",
          "name": "varNum02"
        }
      ],
      "examples": [
        "less(1, 1.1).eq(\"v:result\", literal(true, \"boolean\"))\n//result contains true"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the comparison expression"
        }
      ],
      "meta": {
        "lineno": 601,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 45
    },
    {
      "id": "WOQL.greater",
      "longname": "WOQL.greater",
      "name": "greater",
      "kind": "function",
      "scope": "static",
      "description": "Compares the value of v1 against v2 and returns true if v1 is greater than v2",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "a variable or numeric containing the number to be compared",
          "name": "varNum01"
        },
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "a variable or numeric containing the second comporator",
          "name": "varNum02"
        }
      ],
      "examples": [
        "greater(1.2, 1.1).eq(\"v:result\", literal(true, \"boolean\"))\n//result contains true"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the comparison expression"
        }
      ],
      "meta": {
        "lineno": 615,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 46
    },
    {
      "id": "WOQL.opt",
      "longname": "WOQL.opt",
      "name": "opt",
      "kind": "function",
      "scope": "static",
      "description": "Specifies that the Subquery is optional - if it does not match the query will not fail",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "A subquery which will be optionally matched",
          "name": "subquery"
        }
      ],
      "examples": [
        "let [subject] = vars(\"subject\")\nopt(triple(subject, 'label', \"A\"))\n//Subq is an argument or a chained query\nopt().triple(subject, 'label', \"A\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the optional sub Query"
        }
      ],
      "meta": {
        "lineno": 630,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 47
    },
    {
      "id": "WOQL.unique",
      "longname": "WOQL.unique",
      "name": "unique",
      "kind": "function",
      "scope": "static",
      "description": "Generate a new IRI from the prefix and a hash of the variables which will be unique for any given combination of variables",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A prefix for the IRI - typically formed of the doc prefix and the classtype of the entity (“doc:Person”)",
          "name": "prefix"
        },
        {
          "type": {
            "names": [
              "array",
              "string"
            ]
          },
          "description": "An array of variables and / or strings from which the unique hash will be generated",
          "name": "inputVarList"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "Variable in which the unique ID is stored",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "unique(\"doc:Person\", [\"John\", \"Smith\"], \"v:newid\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the unique ID generating function"
        }
      ],
      "meta": {
        "lineno": 646,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 48
    },
    {
      "id": "WOQL.idgen",
      "longname": "WOQL.idgen",
      "name": "idgen",
      "kind": "function",
      "scope": "static",
      "description": "Generate a new IRI from the prefix and concatention of the variables",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A prefix for the IRI - typically formed of the doc prefix and the classtype of the entity (“doc:Person”)",
          "name": "prefix"
        },
        {
          "type": {
            "names": [
              "array",
              "string"
            ]
          },
          "description": "An array of variables and / or strings from which the unique hash will be generated",
          "name": "inputVarList"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "Variable in which the unique ID is stored",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "let [newid] = vars(\"newid\")\nidgen(\"doc:Person\", [\"John\", \"Smith\"], newid)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the ID generating function"
        }
      ],
      "meta": {
        "lineno": 661,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 49
    },
    {
      "id": "WOQL.upper",
      "longname": "WOQL.upper",
      "name": "upper",
      "kind": "function",
      "scope": "static",
      "description": "Changes a string to upper-case",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string or variable representing the uncapitalized string",
          "name": "inputVarName"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "variable that stores the capitalized string output",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "upper(\"aBCe\", \"v:allcaps\")\n//upper contains \"ABCE\""
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Upper case pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 676,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 50
    },
    {
      "id": "WOQL.lower",
      "longname": "WOQL.lower",
      "name": "lower",
      "kind": "function",
      "scope": "static",
      "description": "Changes a string to lower-case",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string or variable representing the non-lowercased string",
          "name": "inputVarName"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "variable that stores the lowercased string output",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "let [lower] = var(\"l\")\nlower(\"aBCe\", lower)\n//lower contains \"abce\""
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Lower case pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 691,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 51
    },
    {
      "id": "WOQL.pad",
      "longname": "WOQL.pad",
      "name": "pad",
      "kind": "function",
      "scope": "static",
      "description": "Pads out the string input to be exactly len long by appending the pad character pad to form output",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The input string or variable in unpadded state",
          "name": "inputVarName"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The characters to use to pad the string or a variable representing them",
          "name": "pad"
        },
        {
          "type": {
            "names": [
              "number",
              "string"
            ]
          },
          "description": "The variable or integer value representing the length of the output string",
          "name": "len"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "stores output",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "let [fixed] = vars(\"fixed length\")\npad(\"joe\", \" \", 8, fixed)\n//fixed contains \"joe     \""
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Pad pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 708,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 52
    },
    {
      "id": "WOQL.split",
      "longname": "WOQL.split",
      "name": "split",
      "kind": "function",
      "scope": "static",
      "description": "Splits a string (Input) into a list strings (Output) by removing separator",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A string or variable representing the unsplit string",
          "name": "inputVarName"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A string or variable containing a sequence of charatcters to use as a separator",
          "name": "separator"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "variable that stores output list",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "split(\"joe has a hat\", \" \", \"v:words\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Split pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 721,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 53
    },
    {
      "id": "WOQL.member",
      "longname": "WOQL.member",
      "name": "member",
      "kind": "function",
      "scope": "static",
      "description": "Matches if List includes Element",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "object"
            ]
          },
          "description": "Either a variable, IRI or any simple datatype",
          "name": "element"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "List ([string, literal] or string*) Either a variable representing a list or a list of variables or literals",
          "name": "list"
        }
      ],
      "examples": [
        "let [name] = vars(\"name\")\nmember(\"name\", [\"john\", \"joe\", \"frank\"])"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the List inclusion pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 734,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 54
    },
    {
      "id": "WOQL.concat",
      "longname": "WOQL.concat",
      "name": "concat",
      "kind": "function",
      "scope": "static",
      "description": "takes a variable number of string arguments and concatenates them into a single string",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "array",
              "string"
            ]
          },
          "description": "a variable representing a list or a list of variables or strings - variables can be embedded in the string if they do not contain spaces",
          "name": "varList"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A variable or string containing the output string",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "concat([\"v:first_name\", \" \", \"v:last_name\"], \"v:full_name\")\nWOQL.concat([\"first_name\", \" \", \"last_name\"], \"full_name\")\n//both versions work"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Concatenation pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 749,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 55
    },
    {
      "id": "WOQL.join",
      "longname": "WOQL.join",
      "name": "join",
      "kind": "function",
      "scope": "static",
      "description": "Joins a list variable together (Input) into a string variable (Output) by glueing the strings together with Glue",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "array"
            ]
          },
          "description": "a variable representing a list or a list of strings and / or variables",
          "name": "varList"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A variable (v:glue) or (glue) string representing the characters to put in between the joined strings in input",
          "name": "glue"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A variable or string containing the output string",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "join([\"joe\", \"has\", \"a\", \"hat\", \" \", \"v:sentence\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Join pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 763,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 56
    },
    {
      "id": "WOQL.sum",
      "longname": "WOQL.sum",
      "name": "sum",
      "kind": "function",
      "scope": "static",
      "description": "computes the sum of the List of values passed. In contrast to other arithmetic functions, sum self-evaluates - it does not have to be passed to evaluate()",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "a subquery or ([string or numeric]) - a list variable, or a list of variables or numeric literals",
          "name": "subquery"
        },
        {
          "type": {
            "names": [
              "number"
            ]
          },
          "description": "the variable name with the sum result of the values in List",
          "name": "total"
        }
      ],
      "examples": [
        "sum([2, 3, 4, 5], \"v:total\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Sum expression"
        }
      ],
      "meta": {
        "lineno": 775,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 57
    },
    {
      "id": "WOQL.start",
      "longname": "WOQL.start",
      "name": "start",
      "kind": "function",
      "scope": "static",
      "description": "Specifies an offset position in the results to start listing results from",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "number",
              "string"
            ]
          },
          "description": "A variable that refers to an interger or an integer literal",
          "name": "start"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "WOQL Query object, you can pass a subquery as an argument or a chained query",
          "name": "subquery"
        }
      ],
      "examples": [
        "let [a, b, c] = vars(\"a\", \"b\", \"c\")\nstart(100).triple(a, b, c)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery whose results will be returned starting from the specified offset"
        }
      ],
      "meta": {
        "lineno": 789,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 58
    },
    {
      "id": "WOQL.limit",
      "longname": "WOQL.limit",
      "name": "limit",
      "kind": "function",
      "scope": "static",
      "description": "Specifies a maximum number of results that will be returned from the subquery",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "number",
              "string"
            ]
          },
          "description": "A variable that refers to an non-negative integer or a non-negative integer",
          "name": "limit"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "A subquery whose results will be limited",
          "name": "subquery"
        }
      ],
      "examples": [
        "let [a, b, c] = vars(\"a\", \"b\", \"c\")\nlimit(100).triple(a, b, c)\n//subquery is an argument or a chained query\nlimit(100,triple(a, b, c))"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery whose results will be returned starting from the specified offset"
        }
      ],
      "meta": {
        "lineno": 805,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 59
    },
    {
      "id": "WOQL.re",
      "longname": "WOQL.re",
      "name": "re",
      "kind": "function",
      "scope": "static",
      "description": "Matches the regular expression defined in Patern against the Test string, to produce the matched patterns in Matches",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string or variable using normal PCRE regular expression syntax with the exception that special characters have to be escaped twice (to enable transport in JSONLD)",
          "name": "pattern"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string or variable containing the string to be tested for patterns with the regex",
          "name": "inputVarName"
        },
        {
          "type": {
            "names": [
              "string",
              "array",
              "object"
            ]
          },
          "description": "variable representing the list of matches or a list of strings or variables",
          "name": "resultVarList"
        }
      ],
      "examples": [
        "WOQL.re(\"h(.).*\", \"hello\", [\"v:All\", \"v:Sub\"])\n//e contains 'e', llo contains 'llo'\n//p is a regex pattern (.*) using normal regular expression syntax, the only unusual thing is that special characters have to be escaped twice, s is the string to be matched and m is a list of matches:"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Regular Expression pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 821,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 60
    },
    {
      "id": "WOQL.length",
      "longname": "WOQL.length",
      "name": "length",
      "kind": "function",
      "scope": "static",
      "description": "Calculates the length of the list in va and stores it in vb",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "array"
            ]
          },
          "description": "Either a variable representing a list or a list of variables or literals",
          "name": "inputVarList"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A variable in which the length of the list is stored or the length of the list as a non-negative integer",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "let [count] = vars(\"count\")\nlength([\"john\", \"joe\", \"frank\"], count)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the Length pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 836,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 61
    },
    {
      "id": "WOQL.not",
      "longname": "WOQL.not",
      "name": "not",
      "kind": "function",
      "scope": "static",
      "description": "Logical negation of the contained subquery - if the subquery matches, the query will fail to match",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "A subquery which will be negated",
          "name": "subquery"
        }
      ],
      "examples": [
        "let [subject, label] = vars(\"subject\", \"label\")\nnot().triple(subject, 'label', label)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the negated sub Query"
        }
      ],
      "meta": {
        "lineno": 849,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 62
    },
    {
      "id": "WOQL.once",
      "longname": "WOQL.once",
      "name": "once",
      "kind": "function",
      "scope": "static",
      "description": "Results in one solution of the subqueries",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "WOQL Query objects",
          "name": "subquery"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the once sub Query"
        }
      ],
      "meta": {
        "lineno": 858,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 63
    },
    {
      "id": "WOQL.immediately",
      "longname": "WOQL.immediately",
      "name": "immediately",
      "kind": "function",
      "scope": "static",
      "description": "Runs the query without backtracking on side-effects",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "WOQL Query objects",
          "name": "subquery"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the immediately sub Query"
        }
      ],
      "meta": {
        "lineno": 867,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 64
    },
    {
      "id": "WOQL.count",
      "longname": "WOQL.count",
      "name": "count",
      "kind": "function",
      "scope": "static",
      "description": "Creates a count of the results of the query",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "variable or integer count",
          "name": "countVarName"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "name": "subquery"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the count sub Query"
        }
      ],
      "meta": {
        "lineno": 877,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 65
    },
    {
      "id": "WOQL.typecast",
      "longname": "WOQL.typecast",
      "name": "typecast",
      "kind": "function",
      "scope": "static",
      "description": "Casts the value of Input to a new value of type Type and stores the result in CastVar",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "number",
              "object"
            ]
          },
          "description": "Either a single variable or a literal of any basic type",
          "name": "varName"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "Either a variable or a basic datatype (xsd / xdd)",
          "name": "varType"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "save the return variable",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "cast(\"22/3/98\", \"xsd:dateTime\", \"v:time\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the casting expression"
        }
      ],
      "meta": {
        "lineno": 891,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 66
    },
    {
      "id": "WOQL.order_by",
      "longname": "WOQL.order_by",
      "name": "order_by",
      "kind": "function",
      "scope": "static",
      "description": "Orders the results of the contained subquery by a precedence list of variables",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "variable": true,
          "description": "A sequence of variables, by which to order the results, each optionally followed by either “asc” or “desc” to represent order",
          "name": "varNames"
        }
      ],
      "examples": [
        "WOQL.order_by(\"v:A\", \"v:B asc\", \"v:C desc\").triple(\"v:A\", \"v:B\", \"v:C\");"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the ordering expression"
        }
      ],
      "meta": {
        "lineno": 903,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 67
    },
    {
      "id": "WOQL.group_by",
      "longname": "WOQL.group_by",
      "name": "group_by",
      "kind": "function",
      "scope": "static",
      "description": "Groups the results of the contained subquery on the basis of identical values for Groupvars, extracts the patterns defined in PatternVars and stores the results in GroupedVar",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "array",
              "string"
            ]
          },
          "description": "Either a single variable or an array of variables",
          "name": "varList"
        },
        {
          "type": {
            "names": [
              "array",
              "string"
            ]
          },
          "description": "Either a single variable or an array of variables",
          "name": "patternVars"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "output variable name",
          "name": "resultVarName"
        },
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "optional": true,
          "description": "The query whose results will be grouped",
          "name": "subquery"
        }
      ],
      "examples": [
        "//subquery is an argument or a chained query\nlet [age, last_name, first_name, age_group, person] = vars(\"age\", \"last name\", \"first name\", \"age group\", \"person\")\ngroup_by(age, [last_name, first_name], age_group)\n  .triple(person, \"first_name\", first_name)\n  .triple(person, \"last_name\", last_name)\n  .triple(person, \"age\", age)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the grouping expression"
        }
      ],
      "meta": {
        "lineno": 923,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 68
    },
    {
      "id": "WOQL.true",
      "longname": "WOQL.true",
      "name": "true",
      "kind": "function",
      "scope": "static",
      "description": "A function that always matches, always returns true",
      "memberof": "WOQL",
      "examples": [
        "when(true()).triple(\"a\", \"b\", \"c\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the true value that will match any pattern"
        }
      ],
      "meta": {
        "lineno": 934,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 69
    },
    {
      "id": "WOQL.path",
      "longname": "WOQL.path",
      "name": "path",
      "kind": "function",
      "scope": "static",
      "description": "Performs a path regular expression match on the graph",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "An IRI or variable that refers to an IRI representing the subject, i.e. the starting point of the path",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "(string) - A path regular expression describing a pattern through multiple edges of the graph\nPath regular expressions consist of a sequence of predicates and / or a set of alternatives, with quantification operators\nThe characters that are interpreted specially are the following:\n| representing alternative choices\n, - representing a sequence of predcitates\n+ - Representing a quantification of 1 or more of the preceding pattern in a sequence\n{min, max} - Representing at least min examples and at most max examples of the preceding pattern\n- Representing any predicate\n() - Parentheses, interpreted in the normal way to group clauses",
          "name": "pattern"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "An IRI or variable that refers to an IRI representing the object, i.e. ending point of the path",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A variable in which the actual paths traversed will be stored",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "let [person, grand_uncle, lineage] = vars(\"person\", \"grand uncle\", \"lineage\")\npath(person, ((father|mother) {2,2}), brother), grand_uncle, lineage)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the path regular expression matching expression"
        }
      ],
      "meta": {
        "lineno": 958,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 70
    },
    {
      "id": "WOQL.size",
      "longname": "WOQL.size",
      "name": "size",
      "kind": "function",
      "scope": "static",
      "description": "Calculates the size in bytes of the contents of the resource identified in ResourceID",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A valid resource identifier string (can refer to any graph / branch / commit / db)",
          "name": "resourceId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The variable name",
          "name": "resultVarName"
        }
      ],
      "examples": [
        "size(\"admin/minecraft/local/branch/main/instance/main\", \"v:varSize\")\n//returns the number of bytes in the main instance graph on the main branch"
      ],
      "meta": {
        "lineno": 971,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 71
    },
    {
      "id": "WOQL.triple_count",
      "longname": "WOQL.triple_count",
      "name": "triple_count",
      "kind": "function",
      "scope": "static",
      "description": "Calculates the number of triples of the contents of the resource identified in ResourceID",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "A valid resource identifier string (can refer to any graph / branch / commit / db)",
          "name": "resourceId"
        },
        {
          "type": {
            "names": [
              "string",
              "number"
            ]
          },
          "description": "An integer literal with the size in bytes or a variable containing that integer",
          "name": "tripleCount"
        }
      ],
      "examples": [
        "let [tc] = vars(\"s\")\ntriple_count(\"admin/minecraft/local/_commits\", tc)\n//returns the number of bytes in the local commit graph"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the size expression"
        }
      ],
      "meta": {
        "lineno": 986,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 72
    },
    {
      "id": "WOQL.type_of",
      "longname": "WOQL.type_of",
      "name": "type_of",
      "kind": "function",
      "scope": "static",
      "description": "Returns true if 'elementId' is of type 'elementType', according to the current DB schema",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the id of a schema graph element",
          "name": "elementId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the element type",
          "name": "elementType"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery object containing the type_of pattern matching rule"
        }
      ],
      "meta": {
        "lineno": 997,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 73
    },
    {
      "id": "WOQL.star",
      "longname": "WOQL.star",
      "name": "star",
      "kind": "function",
      "scope": "static",
      "description": "Generates a query that by default matches all triples in a graph identified by \"graph\" or in all the current terminusDB's graph",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "boolean"
            ]
          },
          "optional": true,
          "description": "false or the resource identifier of a graph possible value are schema/{main - myschema - *} | instance/{main - myschema - *}  | inference/{main - myschema - *}",
          "name": "graph"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The IRI of a triple’s subject or a variable,  default value \"v:Subject\"",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The IRI of a property or a variable, default value \"v:Predicate\"",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The IRI of a node or a variable, or a literal,  default value \"v:Object\"",
          "name": "object"
        }
      ],
      "examples": [
        "star(\"schema/main\")\n//will return every triple in schema/main graph"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 1013,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 74
    },
    {
      "id": "WOQL.all",
      "longname": "WOQL.all",
      "name": "all",
      "kind": "function",
      "scope": "static",
      "description": "Generates a query that by default matches all triples in a graph - identical to star() except for order of arguments",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a graph possible value are schema/{main - myschema - *} | instance/{main - myschema - *}  | inference/{main - myschema - *}",
          "name": "graphRef"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the pattern matching expression\nall(\"mydoc\")\n//will return every triple in the instance/main graph that has \"doc:mydoc\" as its subject"
        }
      ],
      "meta": {
        "lineno": 1028,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 75
    },
    {
      "id": "WOQL.node",
      "longname": "WOQL.node",
      "name": "node",
      "kind": "function",
      "scope": "static",
      "description": "Specifies the identity of a node that can then be used in subsequent builder functions. Note that node() requires subsequent chained functions to complete the triples / quads that it produces - by itself it only generates the subject.",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable containing an IRI which will be the subject of the builder functions",
          "name": "nodeid"
        },
        {
          "type": {
            "names": [
              "typedef.FuntionType"
            ]
          },
          "optional": true,
          "description": "Optional type of builder function to build  (default is triple)",
          "name": "chainType"
        }
      ],
      "examples": [
        "node(\"mydoc\").label(\"my label\")\n//equivalent to triple(\"mydoc\", \"label\", \"my label\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the partial Node pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 1042,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 76
    },
    {
      "id": "WOQL.insert",
      "longname": "WOQL.insert",
      "name": "insert",
      "kind": "function",
      "scope": "static",
      "description": "Inserts a single triple into the database declaring the Node to have type Type, optionally into the specified graph",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI string or variable containing the IRI of the node to be inserted",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI string or variable containing the IRI of the type of the node (class/document name)",
          "name": "classType"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "Optional Graph resource identifier",
          "name": "graphRef"
        }
      ],
      "examples": [
        "insert(\"mydoc\", \"MyType\")\n//equivalent to add_triple(\"mydoc\", \"type\", \"MyType\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the insert expression"
        }
      ],
      "meta": {
        "lineno": 1057,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 77
    },
    {
      "id": "WOQL.schema",
      "longname": "WOQL.schema",
      "name": "schema",
      "kind": "function",
      "scope": "static",
      "description": "Generates an empty query object - identical to query - included for backwards compatibility as before v3.0, the schema functions were in their own namespace.",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "Resource String identifying the graph which will be used for subsequent chained schema calls",
          "name": "graphRef"
        }
      ],
      "examples": [
        "schema(\"schema/dev\").add_class(\"X\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "An empty WOQLQuery with the internal schema graph pointes set to Graph"
        }
      ],
      "meta": {
        "lineno": 1069,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 78
    },
    {
      "id": "WOQL.graph",
      "longname": "WOQL.graph",
      "name": "graph",
      "kind": "function",
      "scope": "static",
      "description": "Sets the graph resource ID that will be used for subsequent chained function calls",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "Resource String identifying the graph which will be used for subsequent chained schema calls",
          "name": "graphRef"
        }
      ],
      "examples": [
        "node(\"MyClass\", \"AddQuad\").graph(\"schema/main\").label(\"My Class Label\")\n//equivalent to add_quad(\"MyClass\", \"label\", \"My Class Label\", \"schema/main\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the partial Graph pattern matching expression"
        }
      ],
      "meta": {
        "lineno": 1084,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 79
    },
    {
      "id": "WOQL.add_class",
      "longname": "WOQL.add_class",
      "name": "add_class",
      "kind": "function",
      "scope": "static",
      "description": "Generates a new Class with the given ClassID and writes it to the DB schema",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI or variable containing IRI of the new class to be added (prefix default to scm)",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "Optional Resource String identifying the schema graph into which the class definition will be written",
          "name": "schemaGraph"
        }
      ],
      "examples": [
        "add_class(\"MyClass\")\n//equivalent to add_quad(\"MyClass\", \"type\", \"owl:Class\", \"schema/main\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the add class expression"
        }
      ],
      "meta": {
        "lineno": 1098,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 80
    },
    {
      "id": "WOQL.add_property",
      "longname": "WOQL.add_property",
      "name": "add_property",
      "kind": "function",
      "scope": "static",
      "description": "Generates a new Property with the given PropertyID and a range of type and writes it to the DB schema",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI or variable containing IRI of the new property to be added (prefix default to scm)",
          "name": "propId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "optional IRI or variable containing IRI of the range type of the new property (defaults to xsd:string)",
          "name": "propType"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "Optional Resource String identifying the schema graph into which the property definition will be written",
          "name": "schemaGraph"
        }
      ],
      "examples": [
        "add_property(\"myprop\")\n//equivalent to add_quad(\"myprop\", \"type\", \"owl:DatatypeProperty\", \"schema/main\")\n//.add_quad(\"myprop\", \"range\", \"xsd:string\", \"schema/main\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the add property expression"
        }
      ],
      "meta": {
        "lineno": 1113,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 81
    },
    {
      "id": "WOQL.delete_class",
      "longname": "WOQL.delete_class",
      "name": "delete_class",
      "kind": "function",
      "scope": "static",
      "description": "Deletes the Class with the passed ID form the schema (and all references to it)",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI or variable containing IRI of the class to be deleted (prefix default to scm)",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "Optional Resource String identifying the schema graph",
          "name": "schemaGraph"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "The var name, default value \"v:Class\"",
          "name": "classVarName"
        }
      ],
      "examples": [
        "delete_class(\"MyClass\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the class deletion expression"
        }
      ],
      "meta": {
        "lineno": 1126,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 82
    },
    {
      "id": "WOQL.delete_property",
      "longname": "WOQL.delete_property",
      "name": "delete_property",
      "kind": "function",
      "scope": "static",
      "description": "Deletes a property from the schema and all its references incoming and outgoing",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI or a variable containing IRI of the property to be deleted (prefix defaults to scm)",
          "name": "propId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "Resource String identifying the schema graph from which the property definition will be deleted",
          "name": "schemaGraph"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "name": "propVarName"
        }
      ],
      "examples": [
        "delete_property(\"MyProp\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the property deletion expression"
        }
      ],
      "meta": {
        "lineno": 1140,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 83
    },
    {
      "id": "WOQL.doctype",
      "longname": "WOQL.doctype",
      "name": "doctype",
      "kind": "function",
      "scope": "static",
      "description": "Creates a new document class in the schema",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "IRI or variable containing IRI of the new document class to be added (prefix default to scm)",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "Resource String identifying the schema graph from which the document definition will be added",
          "name": "schemaGraph"
        }
      ],
      "examples": [
        "doctype(\"MyClass\")\n//equivalent to add_quad(\"MyClass\", \"type\", \"owl:Class\", \"schema/main\")\n//.add_quad(\"MyClass\", \"subClassOf\", \"system:Document\", \"schema/main\")"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the add document class expression"
        }
      ],
      "meta": {
        "lineno": 1155,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 84
    },
    {
      "id": "WOQL.insert_data",
      "longname": "WOQL.insert_data",
      "name": "insert_data",
      "kind": "function",
      "scope": "static",
      "description": "Inserts data as an object - enabling multiple property values to be inserted in one go",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "json object which contains fields:\nmandatory: id, type\noptional: label, description, [property] (valid property ids)",
          "name": "dataObj"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "al graph resource identifier (defaults to “instance/main” if no using or into is specified)",
          "name": "instanceGraph"
        }
      ],
      "examples": [
        "let data = {id: \"doc:joe\",\n  type: \"Person\",\n  label: \"Joe\",\n  description: \"My friend Joe\",\n  age: 42\n }\n insert_data(data)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the insertion expression"
        }
      ],
      "meta": {
        "lineno": 1180,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 85
    },
    {
      "id": "WOQL.insert_class_data",
      "longname": "WOQL.insert_class_data",
      "name": "insert_class_data",
      "kind": "function",
      "scope": "static",
      "description": "Inserts data about a class as a json object - enabling a class and all its properties to be specified in a single function",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.ClassObj"
            ]
          },
          "description": "with id, label, description, parent and properties",
          "name": "classObj"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value is schema/main",
          "name": "schemaGraph"
        }
      ],
      "examples": [
        "let data = { id: \"Robot\", label: \"Robot\", parent: [\"MyClass001\", \"MyClass002\"]}\ninsert_class_data(data)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the insertion expression"
        }
      ],
      "meta": {
        "lineno": 1194,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 86
    },
    {
      "id": "WOQL.insert_doctype_data",
      "longname": "WOQL.insert_doctype_data",
      "name": "insert_doctype_data",
      "kind": "function",
      "scope": "static",
      "description": "Inserts data about a class as a json object - enabling a class and all its properties to be specified in a single function",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.ClassObj"
            ]
          },
          "description": "with id, label, description, parent and properties",
          "name": "classObj"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value is schema/main",
          "name": "schemaGraph"
        }
      ],
      "examples": [
        "let data = {\n  id: \"Person\",\n  label: \"Person\",\n  age: {\n      label: \"Age\",\n      range: \"xsd:integer\",\n      max: 1\n   }\n}\ninsert_doctype_data(data)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the insertion expression"
        }
      ],
      "meta": {
        "lineno": 1215,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 87
    },
    {
      "id": "WOQL.insert_property_data",
      "longname": "WOQL.insert_property_data",
      "name": "insert_property_data",
      "kind": "function",
      "scope": "static",
      "description": "Inserts data about a document class as a json object - enabling a document class and all its properties to be specified in a single function",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.PropertyObj"
            ]
          },
          "description": "json object which contains fields:",
          "name": "propObj"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value id schema/main",
          "name": "schemaGraph"
        }
      ],
      "examples": [
        "let data = {\n  id: \"prop\",\n  label: \"Property\",\n  description: \"prop desc\",\n  range: \"X\",\n  domain: \"X\",\n  max: 2,\n  min: 1}\n  insert_property_data(data)"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the insertion expression"
        }
      ],
      "meta": {
        "lineno": 1235,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 88
    },
    {
      "id": "WOQL.nuke",
      "longname": "WOQL.nuke",
      "name": "nuke",
      "kind": "function",
      "scope": "static",
      "description": "Deletes all triples in the passed graph (defaults to instance/main)",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "Resource String identifying the graph from which all triples will be removed",
          "name": "graphRef"
        }
      ],
      "examples": [
        "nuke(\"schema/main\")\n//will delete everything from the schema/main graph"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the deletion expression"
        }
      ],
      "meta": {
        "lineno": 1247,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 89
    },
    {
      "id": "WOQL.query",
      "longname": "WOQL.query",
      "name": "query",
      "kind": "function",
      "scope": "static",
      "description": "Generates an empty WOQLQuery object",
      "memberof": "WOQL",
      "examples": [
        "let q = query()\n//then q.triple(1, 1) ..."
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 1258,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 90
    },
    {
      "id": "WOQL.json",
      "longname": "WOQL.json",
      "name": "json",
      "kind": "function",
      "scope": "static",
      "description": "Generates a WOQLQuery object from the passed WOQL JSON - if an argument is passed, the query object is created from it, if none is passed, the current state is returned as a JSON-LD",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "optional": true,
          "description": "JSON-LD woql document encoding a query",
          "name": "JSON_LD"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery",
              "object"
            ]
          },
          "description": "either a JSON-LD or a WOQLQuery object\n\njson version of query for passing to api"
        }
      ],
      "meta": {
        "lineno": 1269,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 91
    },
    {
      "id": "WOQL.string",
      "longname": "WOQL.string",
      "name": "string",
      "kind": "function",
      "scope": "static",
      "description": "Generates explicitly a JSON-LD string literal from the input",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string",
              "boolean",
              "number"
            ]
          },
          "description": "any primitive literal type",
          "name": "val"
        }
      ],
      "examples": [
        "string(1)\n//returns { \"@type\": \"xsd:string\", \"@value\": \"1\" }"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "- A JSON-LD string literal"
        }
      ],
      "meta": {
        "lineno": 1285,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 92
    },
    {
      "id": "WOQL.literal",
      "longname": "WOQL.literal",
      "name": "literal",
      "kind": "function",
      "scope": "static",
      "description": "Generates explicitly a JSON-LD string literal from the input",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "any literal type",
          "name": "val"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "an xsd or xdd type",
          "name": "type"
        }
      ],
      "examples": [
        "literal(1, \"nonNegativeInteger\")\n//returns { \"@type\": \"xsd:nonNegativeInteger\", \"@value\": 1 }"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "- A JSON-LD literal"
        }
      ],
      "meta": {
        "lineno": 1298,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 93
    },
    {
      "id": "WOQL.iri",
      "longname": "WOQL.iri",
      "name": "iri",
      "kind": "function",
      "scope": "static",
      "description": "Explicitly sets a value to be an IRI - avoiding automatic type marshalling",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "string which will be treated as an IRI",
          "name": "val"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "object"
            ]
          },
          "description": "- A JSON-LD IRI value"
        }
      ],
      "meta": {
        "lineno": 1307,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 94
    },
    {
      "id": "WOQL.vars",
      "longname": "WOQL.vars",
      "name": "vars",
      "kind": "function",
      "scope": "static",
      "description": "Generates javascript variables for use as WOQL variables within a query",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "variable": true,
          "name": "varNames"
        }
      ],
      "examples": [
        "const [a, b, c] = WOQL.vars(\"a\", \"b\", \"c\")\n//a, b, c are javascript variables which can be used as WOQL variables in subsequent queries"
      ],
      "returns": [
        {
          "type": {
            "names": [
              "array"
            ]
          },
          "description": "an array of javascript variables which can be dereferenced using the array destructuring operation"
        }
      ],
      "meta": {
        "lineno": 1320,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 95
    },
    {
      "id": "WOQL.client",
      "longname": "WOQL.client",
      "name": "client",
      "kind": "function",
      "scope": "static",
      "description": "Gets/Sets woqlClient",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLClient"
            ]
          },
          "name": "client"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLClient"
            ]
          }
        }
      ],
      "meta": {
        "lineno": 1329,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 96
    },
    {
      "id": "WOQL.emerge",
      "longname": "WOQL.emerge",
      "name": "emerge",
      "kind": "function",
      "scope": "static",
      "description": "query module\nallow you to use WOQL words as top level functions",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "*"
            ]
          },
          "name": "auto_eval"
        }
      ],
      "meta": {
        "lineno": 1340,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 97
    },
    {
      "id": "WOQL.update_triple",
      "longname": "WOQL.update_triple",
      "name": "update_triple",
      "kind": "function",
      "scope": "static",
      "description": "Update a pattern matching rule for the triple (Subject, Predicate, oldObjValue) with the new one (Subject, Predicate, newObjValue)",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The value to update or a literal",
          "name": "newObjValue"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The old value of the object",
          "name": "oldObjValue"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the a Update Triple Statement"
        }
      ],
      "meta": {
        "lineno": 1370,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 98
    },
    {
      "id": "WOQL.update_quad",
      "longname": "WOQL.update_quad",
      "name": "update_quad",
      "kind": "function",
      "scope": "static",
      "description": "Update a pattern matching rule for the quad [S, P, O, G] (Subject, Predicate, Object, Graph)",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The value to update or a literal",
          "name": "newObject"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "description": "A valid graph resource identifier string",
          "name": "graphRef"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the a Update Quad Statement"
        }
      ],
      "meta": {
        "lineno": 1383,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 99
    },
    {
      "id": "WOQL.value",
      "longname": "WOQL.value",
      "name": "value",
      "kind": "function",
      "scope": "static",
      "description": "Creates a pattern matching rule for a quad [Subject, Predicate, Object, Graph] or for a triple [Subject, Predicate, Object]\nadd extra information about the type of the value object",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string",
              "number",
              "boolean"
            ]
          },
          "description": "an specific value",
          "name": "objValue"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a graph possible value are schema/{main - myschema - *} | instance/{main - myschema - *}  | inference/{main - myschema - *}",
          "name": "graphRef"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the a quad or a triple Statement"
        }
      ],
      "meta": {
        "lineno": 1396,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 100
    },
    {
      "id": "WOQL.link",
      "longname": "WOQL.link",
      "name": "link",
      "kind": "function",
      "scope": "static",
      "description": "Creates a pattern matching rule for a quad [Subject, Predicate, Object, Graph] or for a triple [Subject, Predicate, Object]",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a triple’s subject or a variable",
          "name": "subject"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a property or a variable",
          "name": "predicate"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "The IRI of a node or a variable, or a literal",
          "name": "object"
        },
        {
          "type": {
            "names": [
              "typedef.GraphRef"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a graph possible value are schema/{main - myschema - *} | instance/{main - myschema - *}  | inference/{main - myschema - *}",
          "name": "graphRef"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "A WOQLQuery which contains the a quad or a triple Statement"
        }
      ],
      "meta": {
        "lineno": 1408,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 101
    },
    {
      "id": "WOQL.makeEnum",
      "longname": "WOQL.makeEnum",
      "name": "makeEnum",
      "kind": "function",
      "scope": "static",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "WOQLClient"
            ]
          },
          "description": "an WoqlClient instance",
          "name": "woqlClient"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "property id",
          "name": "propId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class id",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class label",
          "name": "classLabel"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the enum class description",
          "name": "classDesc"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value id schema/main",
          "name": "schemaGraph"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Create Enum Class Statement"
        }
      ],
      "meta": {
        "lineno": 1421,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 102
    },
    {
      "id": "WOQL.generateChoiceList",
      "longname": "WOQL.generateChoiceList",
      "name": "generateChoiceList",
      "kind": "function",
      "scope": "static",
      "description": "Generates a class representing a choice list - an enumerated list of specific options",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class id",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class label",
          "name": "classLabel"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class description",
          "name": "classDesc"
        },
        {
          "type": {
            "names": [
              "array"
            ]
          },
          "description": "an list of permitted values [[id,label,comment],[id,label,comment]]",
          "name": "choices"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value id schema/main",
          "name": "schemaGraph"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the id of a class that this class inherits from (e.g. scm:Enumerated)",
          "name": "parent"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Generate Enum/Choice Class Statement"
        }
      ],
      "meta": {
        "lineno": 1436,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 103
    },
    {
      "id": "WOQL.updateChoiceList",
      "longname": "WOQL.updateChoiceList",
      "name": "updateChoiceList",
      "kind": "function",
      "scope": "static",
      "description": "update or create an enumeration class. You have to add at least one permitted values in the list",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class id",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class label",
          "name": "classLabel"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class description",
          "name": "classDesc"
        },
        {
          "type": {
            "names": [
              "array"
            ]
          },
          "description": "an list of permitted values [[id,label,comment],[id,label,comment]]",
          "name": "choices"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value id schema/main",
          "name": "schemaGraph"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Update Enum/Choice Class Statement"
        }
      ],
      "meta": {
        "lineno": 1456,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 104
    },
    {
      "id": "WOQL.deleteChoiceList",
      "longname": "WOQL.deleteChoiceList",
      "name": "deleteChoiceList",
      "kind": "function",
      "scope": "static",
      "description": "delete the enum list for a specific enumeration class, but not the class",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the enum class name",
          "name": "classId"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value id schema/main",
          "name": "schemaGraph"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Delete Choice List Statement"
        }
      ],
      "meta": {
        "lineno": 1467,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 105
    },
    {
      "id": "WOQL.libs",
      "longname": "WOQL.libs",
      "name": "libs",
      "kind": "function",
      "scope": "static",
      "description": "Called to load Terminus Predefined libraries:",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "*"
            ]
          },
          "description": "xsd,xdd,box",
          "name": "libs"
        },
        {
          "type": {
            "names": [
              "*"
            ]
          },
          "name": "parent"
        },
        {
          "type": {
            "names": [
              "*"
            ]
          },
          "description": "-graph ref",
          "name": "graph"
        },
        {
          "type": {
            "names": [
              "*"
            ]
          },
          "description": "-prefix you want use",
          "name": "prefix"
        }
      ],
      "meta": {
        "lineno": 1478,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 106
    },
    {
      "id": "WOQL.boxClasses",
      "longname": "WOQL.boxClasses",
      "name": "boxClasses",
      "kind": "function",
      "scope": "static",
      "description": "creating a structure ScopedMyClass -> myClass -> MyClass",
      "memberof": "WOQL",
      "params": [
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "description": "the url prefix that will be used for the boxed types (default scm:)",
          "name": "prefix"
        },
        {
          "type": {
            "names": [
              "array"
            ]
          },
          "description": "the classes to box - these classes and all their subclasses will have special boxed classes created around them",
          "name": "classes"
        },
        {
          "type": {
            "names": [
              "array"
            ]
          },
          "description": "the exceptions - these classes and their subclasses will not be boxed, even if they are included in the above array",
          "name": "except"
        },
        {
          "type": {
            "names": [
              "string"
            ]
          },
          "optional": true,
          "description": "the resource identifier of a schema graph. The Default value id schema/main",
          "name": "schemaGraph"
        }
      ],
      "returns": [
        {
          "type": {
            "names": [
              "WOQLQuery"
            ]
          },
          "description": "- A WOQLQuery which contains the Box Classes Creating Statement"
        }
      ],
      "meta": {
        "lineno": 1491,
        "filename": "woql.js",
        "path": "/var/www/html/terminusdb-client/lib"
      },
      "order": 107
    }
  ]