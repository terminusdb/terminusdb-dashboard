"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.CREATE_CONFIG = void 0;
var CAMS_FRAMES = {
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
        "@values": ["Volcanos (incl. lahars, pyroclastic flows, volcanic activity)", "Landslides (incl. post wildfire landslides) and Avalanches", "Hurricanes, Typhoons, or Cyclones", "Tropical/Extra Tropical of other extreme storms", "Coast Storm Surge", "Pluvial and Fluvial Flooding", "\"Sunny Day\" Tidal Flooding", "Tornadoes, Derechos, Micro-Bursts", "Lightning Strikes", "Wildfires", "Drought", "Geologic Sink Holes", "Pest Infestations", "Famine", "High Temperature Event", "Low Temperature Event", "Cyber Attack or Failure", "Other Terrorism", "Industrial Accident (Emissions, Releases, Spills, Ect.)", "Earthquakes"]
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
      "@fields": ["asset_identifier"],
      "@type": "Lexical"
    },
    "@type": "Class",
    "@metadata": {
      "render_as": {
        "location": {
          "expand": true
        }
      }
    },
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
        "@values": ["Government Buildings", "Marine Ports", "Airport", "Electrical Power Generating Plants", "Water System", "Desalinization Plant", "Desalination Plant", "Water Distribution System", "Safety and Security", "Food, Water, Shelter", "Health and Medical", "Energy", "Communications", "Transportation", "Hazardous Material", "Others"]
      },
      "@type": "Optional"
    },
    "asset_history": {
      "@class": [{
        "@class": "HazardEvent",
        "@subdocument": []
      }, {
        "@class": "UpdateEvent",
        "@subdocument": []
      }],
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
    "commisioning_date": {
      "@class": "xsd:dateTime",
      "@type": "Optional"
    },
    "cost": {
      "@class": "xsd:decimal",
      "@type": "Optional"
    },
    "description": {
      "@class": "xsd:string",
      "@type": "Set"
    },
    "design_standards": "xsd:string",
    "last_maintained": {
      "@class": "xsd:dateTime",
      "@type": "Optional"
    },
    "last_modified": {
      "@class": "xsd:dateTime",
      "@type": "Optional"
    },
    "location": {
      "@class": "Location",
      "@subdocument": []
    },
    "name": "xsd:string",
    "operating": {
      "@class": {
        "@id": "Operating",
        "@type": "Enum",
        "@values": ["up", "down"]
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
    "@values": ["Government Buildings", "Marine Ports", "Airport", "Electrical Power Generating Plants", "Water System", "Desalinization Plant", "Desalination Plant", "Water Distribution System", "Safety and Security", "Food, Water, Shelter", "Health and Medical", "Energy", "Communications", "Transportation", "Hazardous Material", "Others"]
  },
  "AssetType": {
    "@abstract": [],
    "@type": "Class",
    "name": "xsd:string"
  },
  "CRS84": {
    "@inherits": ["Properties"],
    "@type": "Class",
    "name": {
      "@id": "CRS84_Type",
      "@type": "Enum",
      "@values": ["urn:ogc:def:crs:OGC:1.3:CRS84"]
    }
  },
  "CRS84_Type": {
    "@type": "Enum",
    "@values": ["urn:ogc:def:crs:OGC:1.3:CRS84"]
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
      "@class": [{
        "@class": "Point",
        "@subdocument": []
      }],
      "@type": "Optional"
    },
    "geometry": [{
      "@class": "Point",
      "@subdocument": []
    }],
    "id": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "properties": ["CRS84", "OSiProperties"],
    "title": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "type": {
      "@id": "Feature_Type",
      "@type": "Enum",
      "@values": ["Feature"]
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
      "@values": ["FeatureCollection"]
    }
  },
  "FeatureCollection_Type": {
    "@type": "Enum",
    "@values": ["FeatureCollection"]
  },
  "Feature_Type": {
    "@type": "Enum",
    "@values": ["Feature"]
  },
  "FundingSource": {
    "@abstract": [],
    "@type": "Class"
  },
  "GeoCoordinate": {
    "@key": {
      "@fields": ["latitude", "longitude"],
      "@type": "Lexical"
    },
    "@subdocument": [],
    "@type": "Class",
    "latitude": "xsd:decimal",
    "longitude": "xsd:decimal"
  },
  "GeoPerimeter": {
    "@key": {
      "@fields": ["perimeter"],
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
    "@values": ["GeometryCollection"]
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
        "@values": ["Volcanos (incl. lahars, pyroclastic flows, volcanic activity)", "Landslides (incl. post wildfire landslides) and Avalanches", "Hurricanes, Typhoons, or Cyclones", "Tropical/Extra Tropical of other extreme storms", "Coast Storm Surge", "Pluvial and Fluvial Flooding", "\"Sunny Day\" Tidal Flooding", "Tornadoes, Derechos, Micro-Bursts", "Lightning Strikes", "Wildfires", "Drought", "Geologic Sink Holes", "Pest Infestations", "Famine", "High Temperature Event", "Low Temperature Event", "Cyber Attack or Failure", "Other Terrorism", "Industrial Accident (Emissions, Releases, Spills, Ect.)", "Earthquakes"]
      },
      "@type": "Optional"
    }
  },
  "Hazard": {
    "@type": "Enum",
    "@values": ["Volcanos (incl. lahars, pyroclastic flows, volcanic activity)", "Landslides (incl. post wildfire landslides) and Avalanches", "Hurricanes, Typhoons, or Cyclones", "Tropical/Extra Tropical of other extreme storms", "Coast Storm Surge", "Pluvial and Fluvial Flooding", "\"Sunny Day\" Tidal Flooding", "Tornadoes, Derechos, Micro-Bursts", "Lightning Strikes", "Wildfires", "Drought", "Geologic Sink Holes", "Pest Infestations", "Famine", "High Temperature Event", "Low Temperature Event", "Cyber Attack or Failure", "Other Terrorism", "Industrial Accident (Emissions, Releases, Spills, Ect.)", "Earthquakes"]
  },
  "HazardEvent": {
    "@documentation": {
      "@comment": "Historical hazard",
      "@properties": {
        "comment": "A comment relating to an historic hazard incident.",
        "date": "The date at which the incident occurred."
      }
    },
    "@inherits": ["Event"],
    "@key": {
      "@fields": ["hazard", "date"],
      "@type": "Lexical"
    },
    "@subdocument": [],
    "@type": "Class",
    "comment": "xsd:string",
    "date": "xsd:dateTime",
    "hazard": {
      "@id": "Hazard",
      "@type": "Enum",
      "@values": ["Volcanos (incl. lahars, pyroclastic flows, volcanic activity)", "Landslides (incl. post wildfire landslides) and Avalanches", "Hurricanes, Typhoons, or Cyclones", "Tropical/Extra Tropical of other extreme storms", "Coast Storm Surge", "Pluvial and Fluvial Flooding", "\"Sunny Day\" Tidal Flooding", "Tornadoes, Derechos, Micro-Bursts", "Lightning Strikes", "Wildfires", "Drought", "Geologic Sink Holes", "Pest Infestations", "Famine", "High Temperature Event", "Low Temperature Event", "Cyber Attack or Failure", "Other Terrorism", "Industrial Accident (Emissions, Releases, Spills, Ect.)", "Earthquakes"]
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
      "@values": ["Volcanos (incl. lahars, pyroclastic flows, volcanic activity)", "Landslides (incl. post wildfire landslides) and Avalanches", "Hurricanes, Typhoons, or Cyclones", "Tropical/Extra Tropical of other extreme storms", "Coast Storm Surge", "Pluvial and Fluvial Flooding", "\"Sunny Day\" Tidal Flooding", "Tornadoes, Derechos, Micro-Bursts", "Lightning Strikes", "Wildfires", "Drought", "Geologic Sink Holes", "Pest Infestations", "Famine", "High Temperature Event", "Low Temperature Event", "Cyber Attack or Failure", "Other Terrorism", "Industrial Accident (Emissions, Releases, Spills, Ect.)", "Earthquakes"]
    },
    "max": "xsd:decimal",
    "min": "xsd:decimal"
  },
  "LineString_Type": {
    "@type": "Enum",
    "@values": ["LineString"]
  },
  "Location": {
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
    "@type": "Class",
    "city": "xsd:string",
    "geometry_location": {
      "@class": [{
        "@class": "Point",
        "@subdocument": []
      }],
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
      "@class": [{
        "@class": "Point",
        "@subdocument": []
      }],
      "@type": "Optional"
    },
    "zoom": {
      "@class": "xsd:decimal",
      "@type": "Optional"
    }
  },
  "MultiPolygon_Type": {
    "@type": "Enum",
    "@values": ["MultiPolygon"]
  },
  "Name_Type": {
    "@type": "Enum",
    "@values": ["name"]
  },
  "OSiProperties": {
    "@inherits": ["Properties"],
    "@type": "Class",
    "NAMN1": "xsd:string",
    "OBJECTID": "xsd:integer"
  },
  "Operating": {
    "@type": "Enum",
    "@values": ["up", "down"]
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
    "@inherits": ["Geometry"],
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
      "@values": ["Point"]
    }
  },
  "Point_Type": {
    "@type": "Enum",
    "@values": ["Point"]
  },
  "Polygon_Type": {
    "@type": "Enum",
    "@values": ["Polygon"]
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
    "@inherits": ["Event"],
    "@key": {
      "@fields": ["comment", "date"],
      "@type": "Lexical"
    },
    "@subdocument": [],
    "@type": "Class",
    "comment": "xsd:string",
    "date": "xsd:dateTime"
  },
  "name": {
    "@type": "Class",
    "properties": ["CRS84", "OSiProperties"],
    "type": {
      "@id": "Name_Type",
      "@type": "Enum",
      "@values": ["name"]
    }
  }
};
var CAMS_ASSET_DATA = {
  "@type": "Asset",
  "name": "NEW ASSET",
  "assetType": "Marine Ports",
  "asset_identifier": "NEW ASSET",
  "design_standards": "design_standards",
  "location": {
    "@type": "Location",
    "city": "NEW CITY",
    "geometry_location": {
      "@type": "Point",
      "coordinates": ["53.24302757956819", "-6.131942167551961"],
      "type": "Point"
    },
    "postal_code": "NEW CODE",
    "state": "NEW STATE",
    "street": "NEW STREET"
  },
  "applicable_hazards": [{
    "@type": "GradedHazard",
    "hazard": "Landslides (incl. post wildfire landslides) and Avalanches",
    "Grade": "45"
  }],
  "spatial_web_identifier": {
    "@type": "SpatialWebIdentifier",
    "id": "NEW SPAT"
  },
  //"spatial_web_identifier": "SpatialWebIdentifier/070b7966703943c3001a99e30a17b24d0355dec6c034d1e3cfcec33ba85b21bd",
  "description": ["a description"],
  "operating": "up",
  "cost": "5667"
};
var CAMS_ASSET_VIEW_DATA = {
  "@id": "Asset/NEW%20ASSET",
  "@type": "Asset",
  "name": "NEW ASSET",
  "assetType": "Marine Ports",
  "asset_identifier": "NEW ASSET",
  "commisioning_date": "2023-04-06T23:00:00Z",
  "design_standards": "design_standards",
  "last_maintained": "2023-04-04T23:00:00Z",
  "last_modified": "2023-04-03T23:00:00Z",
  "location": {
    "@id": "Asset/NEW%20ASSET/location/Location/9f6b6a77f7e4141b882579e67e7580ecca568b7586c197f1c4fa802b61492fd3",
    "@type": "Location",
    "city": "NEW CITY",
    "geometry_location": {
      "@id": "Asset/NEW%20ASSET/location/Asset/NEW%20ASSET/location/Location/9f6b6a77f7e4141b882579e67e7580ecca568b7586c197f1c4fa802b61492fd3/geometry_location/Point/9c1d3265000fad31cad24db9b1e4ae1233509b15469e0ff394c1a25ee23eaa75",
      "@type": "Point",
      "coordinates": ["53.24302757956819", "-6.131942167551961"],
      "type": "Point"
    },
    "postal_code": "NEW CODE",
    "state": "NEW STATE",
    "street": "NEW STREET"
  },
  "applicable_hazards": [{
    "@id": "Asset/NEW%20ASSET/applicable_hazards/GradedHazard/522fd5a38f6b4de2ab572be4a5f7e53dbdbb1d837ce832049ba64b33dde8be83",
    "@type": "GradedHazard",
    "hazard": "Landslides (incl. post wildfire landslides) and Avalanches",
    "Grade": "45"
  }],
  "spatial_web_identifier": "SpatialWebIdentifier/070b7966703943c3001a99e30a17b24d0355dec6c034d1e3cfcec33ba85b21bd",
  "description": ["a description"],
  "operating": "up",
  "cost": "5667"
};

// create config 
var CREATE_CONFIG = {
  frame: CAMS_FRAMES,
  uiFrame: {},
  type: "Asset",
  formData: {},
  input: CAMS_ASSET_DATA,
  mode: "Create"
};

// view config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var VIEW_CONFIG = {
  frame: CAMS_FRAMES,
  uiFrame: {},
  type: "Asset",
  input: CAMS_ASSET_VIEW_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;