export const GEO_JSON_FRAMES = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context"
  },
  "Feature": {
    "@inherits": [
      "GeoJSON"
    ],
    "@type": "Class",
    "@unfoldable": [],
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
    "@inherits": [
      "GeoJSON"
    ],
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "@unfoldable": [],
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
    "@inherits": [
      "GeoJSON"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    }
  },
  "GeometryCollection": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
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
  "LineString": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:double",
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
  "MultiPolygon": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:double",
      "@dimensions": 4,
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
  "Name_Type": {
    "@type": "Enum",
    "@values": [
      "name"
    ]
  },
  "Point": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:double",
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
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
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
  }
}