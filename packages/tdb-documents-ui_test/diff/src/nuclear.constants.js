/** Review Substance | ScrapedSource */

export const oldData = {
	"Country": {
			"@id": "Country/Australia",
			"@type": "Country",
			"name": "Australia"
	},
	"Unit": {
			"@id": "Unit/A",
			"@type": "Unit",
			"dimension": "electric_current",
			"name": "Ampere",
			"symbol": "A"
	},
	"Compound": {
			"@id": "Compound/70ed9836209dd13ebfe9cfc69876963cdaabd8865ff7efd2f0df3efed3432764",
			"@type": "Compound",
			"name": "Compound",
			"elements": [
					"Element/Actinium",
					"Element/Argon"
			],
			"formula": "formulaH273"
	},
	"Element": {
		"@id": "Element/Americium",
		"@type": "Element",
		"name": "Americium",
		"atomic_number": 95,
		"element_name": "Americium",
		"element_symbol": "Am",
		"isotopes": [
			"Isotope/243Am"
		]
	},
	"Isotope": {
			"@id": "Isotope/100Mo",
			"@type": "Isotope",
			"name": "100Mo",
			"abundance": {
				"@id": "Isotope/100Mo/abundance/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2Fappm+9630.0",
				"@type": "Quantity",
				"quantity": 9630,
				"unit": "Unit/appm"
			},
			"isotope_name": "100Mo",
			"mass": {
				"@id": "Isotope/100Mo/mass/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2Fu+99.907477",
				"@type": "Quantity",
				"quantity": 99.907477,
				"unit": "Unit/u"
			}
	},
	"ExperimentalReactor": {
			"@id": "ExperimentalReactor/ExperimentalReactor",
			"@type": "ExperimentalReactor",
			"name": "ExperimentalReactor",
			"capacity": {
				"@id": "ExperimentalReactor/ExperimentalReactor/capacity/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2F$+23",
				"@type": "Quantity",
				"quantity": 23,
				"unit": "Unit/$"
			},
			"coolant": "Element/Silicon",
			"moderator": "Substance/359b117e7e41f90cefa8da368553fb2bac9e4fe5f204f340d17520a5532a5fd2",
			"type": "HTGR"
	},
	"PowerReactor":{
			"@id": "PowerReactor/Belleville%201",
			"@type": "PowerReactor",
			"name": "Belleville 1",
			"capacity": {
				"@id": "PowerReactor/Belleville%201/capacity/SourcedQuantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FMWe+1310",
				"@type": "SourcedQuantity",
				"quantity": 1310,
				"unit": "Unit/MWe",
				"source": "ScrapedSource/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBelleville_Nuclear_Power_Plant+2021-10-20T17%3A10%3A31.489356Z"
			}
	},
	"ResearchReactor": {
			"@id": "ResearchReactor/Research_reactor",
			"@type": "ResearchReactor",
			"name": "Research_reactor",
			"capacity": {
				"@id": "ResearchReactor/Research_reactor/capacity/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2F%2525+2",
				"@type": "Quantity",
				"quantity": 2,
				"unit": "Unit/%25"
			},
			"coolant": "Element/Actinium",
			"moderator": "Element/Argon",
			"type": "BWR"
	},
	"ScrapedSource": {
			"@id": "ScrapedSource/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBelleville_Nuclear_Power_Plant+2021-10-20T17%3A10%3A31.489356Z",
			"@type": "ScrapedSource",
			"name": "Wikipedia",
			"url": "https://en.wikipedia.org/wiki/Belleville_Nuclear_Power_Plant",
			"scraped_at": "2021-10-20T17:10:31.489356Z"
	},
	"NuclearPowerPlant":{
		"@id": "NuclearPowerPlant/BELLEVILLE",
		"@type": "NuclearPowerPlant",
		"name": "BELLEVILLE",
		"capacity": {
			"@id": "NuclearPowerPlant/BELLEVILLE/capacity/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FMWe+2620.0",
			"@type": "Quantity",
			"quantity": 2620,
			"unit": "Unit/MWe"
		},
		"country": "Country/France",
		"gppd_idnr": "WRI1002693",
		"location": {
			"@id": "NuclearPowerPlant/BELLEVILLE/location/GeoCoordinate/47.5103+2.875",
			"@type": "GeoCoordinate",
			"latitude": 47.5103,
			"longitude": 2.875
		},
		"output": [
			{
				"@id": "NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2015",
				"@type": "AnnualOutput",
				"output": {
					"@id": "NuclearPowerPlant/BELLEVILLE/output/NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2015/output/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FGWh+19555.254",
					"@type": "Quantity",
					"quantity": 19555.254,
					"unit": "Unit/GWh"
				},
				"year": "2015"
			},
			{
				"@id": "NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2016",
				"@type": "AnnualOutput",
				"output": {
					"@id": "NuclearPowerPlant/BELLEVILLE/output/NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2016/output/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FGWh+16485.667",
					"@type": "Quantity",
					"quantity": 16485.667,
					"unit": "Unit/GWh"
				},
				"year": "2016"
			},
			{
				"@id": "NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2017",
				"@type": "AnnualOutput",
				"output": {
					"@id": "NuclearPowerPlant/BELLEVILLE/output/NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2017/output/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FGWh+14443.614",
					"@type": "Quantity",
					"quantity": 14443.614,
					"unit": "Unit/GWh"
				},
				"year": "2017"
			}
		],
		"owner": "Owner",
		"url": "http://clients.rte-france.com/lang/an/visiteurs/vie/prod/parc_reference.jsp",
		"reactors": [
			"PowerReactor/Belleville%201",
			"PowerReactor/Belleville%202"
		]
	}
}

