export const CAMS_FRAMES = {
    "@context": {
      "@base": "iri://CAMS/",
      "@schema": "iri://CAMS#",
      "@type": "Context"
    },
    "Area": {
      "@type": "Class",
      "extent": {
        "@class": {
          "@class": "AreaExtent",
          "@subdocument": []
        },
        "@type": "Optional"
      },
      "hazard_history": {
        "@class": {
          "@class": "HazardEvent",
          "@subdocument": []
        },
        "@type": "Set"
      },
      "hazards": {
        "@class": {
          "@id": "Hazard",
          "@type": "Enum",
          "@values": [
            "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
            "Landslides (incl. post wildfire landslides) and Avalanches",
            "Hurricanes, Typhoons, or Cyclones",
            "Tropical/Extra Tropical of other extreme storms",
            "Coast Storm Surge",
            "Pluvial and Fluvial Flooding",
            "\"Sunny Day\" Tidal Flooding",
            "Tornadoes, Derechos, Micro-Bursts",
            "Lightning Strikes",
            "Wildfires",
            "Drought",
            "Geologic Sink Holes",
            "Pest Infestations",
            "Famine",
            "High Temperature Event",
            "Low Temperature Event",
            "Cyber Attack or Failure",
            "Other Terrorism",
            "Industrial Accident (Emissions, Releases, Spills, Ect.)",
            "Earthquakes"
          ]
        },
        "@type": "Set"
      },
      "name": "xsd:string",
      "population": {
        "@class": "xsd:integer",
        "@type": "Optional"
      }
    },
    "AreaExtent": {
      "@key": {
        "@type": "ValueHash"
      },
      "@subdocument": [],
      "@type": "Class",
      "perimeter": {
        "@class": "xsd:integer",
        "@type": "Optional"
      }
    },
    "Asset": {
      "@key": {
        "@fields": [
          "asset_identifier"
        ],
        "@type": "Lexical"
      },
      "@type": "Class",
      "applicable_hazards": {
        "@class": {
          "@class": "GradedHazard",
          "@subdocument": []
        },
        "@type": "Set"
      },
      "assetType": {
        "@class": {
          "@id": "AssetEnum",
          "@type": "Enum",
          "@values": [
            "Government Buildings",
            "Marine Ports",
            "Airport",
            "Electrical Power Generating Plants",
            "Water System",
            "Desalinization Plant",
            "Desalination Plant",
            "Water Distribution System",
            "Safety and Security",
            "Food, Water, Shelter",
            "Health and Medical",
            "Energy",
            "Communications",
            "Transportation",
            "Hazardous Material",
            "Others"
          ]
        },
        "@type": "Optional"
      },
      "asset_history": {
        "@class": [
          {
            "@class": "HazardEvent",
            "@subdocument": []
          },
          {
            "@class": "UpdateEvent",
            "@subdocument": []
          }
        ],
        "@type": "Set"
      },
      "asset_identifier": "xsd:string",
      "asset_update_history": {
        "@class": {
          "@class": "UpdateEvent",
          "@subdocument": []
        },
        "@type": "Set"
      },
      "commisioning_date": "xsd:dateTime",
      "cost": {
        "@class": "xsd:decimal",
        "@type": "Optional"
      },
      "description": {
        "@class": "xsd:string",
        "@type": "Set"
      },
      "design_standards": "xsd:string",
      "last_maintained": "xsd:dateTime",
      "last_modified": "xsd:dateTime",
      "location": {
        "@class": "Location",
        "@subdocument": []
      },
      "name": "xsd:string",
      "operating": {
        "@class": {
          "@id": "Operating",
          "@type": "Enum",
          "@values": [
            "up",
            "down"
          ]
        },
        "@type": "Optional"
      },
      "owner": {
        "@class": "Owner",
        "@type": "Set"
      },
      "spatial_web_identifier": {
        "@class": "SpatialWebIdentifier",
        "@type": "Optional"
      }
    },
    "AssetEnum": {
      "@type": "Enum",
      "@values": [
        "Government Buildings",
        "Marine Ports",
        "Airport",
        "Electrical Power Generating Plants",
        "Water System",
        "Desalinization Plant",
        "Desalination Plant",
        "Water Distribution System",
        "Safety and Security",
        "Food, Water, Shelter",
        "Health and Medical",
        "Energy",
        "Communications",
        "Transportation",
        "Hazardous Material",
        "Others"
      ]
    },
    "AssetType": {
      "@abstract": [],
      "@type": "Class",
      "name": "xsd:string"
    },
    "CRS84": {
      "@inherits": [
        "Properties"
      ],
      "@type": "Class",
      "name": {
        "@id": "CRS84_Type",
        "@type": "Enum",
        "@values": [
          "urn:ogc:def:crs:OGC:1.3:CRS84"
        ]
      }
    },
    "CRS84_Type": {
      "@type": "Enum",
      "@values": [
        "urn:ogc:def:crs:OGC:1.3:CRS84"
      ]
    },
    "DependencyRelation": {
      "@type": "Class",
      "comment": "xsd:string",
      "critical": "xsd:boolean",
      "dependent": "Asset",
      "depends_on": "Asset"
    },
    "Event": {
      "@abstract": [],
      "@subdocument": [],
      "@type": "Class",
      "date": "xsd:dateTime"
    },
    "Feature": {
      "@type": "Class",
      "bbox": {
        "@class": "xsd:string",
        "@dimensions": 1,
        "@type": "Array"
      },
      "centerline": {
        "@class": [
          {
            "@class": "Point",
            "@subdocument": []
          }
        ],
        "@type": "Optional"
      },
      "geometry": [
        {
          "@class": "Point",
          "@subdocument": []
        }
      ],
      "id": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "properties": [
        "CRS84",
        "OSiProperties"
      ],
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
      "@type": "Class",
      "crs": {
        "@class": "name",
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
    "FundingSource": {
      "@abstract": [],
      "@type": "Class"
    },
    "GeoCoordinate": {
      "@key": {
        "@fields": [
          "latitude",
          "longitude"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "latitude": "xsd:decimal",
      "longitude": "xsd:decimal"
    },
    "GeoPerimeter": {
      "@key": {
        "@fields": [
          "perimeter"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "perimeter": {
        "@class": {
          "@class": "GeoCoordinate",
          "@subdocument": []
        },
        "@type": "List"
      }
    },
    "Geometry": {
      "@abstract": [],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class"
    },
    "GeometryCollection_Type": {
      "@type": "Enum",
      "@values": [
        "GeometryCollection"
      ]
    },
    "GradedHazard": {
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Grade": {
        "@class": "xsd:decimal",
        "@type": "Optional"
      },
      "hazard": {
        "@class": {
          "@id": "Hazard",
          "@type": "Enum",
          "@values": [
            "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
            "Landslides (incl. post wildfire landslides) and Avalanches",
            "Hurricanes, Typhoons, or Cyclones",
            "Tropical/Extra Tropical of other extreme storms",
            "Coast Storm Surge",
            "Pluvial and Fluvial Flooding",
            "\"Sunny Day\" Tidal Flooding",
            "Tornadoes, Derechos, Micro-Bursts",
            "Lightning Strikes",
            "Wildfires",
            "Drought",
            "Geologic Sink Holes",
            "Pest Infestations",
            "Famine",
            "High Temperature Event",
            "Low Temperature Event",
            "Cyber Attack or Failure",
            "Other Terrorism",
            "Industrial Accident (Emissions, Releases, Spills, Ect.)",
            "Earthquakes"
          ]
        },
        "@type": "Optional"
      }
    },
    "Hazard": {
      "@type": "Enum",
      "@values": [
        "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
        "Landslides (incl. post wildfire landslides) and Avalanches",
        "Hurricanes, Typhoons, or Cyclones",
        "Tropical/Extra Tropical of other extreme storms",
        "Coast Storm Surge",
        "Pluvial and Fluvial Flooding",
        "\"Sunny Day\" Tidal Flooding",
        "Tornadoes, Derechos, Micro-Bursts",
        "Lightning Strikes",
        "Wildfires",
        "Drought",
        "Geologic Sink Holes",
        "Pest Infestations",
        "Famine",
        "High Temperature Event",
        "Low Temperature Event",
        "Cyber Attack or Failure",
        "Other Terrorism",
        "Industrial Accident (Emissions, Releases, Spills, Ect.)",
        "Earthquakes"
      ]
    },
    "HazardEvent": {
      "@documentation": {
        "@comment": "Historical hazard",
        "@properties": {
          "comment": "A comment relating to an historic hazard incident.",
          "date": "The date at which the incident occurred."
        }
      },
      "@inherits": [
        "Event"
      ],
      "@key": {
        "@fields": [
          "hazard",
          "date"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "comment": "xsd:string",
      "date": "xsd:dateTime",
      "hazard": {
        "@id": "Hazard",
        "@type": "Enum",
        "@values": [
          "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
          "Landslides (incl. post wildfire landslides) and Avalanches",
          "Hurricanes, Typhoons, or Cyclones",
          "Tropical/Extra Tropical of other extreme storms",
          "Coast Storm Surge",
          "Pluvial and Fluvial Flooding",
          "\"Sunny Day\" Tidal Flooding",
          "Tornadoes, Derechos, Micro-Bursts",
          "Lightning Strikes",
          "Wildfires",
          "Drought",
          "Geologic Sink Holes",
          "Pest Infestations",
          "Famine",
          "High Temperature Event",
          "Low Temperature Event",
          "Cyber Attack or Failure",
          "Other Terrorism",
          "Industrial Accident (Emissions, Releases, Spills, Ect.)",
          "Earthquakes"
        ]
      }
    },
    "HazardScale": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "hazard": {
        "@id": "Hazard",
        "@type": "Enum",
        "@values": [
          "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
          "Landslides (incl. post wildfire landslides) and Avalanches",
          "Hurricanes, Typhoons, or Cyclones",
          "Tropical/Extra Tropical of other extreme storms",
          "Coast Storm Surge",
          "Pluvial and Fluvial Flooding",
          "\"Sunny Day\" Tidal Flooding",
          "Tornadoes, Derechos, Micro-Bursts",
          "Lightning Strikes",
          "Wildfires",
          "Drought",
          "Geologic Sink Holes",
          "Pest Infestations",
          "Famine",
          "High Temperature Event",
          "Low Temperature Event",
          "Cyber Attack or Failure",
          "Other Terrorism",
          "Industrial Accident (Emissions, Releases, Spills, Ect.)",
          "Earthquakes"
        ]
      },
      "max": "xsd:decimal",
      "min": "xsd:decimal"
    },
    "LineString_Type": {
      "@type": "Enum",
      "@values": [
        "LineString"
      ]
    },
    "Location": {
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "city": "xsd:string",
      "geometry_location": {
        "@class": [
          {
            "@class": "Point",
            "@subdocument": []
          }
        ],
        "@type": "Optional"
      },
      "postal_code": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "state": "xsd:string",
      "street": "xsd:string"
    },
    "MapConfig": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "center": {
        "@class": [
          {
            "@class": "Point",
            "@subdocument": []
          }
        ],
        "@type": "Optional"
      },
      "zoom": {
        "@class": "xsd:decimal",
        "@type": "Optional"
      }
    },
    "MultiPolygon_Type": {
      "@type": "Enum",
      "@values": [
        "MultiPolygon"
      ]
    },
    "Name_Type": {
      "@type": "Enum",
      "@values": [
        "name"
      ]
    },
    "OSiProperties": {
      "@inherits": [
        "Properties"
      ],
      "@type": "Class",
      "NAMN1": "xsd:string",
      "OBJECTID": "xsd:integer"
    },
    "Operating": {
      "@type": "Enum",
      "@values": [
        "up",
        "down"
      ]
    },
    "Owner": {
      "@type": "Class",
      "contact_person": "Person",
      "name": "xsd:string"
    },
    "Person": {
      "@type": "Class",
      "email_address": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "first_name": "xsd:string",
      "job_title": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "last_name": "xsd:string",
      "organization": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "phone_number": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    },
    "Point": {
      "@inherits": [
        "Geometry"
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
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
    "Polygon_Type": {
      "@type": "Enum",
      "@values": [
        "Polygon"
      ]
    },
    "Properties": {
      "@abstract": [],
      "@type": "Class"
    },
    "Source": {
      "@abstract": [],
      "@type": "Class"
    },
    "SpatialWebIdentifier": {
      "@type": "Class",
      "id": "xsd:string"
    },
    "UpdateEvent": {
      "@documentation": {
        "@comment": "Update history",
        "@properties": {
          "comment": "A comment relating to an historic hazard incident.",
          "date": "The date at which the update occurred."
        }
      },
      "@inherits": [
        "Event"
      ],
      "@key": {
        "@fields": [
          "comment",
          "date"
        ],
        "@type": "Lexical"
      },
      "@subdocument": [],
      "@type": "Class",
      "comment": "xsd:string",
      "date": "xsd:dateTime"
    },
    "name": {
      "@type": "Class",
      "properties": [
        "CRS84",
        "OSiProperties"
      ],
      "type": {
        "@id": "Name_Type",
        "@type": "Enum",
        "@values": [
          "name"
        ]
      }
    }
}


//Area
const AREA_CREATE = {
    "extent": {
      "@type": "AreaExtent",
      "perimeter": 12
    },
    "hazard_history": [
      {
        "@type": "HazardEvent",
        "comment": "hazard ",
        "date": "2023-01-19T07:48:59.000Z",
        "hazard": "Landslides (incl. post wildfire landslides) and Avalanches"
      }
    ],
    "hazards": [
      "Hurricanes, Typhoons, or Cyclones",
      "\"Sunny Day\" Tidal Flooding"
    ],
    "name": "Area",
    "population": 1223422,
    "@type": "Area"
}

const AREA_EDIT = {
    "@id": "Area/e68f327318c14005cc89cb79d4fbd3ed6bb98f687bcab31e0cd79baab635698b",
    "@type": "Area",
    "name": "Area",
    "extent": {
      "@id": "AreaExtent/486802652a1f91e8c4a947dfb1cdb144ad80855b20b27b77510ade059aedd338",
      "@type": "AreaExtent",
      "perimeter": 12
    },
    "hazard_history": [
      {
        "@id": "Area/e68f327318c14005cc89cb79d4fbd3ed6bb98f687bcab31e0cd79baab635698b/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FLandslides%2520(incl.%2520post%2520wildfire%2520landslides)%2520and%2520Avalanches+2023-01-19T07%3A48%3A59Z",
        "@type": "HazardEvent",
        "hazard": "Landslides (incl. post wildfire landslides) and Avalanches",
        "comment": "hazard ",
        "date": "2023-01-19T07:48:59Z"
      }
    ],
    "hazards": [
      "Hurricanes, Typhoons, or Cyclones",
      "\"Sunny Day\" Tidal Flooding"
    ],
    "population": 1223422
}

const AREA_VIEW = {
    "@id": "Area/e68f327318c14005cc89cb79d4fbd3ed6bb98f687bcab31e0cd79baab635698b",
    "@type": "Area",
    "name": "Area",
    "extent": {
      "@id": "AreaExtent/486802652a1f91e8c4a947dfb1cdb144ad80855b20b27b77510ade059aedd338",
      "@type": "AreaExtent",
      "perimeter": 12
    },
    "hazard_history": [
      {
        "@id": "Area/e68f327318c14005cc89cb79d4fbd3ed6bb98f687bcab31e0cd79baab635698b/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FLandslides%2520(incl.%2520post%2520wildfire%2520landslides)%2520and%2520Avalanches+2023-01-19T07%3A48%3A59Z",
        "@type": "HazardEvent",
        "hazard": "Landslides (incl. post wildfire landslides) and Avalanches",
        "comment": "hazard ",
        "date": "2023-01-19T07:48:59Z"
      }
    ],
    "hazards": [
      "Hurricanes, Typhoons, or Cyclones",
      "\"Sunny Day\" Tidal Flooding"
    ],
    "population": 1223422
}

//Asset 


const ASSET_CREATE={
    "@type": "Asset",
    "name": "Trafalgar hydro power plan ",
    "assetType": "Electrical Power Generating Plants",
    "asset_identifier": "Trafalgar hydro power plan ",
    "commisioning_date": "2011-01-01T01:00:37Z",
    "design_standards": "Trafalgar hydro power plan ",
    "last_maintained": "2011-01-01T01:00:37Z",
    "last_modified": "2011-01-01T01:00:37Z",
    "location": {
      "@type": "Location",
      "city": "Trafalgar hydro power plan ",
      "geometry_location": {
        "@type": "Point",
        "coordinates": [
          "15.316919",
          "-61.35083"
        ],
        "type": "Point"
      },
      "postal_code": "Trafalgar hydro power plan ",
      "state": "Trafalgar hydro power plan ",
      "street": "Trafalgar hydro power plan "
    },/*,
    "owner": [
      "Owner/2a17e5180cdce3519f9e923a137b5e0c01edecec2da16f7d2a6e71cb7c31b5f9"
    ],
    "applicable_hazards": [
      {
        "@type": "GradedHazard",
        "hazard": "Hurricanes, Typhoons, or Cyclones",
        "Grade": 3
      }
    ]*/
}

const ASSET_EDIT={
    "@id": "Asset/Trafalgar%20hydro%20power%20plan%20",
    "@type": "Asset",
    "name": "Trafalgar hydro power plan ",
    "assetType": "Electrical Power Generating Plants",
    "asset_identifier": "Trafalgar hydro power plan ",
    "commisioning_date": "2011-01-01T01:00:37Z",
    "design_standards": "Trafalgar hydro power plan ",
    "last_maintained": "2011-01-01T01:00:37Z",
    "last_modified": "2011-01-01T01:00:37Z",
    "location": {
      "@id": "Asset/Trafalgar%20hydro%20power%20plan%20/location/Location/34335d42106959841918254a50636f4c168e6cc957de421880fa3fe0d0e12938",
      "@type": "Location",
      "city": "Trafalgar hydro power plan ",
      "geometry_location": {
        "@id": "Asset/Trafalgar%20hydro%20power%20plan%20/location/Asset/Trafalgar%20hydro%20power%20plan%20/location/Location/34335d42106959841918254a50636f4c168e6cc957de421880fa3fe0d0e12938/geometry_location/Point/241fac48a78040b98415f62eebe259567b8ab389ad0f8d5f59e9f8c6c8734ae8",
        "@type": "Point",
        "coordinates": [
            51.505, -0.09
        ],
        "type": "Point"
      },
      "postal_code": "Trafalgar hydro power plan ",
      "state": "Trafalgar hydro power plan ",
      "street": "Trafalgar hydro power plan "
    },
    "owner": [
      "Owner/2a17e5180cdce3519f9e923a137b5e0c01edecec2da16f7d2a6e71cb7c31b5f9"
    ],
    "applicable_hazards": [
      {
        "@id": "Asset/Trafalgar%20hydro%20power%20plan%20/applicable_hazards/GradedHazard/b9ed0df783265072d50f0450bf2b92216304e4a4b5ebeb4117426a4674b5a3f7",
        "@type": "GradedHazard",
        "hazard": "Hurricanes, Typhoons, or Cyclones",
        "Grade": 3
      }
    ]
}

// create config 
export const CREATE_ASSET_CONFIG = {
	frame: CAMS_FRAMES, 
	uiFrame: {},
	type: "Asset",
	formData: {},
	input: ASSET_CREATE,
	mode: "Create"
}

// data provider for cams
export const DATA = {
    Area: {
        Create: AREA_CREATE,
        Edit: AREA_EDIT,
        View: AREA_VIEW
    },
    Asset: {
        Create: ASSET_CREATE,
        Edit: ASSET_EDIT,
        View: ASSET_EDIT
    }
}

