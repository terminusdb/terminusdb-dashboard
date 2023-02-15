/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
	"Area": {
		"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0",
		"@type": "Area",
		"name": "Vulnerable Area",
		"extent": {
		  "@id": "AreaExtent/477f282c81d3dbba1ff5202a85c4c67fa405000752c22306e27977b932e37e3e",
		  "@type": "AreaExtent",
		  "perimeter": 234
		},
		"hazard_history": [
		  {
			"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FEarthquakes+2022-11-14T11%3A50%3A03Z",
			"@type": "HazardEvent",
			"hazard": "Earthquakes",
			"comment": "earthquake",
			"date": "2022-11-14T11:50:03Z"
		  },
		  {
			"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FHurricanes,%2520Typhoons,%2520or%2520Cyclones+2022-11-14T11%3A49%3A52Z",
			"@type": "HazardEvent",
			"hazard": "Hurricanes, Typhoons, or Cyclones",
			"comment": "hurricane hazard",
			"date": "2022-11-14T11:49:52Z"
		  },
		  {
			"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FHurricanes,%2520Typhoons,%2520or%2520Cyclones+2022-11-14T11%3A49%3A52Z",
			"@type": "HazardEvent",
			"hazard": "Landslides",
			"comment": "Landslides",
			"date": "2022-10-14T11:49:52Z"
		  }
		],
		"hazards": [
		  "Landslides (incl. post wildfire landslides) and Avalanches",
		  "Wildfires"
		],
		"population": 1238792
	},
	"Asset": {
		"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20",
		"@type": "Asset",
		"name": "Communication tower near Good Hope ",
		"assetType": "Communications",
		"asset_identifier": "Communication tower near Good Hope ",
		"commisioning_date": "2011-01-01T01:00:37Z",
		"design_standards": "Communication tower near Good Hope ",
		"last_maintained": "2011-01-01T01:00:37Z",
		"last_modified": "2011-01-01T01:00:37Z",
		"location": {
		  "@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/location/Location/ca8d1cf4f98d0b043dda26e00ada589409b993f916cc5d05a6eba97927da1bf8",
		  "@type": "Location",
		  "city": "Communication tower near Good Hope ",
		  "geometry_location": {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/location/Asset/Communication%20tower%20near%20Good%20Hope%20/location/Location/ca8d1cf4f98d0b043dda26e00ada589409b993f916cc5d05a6eba97927da1bf8/geometry_location/Point/53e992bb0c998e17940f6fc214ebd279497637b0c0a33f341e3a4b369e436c8c",
			"@type": "Point",
			"coordinates": [
			  15.4125,
			  -61.2554
			],
			"type": "Point"
		  },
		  "postal_code": "Communication tower near Good Hope ",
		  "state": "Communication tower near Good Hope ",
		  "street": "Communication tower near Good Hope "
		},
		"owner": [
		  "Owner/2a17e5180cdce3519f9e923a137b5e0c01edecec2da16f7d2a6e71cb7c31b5f9",
		  "Owner/fd5939c3da69cd3ee348bab5f3295ad4c9d1120f47a7087ebdfea787e9f0c898",
		  "Owner/883b3996e54eae495d4e5adf046fbcdb5d93dc0fa8617fba07c4583a4b4077f3"
		],
		"applicable_hazards": [
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/applicable_hazards/GradedHazard/1a00218ee7748e53f9e4982fc67250f2fc540dbd0247cbf83d101c4e504632b5",
			"@type": "GradedHazard",
			"hazard": "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)",
			"Grade": 5
		  },
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/applicable_hazards/GradedHazard/eee8e6d049a8f073048ad80208dcc89b68ad0220019237b1055290b7ef962baf",
			"@type": "GradedHazard",
			"hazard": "Wildfires",
			"Grade": 2
		  }
		],
		"spatial_web_identifier": "SpatialWebIdentifier/e43a029a8fd34b463f5e3939bb5be4425bb509adf2e6914d88ae496492fe081a",
		"asset_history": [
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FLandslides%2520(incl.%2520post%2520wildfire%2520landslides)%2520and%2520Avalanches+2022-11-15T09%3A37%3A00Z",
			"@type": "HazardEvent",
			"hazard": "Landslides (incl. post wildfire landslides) and Avalanches",
			"comment": "hazard Event",
			"date": "2022-11-15T09:37:00Z"
		  },
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_history/UpdateEvent/Update%20Event%20+2022-11-15T09%3A37%3A12Z",
			"@type": "UpdateEvent",
			"comment": "Update Event ",
			"date": "2022-11-15T09:37:12Z"
		  }
		],
		"asset_update_history": [
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_update_history/UpdateEvent/updated%20again%20some%20sort%20of%20issue%20s+2022-11-15T09%3A37%3A33Z",
			"@type": "UpdateEvent",
			"comment": "updated again some sort of issue s",
			"date": "2022-11-15T09:37:33Z"
		  },
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_update_history/UpdateEvent/updates%20xyz+2022-11-15T09%3A37%3A25Z",
			"@type": "UpdateEvent",
			"comment": "updates xyz",
			"date": "2022-11-15T09:37:25Z"
		  }
		],
		"operating": "up",
		"cost": 3
	},
	"CRS84": {
		"@id": "CRS84/7f482fb0523d59b8d3971db359b1bd1b44bfb32523eedad710fb937857fc8cbd",
		"@type": "CRS84",
		"name": "urn:ogc:def:crs:OGC:1.3:CRS84"
	},
	"DependencyRelation": {
		"@id": "DependencyRelation/89af1490fb553fee2fca1816e83e4b7c531ee8171469ead5b72b329b480f37c3",
		"@type": "DependencyRelation",
		"comment": "Communication tower near Good Hope  - La Plaine Police Station",
		"critical": true,
		"dependent": "Asset/La%20Plaine%20Police%20Station",
		"depends_on": "Asset/Communication%20tower%20near%20Good%20Hope%20"
	},
	"HazardScale":{
		"@id": "HazardScale/1d04ec21538ccda503a4ae8b6883748216a63bb9b630f3fff187a84038d1899a",
		"@type": "HazardScale",
		"hazard": "Hurricanes, Typhoons, or Cyclones",
		"max": 5,
		"min": 1
	},
	"OSiProperties": {
		"@id": "OSiProperties/cad8c6e50c398ce94335fbe9364995879edb065349a8661cf2541d8483e8e531",
		"@type": "OSiProperties",
		"NAMN1": "NAMN1",
		"OBJECTID": 123123
	},
	"Person": {
		"@id": "Person/930fd57be8121f152f09109c73fd62ea0ac7e7b828c7d68a4c03decc1c398492",
		"@type": "Person",
		"email_address": "karl@terminusdb.com",
		"first_name": "Karl",
		"job_title": "Head of Hospital Facilities",
		"last_name": "Karlson",
		"organization": "Hospital Trust Inc",
		"phone_number": "01234654235"
	}
}