export const changedData = {
	"Country": {
			"@id": "Country/Australia",
			"@type": "Country",
			"name": "Australia_NEW"
	},
	"Unit": {
			"@id": "Unit/A",
			"@type": "Unit",
			"dimension": "electric_current_NEW",
			"name": "Ampere_NEW",
			"symbol": "A_NEW"
	},
	"Compound": {
			"@id": "Compound/70ed9836209dd13ebfe9cfc69876963cdaabd8865ff7efd2f0df3efed3432764",
			"@type": "Compound",
			"name": "Compound_NEW",
			"elements": [
					"Element/Actinium_NEW",
					"Element/Argon_NEW",
					"Element/_NEW",
					"Element/_NEW_1"
			],
			"formula": "formulaH273_NEW"
	},
	"Element": {
			"@id": "Element/Americium",
			"@type": "Element",
			"name": "Americium_NEW",
			"atomic_number": 97,
			"element_name": "Americium_NEW",
			"element_symbol": "Am_NEW",
			"isotopes": [
				"Isotope/243Am_NEW"
			]
	},
	"Isotope": {
			"@id": "Isotope/100Mo",
			"@type": "Isotope",
			"name": "100Mo_NEW",
			"abundance": {
				"@id": "Isotope/100Mo/abundance/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2Fappm+9630.0",
				"@type": "Quantity",
				"quantity": 9631,
				"unit": "Unit/appm_NEW"
			},
			"isotope_name": "29Si",
			"mass": {
				"@id": "Isotope/100Mo/mass/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2Fu+99.907477",
				"@type": "Quantity",
				"quantity": 99.907488,
				"unit": "Unit/u_NEW"
			}
	},
	"ExperimentalReactor": {
			"@id": "ExperimentalReactor/ExperimentalReactor",
			"@type": "ExperimentalReactor",
			"name": "ExperimentalReactor_NEW",
			"capacity": {
				"@id": "ExperimentalReactor/ExperimentalReactor/capacity/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2F$+23",
				"@type": "Quantity",
				"quantity": 34,
				"unit": "Unit/$_NEW"
			},
			"coolant": "Element/Silicon_NEW",
			"moderator": "Substance/359b117e7e41f90cefa8da368553fb2bac9e4fe5f204f340d17520a5532a5fd2_NEW",
			"type": "BWR"
	},
	"PowerReactor":{
			"@id": "PowerReactor/Belleville%201",
			"@type": "PowerReactor",
			"name": "Belleville 1_NEW",
			"capacity": {
				"@id": "PowerReactor/Belleville%201/capacity/SourcedQuantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FMWe+1310",
				"@type": "SourcedQuantity",
				"quantity": 1311,
				"unit": "Unit/MWe_NEW",
				"source": "ScrapedSource/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBelleville_Nuclear_Power_Plant+2021-10-20T17%3A10%3A31.489356Z_NEW"
			}
	},
	"ResearchReactor": {
			"@id": "ResearchReactor/Research_reactor",
			"@type": "ResearchReactor",
			"name": "Research_reactor_NEW",
			"capacity": {
				"@id": "ResearchReactor/Research_reactor/capacity/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2F%2525+2",
				"@type": "Quantity",
				"quantity": 7,
				"unit": "Unit/%25_NEW"
			},
			"coolant": "Element/Actinium_NEW",
			"moderator": "Element/Argon_NEW",
			"type": "HTGR"
	},
	"ScrapedSource": {
			"@id": "ScrapedSource/https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBelleville_Nuclear_Power_Plant+2021-10-20T17%3A10%3A31.489356Z",
			"@type": "ScrapedSource",
			"name": "Wikipedia_NEW",
			"url": "https://en.wikipedia.org/wiki/Belleville_Nuclear_Power_Plant_NEW",
			"scraped_at": "2022-05-20T18:10:31.489356Z"
	},
	"NuclearPowerPlant":{
		"@id": "NuclearPowerPlant/BELLEVILLE",
		"@type": "NuclearPowerPlant",
		"name": "BELLEVILLE_NEW",
		"capacity": {
			"@id": "NuclearPowerPlant/BELLEVILLE/capacity/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FMWe+2620.0",
			"@type": "Quantity",
			"quantity": 2622,
			"unit": "Unit/MWe_NEW"
		},
		"country": "Country/Ireland",
		"gppd_idnr": "WRI1002693_NEW",
		"location": {
			"@id": "NuclearPowerPlant/BELLEVILLE/location/GeoCoordinate/47.5103+2.875",
			"@type": "GeoCoordinate",
			"latitude": 42.5103,
			"longitude": 21.875
		},
		"output": [
			{
				"@id": "NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2015",
				"@type": "AnnualOutput",
				"output": {
					"@id": "NuclearPowerPlant/BELLEVILLE/output/NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2015/output/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FGWh+19555.254",
					"@type": "Quantity",
					"quantity": 29555.254,
					"unit": "Unit/GWh_NEW"
				},
				"year": "2013"
			},
			{
				"@id": "NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2016",
				"@type": "AnnualOutput",
				"output": {
					"@id": "NuclearPowerPlant/BELLEVILLE/output/NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2016/output/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FGWh+16485.667",
					"@type": "Quantity",
					"quantity": 18485.667,
					"unit": "Unit/GWh_NEW"
				},
				"year": "2019"
			},
			{
				"@id": "NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2017",
				"@type": "AnnualOutput",
				"output": {
					"@id": "NuclearPowerPlant/BELLEVILLE/output/NuclearPowerPlant/BELLEVILLE/output/AnnualOutput/2017/output/Quantity/http%3A%2F%2Flib.terminusdb.com%2Fnuclear%2FUnit%2FGWh+14443.614",
					"@type": "Quantity",
					"quantity": 15443.614,
					"unit": "Unit/GWh_NEW"
				},
				"year": "2020"
			}
		],
		"owner": "Owner_NEW",
		"url": "http://clients.rte-france.com/lang/an/visiteurs/vie/prod/parc_reference.jsp_NEW",
		"reactors": [
			"PowerReactor/Belleville%201_NEW",
			"PowerReactor/Belleville%202_NEW"
		]
	}
}