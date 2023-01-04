export const FRAMES = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@documentation": [
        {
          "@authors": [
            "Gavin Mendel-Gleason"
          ],
          "@description": "This is an example schema. We are using it to demonstrate the ability to display information in multiple languages about the same semantic content.",
          "@language": "en",
          "@title": "Example Schema"
        },
        {
          "@authors": [
            "გავინ მენდელ-გლისონი"
          ],
          "@description": "ეს არის მაგალითის სქემა. ჩვენ ვიყენებთ მას, რათა ვაჩვენოთ ინფორმაციის მრავალ ენაზე ჩვენების შესაძლებლობა ერთი და იმავე სემანტიკური შინაარსის შესახებ.",
          "@language": "ka",
          "@title": "მაგალითი სქემა"
        }
      ],
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "Address": {
      "@documentation": [
        {
          "@comment": "An Address",
          "@label": "Address",
          "@language": "en",
          "@properties": {
            "AddressLine1": {
              "@comment": "Address Line one",
              "@label": "Address Line 1"
            },
            "Country": {
              "@comment": "A Country ",
              "@label": "Country"
            },
            "postalCode": {
              "@comment": "A valid Postal Code",
              "@label": "Zip Code"
            }
          }
        },
        {
          "@comment": "მისამართი",
          "@label": "მისამართი",
          "@language": "ka",
          "@properties": {
            "AddressLine1": {
              "@comment": "მისამართის ხაზი პირველი",
              "@label": "მისამართის ხაზი 1"
            },
            "Country": {
              "@comment": "Ქვეყანა",
              "@label": "ქვეყანა"
            },
            "postalCode": {
              "@comment": "მოქმედი საფოსტო კოდი",
              "@label": "Ზიპ კოდი"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "AddressLine1": "xsd:string",
      "City": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Country": "xsd:string",
      "postalCode": "xsd:string"
    },
    "Art": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@key": {
        "@fields": [
          "name"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "capacity": "xsd:decimal",
      "name": "xsd:string"
    },
    "Botony": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Grade": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "number_of_assignments": {
        "@class": "xsd:integer",
        "@type": "Optional"
      }
    },
    "Choice": {
      "@documentation": [
        {
          "@comment": "A Choice of a thing",
          "@label": "Choice",
          "@language": "en",
          "@values": {
            "no": {
              "@comment": "Or is it a no?",
              "@label": "no"
            },
            "yes": {
              "@comment": "Is it a yes?",
              "@label": "yes"
            }
          }
        },
        {
          "@label": "არჩევანი",
          "@language": "ka",
          "@values": {
            "no": {
              "@comment": "ან არის არა?",
              "@label": "არა"
            },
            "yes": {
              "@comment": "კია?",
              "@label": "დიახ"
            }
          }
        }
      ],
      "@type": "Enum",
      "@values": [
        "yes",
        "no"
      ]
    },
    "Colors": {
      "@type": "Enum",
      "@values": [
        "Red",
        "Blue",
        "Yellow",
        "Green"
      ]
    },
    "ComputerStudent": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "likes": "sys:JSON",
      "stores_as": {
        "@class": "sys:JSON",
        "@type": "Set"
      }
    },
    "Dance": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@key": {
        "@fields": [
          "name"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "capacity": "xsd:decimal",
      "name": "xsd:string"
    },
    "DifferentPerson": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "current_job": {
        "@class": "Jobs",
        "@type": "Optional"
      },
      "favorite_colors": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "Set"
      },
      "likes_color": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "Optional"
      },
      "lives_at": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "Optional"
      },
      "name": "xsd:string",
      "nickNames": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "otherNames": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "website": "xsd:string",
      "work_history": {
        "@class": "Jobs",
        "@type": "Set"
      }
    },
    "Employee": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "DOB": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "designation": "xsd:string",
      "likes_color": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "Optional"
      },
      "name": "xsd:string",
      "studied": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "Set"
      },
      "works_as": {
        "@class": "Jobs",
        "@type": "Optional"
      }
    },
    "Example": {
      "@documentation": [
        {
          "@comment": "An example class",
          "@label": "Example",
          "@language": "en",
          "@properties": {
            "address": {
              "@comment": "The current address for example",
              "@label": "Current Address"
            },
            "choice": {
              "@comment": "A thing to choose",
              "@label": "choice"
            },
            "example_sys": {
              "@comment": "example sys object to see working of language support",
              "@label": "Example JSON"
            },
            "name": {
              "@comment": "The name of the example object",
              "@label": "name"
            },
            "nickName": {
              "@comment": "A nick name for example",
              "@label": "Nick Name"
            },
            "previousAddress": {
              "@comment": "Previous Address",
              "@label": "Previous Address where example must have resided"
            },
            "scored": {
              "@comment": "Scored Grades",
              "@label": "Scored"
            },
            "studied": {
              "@comment": "favorite subject",
              "@label": "Studied"
            },
            "works_as": {
              "@comment": "Example works as",
              "@label": "Designation"
            }
          }
        },
        {
          "@comment": "მაგალითი კლასი",
          "@label": "მაგალითი",
          "@language": "ka",
          "@properties": {
            "address": {
              "@comment": "მაგალითად, მიმდინარე მისამართი",
              "@label": "Ამჟამინდელი მისამართი"
            },
            "choice": {
              "@comment": "რაც უნდა აირჩიოთ",
              "@label": "არჩევანი"
            },
            "example_sys": {
              "@comment": "მაგალითი sys ობიექტის სანახავად მუშაობს ენის მხარდაჭერა",
              "@label": "მაგალითი JSON"
            },
            "name": {
              "@comment": "მაგალითის ობიექტის სახელი",
              "@label": "სახელი"
            },
            "nickName": {
              "@comment": "მაგალითად, მეტსახელი",
              "@label": "მეტსახელი"
            },
            "previousAddress": {
              "@comment": "წინა მისამართი, სადაც მაგალითი უნდა ყოფილიყო",
              "@label": "წინა მისამართი"
            },
            "scored": {
              "@comment": "ქულები დააგროვა",
              "@label": "გაიტანა"
            },
            "studied": {
              "@comment": "საყვარელი საგანი",
              "@label": "შეისწავლა"
            },
            "works_as": {
              "@comment": "მაგალითი მუშაობს როგორც",
              "@label": "მუშაობს როგორც"
            }
          }
        }
      ],
      "@type": "Class",
      "address": {
        "@class": "Address",
        "@subdocument": []
      },
      "choice": {
        "@id": "Choice",
        "@type": "Enum",
        "@values": [
          "yes",
          "no"
        ]
      },
      "example_sys": "sys:JSON",
      "name": "xsd:string",
      "nickName": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "previousAddress": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "Set"
      },
      "scored": {
        "@class": {
          "@class": "Grades",
          "@subdocument": []
        },
        "@type": "Optional"
      },
      "studied": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "Set"
      },
      "works_as": {
        "@class": "Jobs",
        "@type": "Set"
      }
    },
    "Feature": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "centerline": {
        "@class": [
          "GeometryCollection",
          "LineString",
          "MultiPolygon",
          "Point",
          "Polygon"
        ],
        "@type": "Optional"
      },
      "geometry": [
        "GeometryCollection",
        "LineString",
        "MultiPolygon",
        "Point",
        "Polygon"
      ],
      "id": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "properties": {
        "@class": "sys:JSON",
        "@type": "Optional"
      },
      "title": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "type": {
        "@id": "Feature_Type",
        "@type": "Enum",
        "@values": [
          "Feature"
        ]
      }
    },
    "FeatureCollection": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "crs": {
        "@class": "sys:JSON",
        "@type": "Optional"
      },
      "features": {
        "@class": "Feature",
        "@type": "Set"
      },
      "name": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "properties": {
        "@class": "sys:JSON",
        "@type": "Optional"
      },
      "type": {
        "@id": "FeatureCollection_Type",
        "@type": "Enum",
        "@values": [
          "FeatureCollection"
        ]
      }
    },
    "FeatureCollection_Type": {
      "@type": "Enum",
      "@values": [
        "FeatureCollection"
      ]
    },
    "Feature_Type": {
      "@type": "Enum",
      "@values": [
        "Feature"
      ]
    },
    "GeoJSON": {
      "@abstract": [],
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      }
    },
    "Geometry": {
      "@abstract": [],
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      }
    },
    "GeometryCollection": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "geometries": {
        "@class": [
          "GeometryCollection",
          "LineString",
          "MultiPolygon",
          "Point",
          "Polygon"
        ],
        "@type": "Set"
      },
      "type": {
        "@id": "GeometryCollection_Type",
        "@type": "Enum",
        "@values": [
          "GeometryCollection"
        ]
      }
    },
    "GeometryCollection_Type": {
      "@type": "Enum",
      "@values": [
        "GeometryCollection"
      ]
    },
    "GradeReport": {
      "@documentation": [
        {
          "@comment": "Grades of a person",
          "@label": "Grades",
          "@language": "en",
          "@properties": {
            "comments": {
              "@comment": "comments to be noted",
              "@label": "Comments"
            },
            "score": {
              "@comment": "score",
              "@label": "Score"
            }
          }
        },
        {
          "@comment": "პიროვნების კლასები",
          "@label": "შეფასებები",
          "@language": "ka",
          "@properties": {
            "comments": {
              "@comment": "უნდა აღინიშნოს კომენტარები",
              "@label": "კომენტარები"
            },
            "score": {
              "@comment": "ქულა",
              "@label": "ქულა"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "comments": "xsd:string",
      "score": {
        "@id": "ScoreCard",
        "@type": "Enum",
        "@values": [
          "Outstanding",
          "Excellent",
          "VeryGood",
          "Poor",
          "Fail"
        ]
      }
    },
    "Grades": {
      "@documentation": [
        {
          "@comment": "Grades of a person",
          "@label": "Grades",
          "@language": "en",
          "@properties": {
            "grade": {
              "@comment": "Grades achieved",
              "@label": "Grade"
            },
            "marks": {
              "@comment": "Marks achieved",
              "@label": "Marks"
            },
            "report": {
              "@comment": "Report Card",
              "@label": "Report"
            }
          }
        },
        {
          "@comment": "პიროვნების კლასები",
          "@label": "შეფასებები",
          "@language": "ka",
          "@properties": {
            "grade": {
              "@comment": "მიღწეული ქულები",
              "@label": "შეფასება"
            },
            "marks": {
              "@comment": "მიღწეული ნიშნები",
              "@label": "ნიშნები"
            },
            "report": {
              "@comment": "მოსწრების ფურცელი",
              "@label": "ანგარიში"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@oneOf": [
        {
          "grade": "xsd:string",
          "marks": "xsd:decimal",
          "report": {
            "@class": "GradeReport",
            "@subdocument": []
          }
        }
      ],
      "@subdocument": [],
      "@type": "Class"
    },
    "Graduate": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "scored": {
        "@class": {
          "@class": "Grades",
          "@subdocument": []
        },
        "@type": "Optional"
      }
    },
    "Group": {
      "@abstract": [],
      "@documentation": [
        {
          "@comment": "An example class",
          "@label": "Example",
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@comment": "მაგალითი კლასი",
          "@label": "მაგალითი",
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@type": "Class",
      "capacity": "xsd:decimal", 
      "name": "xsd:string"
    },
    "Guy": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "attends_group_in_order": {
        "@class": [
          "Art",
          "Dance",
          "Music"
        ],
        "@type": "List"
      },
      "favorite_group": [
        "Art",
        "Dance",
        "Music"
      ]
    },
    "Info": {
      "@documentation": {
        "@comment": "",
        "@properties": {
          "alternativeAddress": "Alternative Address"
        }
      },
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "alternativeAddress": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "Optional"
      },
      "nicknames": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    },
    "Jobs": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "title": "xsd:string"
    },
    "LineString": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "coordinates": {
        "@class": "xsd:decimal",
        "@dimensions": 2,
        "@type": "Array"
      },
      "type": {
        "@id": "LineString_Type",
        "@type": "Enum",
        "@values": [
          "LineString"
        ]
      }
    },
    "LineString_Type": {
      "@type": "Enum",
      "@values": [
        "LineString"
      ]
    },
    "List": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "name": {
        "@class": "xsd:string",
        "@type": "List"
      },
      "title": "xsd:string"
    },
    "Maths": {
      "@documentation": [
        {
          "@comment": "Maths",
          "@label": "Maths",
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            },
            "level": {
              "@comment": "Math level",
              "@label": "Level"
            },
            "love_maths": {
              "@comment": "a choice to love maths",
              "@label": "Do you like Maths?"
            }
          }
        },
        {
          "@comment": "მათემატიკა",
          "@label": "მათემატიკა",
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            },
            "level": {
              "@comment": "მათემატიკის დონე",
              "@label": "დონე"
            },
            "love_maths": {
              "@comment": "არჩევანი გიყვარდეს მათემატიკა",
              "@label": "მოგწონთ მათემატიკა?"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "level": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "love_maths": {
        "@class": "xsd:boolean",
        "@type": "Optional"
      }
    },
    "MultiPolygon": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "coordinates": {
        "@class": "xsd:decimal",
        "@dimensions": 3,
        "@type": "Array"
      },
      "type": {
        "@id": "MultiPolygon_Type",
        "@type": "Enum",
        "@values": [
          "MultiPolygon"
        ]
      }
    },
    "MultiPolygon_Type": {
      "@type": "Enum",
      "@values": [
        "MultiPolygon"
      ]
    },
    "Music": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "capacity": {
              "@comment": "Max number of people in group",
              "@label": "Capacity"
            },
            "name": {
              "@comment": "Title of the group",
              "@label": "Name"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "capacity": {
              "@comment": "ადამიანების მაქსიმალური რაოდენობა ჯგუფში",
              "@label": "ტევადობა"
            },
            "name": {
              "@comment": "ჯგუფის სათაური",
              "@label": "სახელი"
            }
          }
        }
      ],
      "@key": {
        "@fields": [
          "name"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "capacity": "xsd:decimal",
      "name": "xsd:string"
    },
    "Name_Type": {
      "@type": "Enum",
      "@values": [
        "name"
      ]
    },
    "OrderedPerson": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "hangs_out_at": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "List"
      },
      "likes_color": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "List"
      },
      "to_do": {
        "@class": "xsd:string",
        "@type": "List"
      }
    },
    "Person": {
      "@documentation": {
        "@comment": "",
        "@properties": {
          "above18": "18 plus",
          "permanentAddress": "Permanent Address"
        }
      },
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "Birthday": "xsd:dateTime",
      "PhoneNumber": "xsd:decimal",
      "Today": "xsd:dateTime",
      "above18": "xsd:boolean",
      "age": "xsd:decimal",
      "email": "xsd:string",
      "name": "xsd:string",
      "permanentAddress": {
        "@class": "Address",
        "@subdocument": []
      },
      "website": "xsd:string"
    },
    "Point": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "coordinates": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "type": {
        "@id": "Point_Type",
        "@type": "Enum",
        "@values": [
          "Point"
        ]
      }
    },
    "Point_Type": {
      "@type": "Enum",
      "@values": [
        "Point"
      ]
    },
    "Polygon": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:decimal",
        "@dimensions": 1,
        "@type": "Array"
      },
      "coordinates": {
        "@class": "xsd:decimal",
        "@dimensions": 3,
        "@type": "Array"
      },
      "type": {
        "@id": "Polygon_Type",
        "@type": "Enum",
        "@values": [
          "Polygon"
        ]
      }
    },
    "Polygon_Type": {
      "@type": "Enum",
      "@values": [
        "Polygon"
      ]
    },
    "ScoreCard": {
      "@documentation": [
        {
          "@comment": "A Score Card",
          "@label": "ScoreCard",
          "@language": "en",
          "@values": {
            "Excellent": {
              "@comment": "Excellent",
              "@label": "Excellent"
            },
            "Fail": {
              "@comment": "Fail",
              "@label": "Fail"
            },
            "Outstanding": {
              "@comment": "Outstanding",
              "@label": "Outstanding"
            },
            "Poor": {
              "@comment": "Poor",
              "@label": "Poor"
            },
            "VeryGood": {
              "@comment": "VeryGood",
              "@label": "VeryGood"
            }
          }
        },
        {
          "@label": "არჩევანი",
          "@language": "ka",
          "@values": {
            "Excellent": {
              "@comment": "კია?",
              "@label": "დიახ"
            },
            "Fail": {
              "@comment": "კია?",
              "@label": "დიახ"
            },
            "Outstanding": {
              "@comment": "ან არის არა?",
              "@label": "არა"
            },
            "Poor": {
              "@comment": "კია?",
              "@label": "დიახ"
            },
            "VeryGood": {
              "@comment": "ან არის არა?",
              "@label": "არა"
            }
          }
        }
      ],
      "@type": "Enum",
      "@values": [
        "Outstanding",
        "Excellent",
        "VeryGood",
        "Poor",
        "Fail"
      ]
    },
    "Student": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "favorite_subject": [
        {
          "@class": "Zoology",
          "@subdocument": []
        },
        {
          "@class": "Botony",
          "@subdocument": []
        },
        {
          "@class": "Maths",
          "@subdocument": []
        }
      ],
      "second_favorite_subject": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "Optional"
      },
      "studied": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "Set"
      },
      "study_time_table": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "List"
      }
    },
    "Subject": {
      "@abstract": [],
      "@documentation": [
        {
          "@comment": "An abstract Subject Class",
          "@label": "Subject",
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            }
          }
        },
        {
          "@comment": "აბსტრაქტული საგნობრივი კლასი",
          "@label": "საგანი",
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            }
          }
        }
      ],
      "@subdocument": [],
      "@type": "Class",
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      }
    },
    "TEST": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "likes": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "List"
      },
      "lives_at": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "List"
      },
      "title": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "work_as": {
        "@class": "Jobs",
        "@type": "Set"
      }
    },
    "Teacher": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "DOB": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "comments": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "email": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "favorite_teacher": {
        "@class": "xsd:boolean",
        "@type": "Optional"
      },
      "likes_color": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "password": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    },
    "UnorderedPerson": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "likes_color": {
        "@class": {
          "@id": "Colors",
          "@type": "Enum",
          "@values": [
            "Red",
            "Blue",
            "Yellow",
            "Green"
          ]
        },
        "@type": "Set"
      },
      "lived_at": {
        "@class": {
          "@class": "Address",
          "@subdocument": []
        },
        "@type": "Set"
      },
      "nicknames": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "worked_as": {
        "@class": "Jobs",
        "@type": "Set"
      }
    },
    "Zoology": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Grade": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Notes": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      }
    }
  }