export const changedData = {
	"Area": {
		"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0",
		"@type": "Area",
		"name": "Vulnerable Area _NEW",
		"extent": {
		  "@id": "AreaExtent/477f282c81d3dbba1ff5202a85c4c67fa405000752c22306e27977b932e37e3e",
		  "@type": "AreaExtent",
		  "perimeter": 200
		},
		"hazard_history": [
		  {
			"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FEarthquakes+2022-11-14T11%3A50%3A03Z",
			"@type": "HazardEvent",
			"hazard": "Earthquakes_NEW",
			"comment": "earthquake_NEW",
			"date": "2023-11-14T11:50:03Z"
		  },
		  {
			"@id": "Area/03258d3ceb3fa71206efec81007741a5696f09f1b0bc41704cfaf3c5ad12a1e0/hazard_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FHurricanes,%2520Typhoons,%2520or%2520Cyclones+2022-11-14T11%3A49%3A52Z",
			"@type": "HazardEvent",
			"hazard": "Hurricanes, Typhoons, or Cyclones_NEW",
			"comment": "hurricane hazard_NEW",
			"date": "2021-08-14T11:49:52Z"
		  }
		],
		"hazards": [
		  "Famine",
		  "Wildfires",
		  "Drought"
		],
		"population": 349000
	},
	"Asset": {
		"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20",
		"@type": "Asset",
		"name": "Communication tower near Good Hope _NEW",
		"assetType": "Government Buildings",
		"asset_identifier": "Communication tower near Good Hope _NEW",
		"commisioning_date": "2011-03-01T01:00:37Z",
		"design_standards": "Communication tower near Good Hope _NEW",
		"last_maintained": "2010-02-01T01:00:37Z",
		"last_modified": "2009-01-01T01:00:37Z",
		"location": {
		  "@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/location/Location/ca8d1cf4f98d0b043dda26e00ada589409b993f916cc5d05a6eba97927da1bf8",
		  "@type": "Location",
		  "city": "Communication tower near Good Hope _NEW",
		  "geometry_location": {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/location/Asset/Communication%20tower%20near%20Good%20Hope%20/location/Location/ca8d1cf4f98d0b043dda26e00ada589409b993f916cc5d05a6eba97927da1bf8/geometry_location/Point/53e992bb0c998e17940f6fc214ebd279497637b0c0a33f341e3a4b369e436c8c",
			"@type": "Point",
			"coordinates": [
			  15.412523,
			  -61.255426
			],
			"type": "Point"
		  },
		  "postal_code": "Communication tower near Good Hope _NEW",
		  "state": "Communication tower near Good Hope _NEW",
		  "street": "Communication tower near Good Hope _NEW"
		},
		"owner": [
		  "Owner/2a17e5180cdce3519f9e923a137b5e0c01edecec2da16f7d2a6e71cb7c31b5f9_NEW",
		  "Owner/fd5939c3da69cd3ee348bab5f3295ad4c9d1120f47a7087ebdfea787e9f0c898_NEW",
		  "Owner/883b3996e54eae495d4e5adf046fbcdb5d93dc0fa8617fba07c4583a4b4077f3_NEW"
		],
		"applicable_hazards": [
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/applicable_hazards/GradedHazard/1a00218ee7748e53f9e4982fc67250f2fc540dbd0247cbf83d101c4e504632b5",
			"@type": "GradedHazard",
			"hazard": "Volcanos (incl. lahars, pyroclastic flows, volcanic activity)_NEW",
			"Grade": 2
		  },
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/applicable_hazards/GradedHazard/eee8e6d049a8f073048ad80208dcc89b68ad0220019237b1055290b7ef962baf",
			"@type": "GradedHazard",
			"hazard": "Wildfires_NEW",
			"Grade": 5
		  }
		],
		"spatial_web_identifier": "SpatialWebIdentifier/e43a029a8fd34b463f5e3939bb5be4425bb509adf2e6914d88ae496492fe081a_NEW",
		"asset_history": [
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_history/HazardEvent/iri%3A%2F%2FCAMS%23Hazard%2FLandslides%2520(incl.%2520post%2520wildfire%2520landslides)%2520and%2520Avalanches+2022-11-15T09%3A37%3A00Z",
			"@type": "HazardEvent",
			"hazard": "Landslides (incl. post wildfire landslides) and Avalanches_NEW",
			"comment": "hazard Event_NEW",
			"date": "2022-12-15T09:37:00Z"
		  },
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_history/UpdateEvent/Update%20Event%20+2022-11-15T09%3A37%3A12Z",
			"@type": "UpdateEvent",
			"comment": "Update Event _NEW",
			"date": "2022-12-15T09:37:12Z"
		  }
		],
		"asset_update_history": [
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_update_history/UpdateEvent/updated%20again%20some%20sort%20of%20issue%20s+2022-11-15T09%3A37%3A33Z",
			"@type": "UpdateEvent",
			"comment": "updated again some sort of issue s_NEW",
			"date": "2022-09-15T09:37:33Z"
		  },
		  {
			"@id": "Asset/Communication%20tower%20near%20Good%20Hope%20/asset_update_history/UpdateEvent/updates%20xyz+2022-11-15T09%3A37%3A25Z",
			"@type": "UpdateEvent",
			"comment": "updates xyz_NEW",
			"date": "2021-03-15T09:37:25Z"
		  }
		],
		"operating": "down",
		"cost": 24
	},
	"CRS84": {
		"@id": "CRS84/7f482fb0523d59b8d3971db359b1bd1b44bfb32523eedad710fb937857fc8cbd",
		"@type": "CRS84",
		"name": "urn:ogc:def:crs:OGC:1.3:CRS84_NEW"
	},
	"DependencyRelation": {
		"@id": "DependencyRelation/89af1490fb553fee2fca1816e83e4b7c531ee8171469ead5b72b329b480f37c3",
		"@type": "DependencyRelation",
		"comment": "Communication tower near Good Hope  - La Plaine Police Station _NEW",
		"critical": false,
		"dependent": "Asset/La%20Plaine%20Police%20Station_NEW",
		"depends_on": "Asset/Communication%20tower%20near%20Good%20Hope%20_NEW"
	},
	"HazardScale":{
		"@id": "HazardScale/1d04ec21538ccda503a4ae8b6883748216a63bb9b630f3fff187a84038d1899a",
		"@type": "HazardScale",
		"hazard": "Hurricanes, Typhoons, or Cyclones _NEW",
		"max": 7,
		"min": 3
	},
	"OSiProperties": {
		"@id": "OSiProperties/cad8c6e50c398ce94335fbe9364995879edb065349a8661cf2541d8483e8e531",
		"@type": "OSiProperties",
		"NAMN1": "NAMN1_NEW",
		"OBJECTID": 5555
	},
	"Person": {
		"@id": "Person/930fd57be8121f152f09109c73fd62ea0ac7e7b828c7d68a4c03decc1c398492",
		"@type": "Person",
		"email_address": "karl@terminusdb.com_NEW",
		"first_name": "Karl_NEW",
		"job_title": "Head of Hospital Facilities_NEW",
		"last_name": "Karlson_NEW",
		"organization": "Hospital Trust Inc_NEW",
		"phone_number": "01234654235_NEW"
	}
}