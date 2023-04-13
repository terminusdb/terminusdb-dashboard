
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
          15.316919,
          -61.35083
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
        "@type": "GradedHazard",
        "hazard": "Hurricanes, Typhoons, or Cyclones",
        "Grade": 3
      }
    ]
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

