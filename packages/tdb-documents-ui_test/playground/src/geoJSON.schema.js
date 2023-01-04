[
    {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    {
        "@id": "MultiPolygon",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:decimal",
            "@dimensions": 3,
            "@type": "Array"
        },
        "type": "MultiPolygon_Type"
    },
    {
        "@id": "LineString_Type",
        "@type": "Enum",
        "@value": [
            "LineString"
        ]
    },
    {
        "@id": "Point",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:decimal",
            "@dimensions": 1,
            "@type": "Array"
        },
        "type": "Point_Type"
    },
    {
        "@id": "MultiPolygon_Type",
        "@type": "Enum",
        "@value": [
            "MultiPolygon"
        ]
    },
    {
        "@id": "Name_Type",
        "@type": "Enum",
        "@value": [
            "name"
        ]
    },
    {
        "@id": "Polygon_Type",
        "@type": "Enum",
        "@value": [
            "Polygon"
        ]
    },
    {
        "@id": "Point_Type",
        "@type": "Enum",
        "@value": [
            "Point"
        ]
    },
    {
        "@id": "Polygon",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:decimal",
            "@dimensions": 3,
            "@type": "Array"
        },
        "type": "Polygon_Type"
    },
    {
        "@id": "Feature",
        "@inherits": "GeoJSON",
        "@type": "Class",
        "@unfoldable": [],
        "centerline": {
            "@class": "Geometry",
            "@type": "Optional"
        },
        "geometry": "Geometry",
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
        "type": "Feature_Type"
    },
    {
        "@id": "FeatureCollection",
        "@inherits": "GeoJSON",
        "@key": {
            "@type": "Random"
        },
        "@type": "Class",
        "@unfoldable": [],
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
        "type": "FeatureCollection_Type"
    },
    {
        "@id": "FeatureCollection_Type",
        "@type": "Enum",
        "@value": [
            "FeatureCollection"
        ]
    },
    {
        "@abstract": [],
        "@id": "Geometry",
        "@inherits": "GeoJSON",
        "@type": "Class",
        "@unfoldable": []
    },
    {
        "@abstract": [],
        "@id": "GeoJSON",
        "@type": "Class",
        "bbox": {
            "@class": "xsd:decimal",
            "@dimensions": 1,
            "@type": "Array"
        }
    },
    {
        "@id": "Feature_Type",
        "@type": "Enum",
        "@value": [
            "Feature"
        ]
    },
    {
        "@id": "LineString",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:decimal",
            "@dimensions": 2,
            "@type": "Array"
        },
        "type": "LineString_Type"
    },
    {
        "@id": "GeometryCollection_Type",
        "@type": "Enum",
        "@value": [
            "GeometryCollection"
        ]
    },
    {
        "@id": "GeometryCollection",
        "@inherits": "Geometry",
        "@type": "Class",
        "geometries": {
            "@class": "Geometry",
            "@type": "Set"
        },
        "type": "GeometryCollection_Type"
    }
]