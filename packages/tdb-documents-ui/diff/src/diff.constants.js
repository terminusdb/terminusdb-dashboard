/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
	Student: {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51",
		"@type": "Student",
		"favorite_subject": [{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
			"@type": "Botony",
			"Grade": "C",
			"Number_of_classes_attended": 451,
			"course_start_date": "2012-09-17T09:21:09Z",
			"number_of_assignments": 512
		},
		{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
			"@type": "Botony",
			"Grade": "E",
			"Number_of_classes_attended": 332,
			"course_start_date": "2022-09-17T09:21:09Z",
			"number_of_assignments": 323
		}
	]
	},
	Apple: {
		"@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27",
		"@type": "Apple",
		"page": "# The largest heading \n  ## The second largest heading \n  ###### The smallest heading \n Some basic Git commands are: \n``` git status \n git add \n git commit \n  ## Emphasis \n \n**This is bold text** \n__This is bold text__ \n*This is italic text* \n_This is italic text_ \n~~Strikethrough~~ \n## Blockquotes \n> Blockquotes can also be nested... \n>> ...by using additional greater-than signs right next to each other... \n> > > ...or with spaces between arrows.",
		/*"lives": [
			{
			  "@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27/lives/address/11c86727d6f26ed32d4baa173012381477ae6bd4bf7c35ae922abf9f65f5b983",
			  "@type": "address",
			  "addressline1": "two1",
			  "postal": "two1"
			},
			{
			  "@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27/lives/address/84672a39e6a4fb4c4d86e9ddeeeae5019ecb5c63087dd903d36fd5867ce90e9b",
			  "@type": "address",
			  "addressline1": "one1", 
			  "postal": "one1"
			}
		  ]*//*,
		"text": [
		  "onetext",
		  "twotext",
		  "threetext"
		]*/
	  },
	Element: {
		"color": "Color/d4e4f37992756cbc5063dea9e2feed00b12abe439e8528db425df2150d8f500b3",
		"image_url": "https://jsonfor4matter.org/",
		"part": "Part/someth4ing "
	},
	Color: {
		"@id": "Color/de4f37992756cbc5063dea9e2feed00b12abe439e8528db425df2150d8f500b3",
		"@type": "Color",
		"name": "redK",
		"rgb": "redK",
		"transparent": true
	}, 
	Theme: {
		"@id": "Theme/123213+Theme",
		"@type": "Theme",
		"name": "Theme2",
		parent: "Part/123123123",
		"image_url": "https://react-bo2otstrap.github.io/components/cards/",
		"theme_id": 1232132
	},
	Inventory: {
		"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7",
		"@type": "Inventory",
		"inventory_minifigs": [
		  {
			"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7/inventory_minifigs/InventoryMinifig/AVC",
			"@type": "InventoryMinifig",
			"inventory_minifig_id": "AVC",
			"minifig": "Minifig/1",
			"quantity": 12
		  }
		],
		"setString": ["a", "b", "c"],
		"inventory_parts": [
		  {
			"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7/inventory_parts/InventoryPart/123333",
			"@type": "InventoryPart",
			"element": "Element/a1cc7a9bf9d7f93182edec1112fc24c8d733cf0d861ed5ce3c2ce3340ba80df6",
			"inventory_part_id": "123333",
			"quantity": 12,
			"spare": true
		  }
		],
		/*"version": 1*/
	  }
} 
 

export const changedData = {
	Student: {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51",
		"@type": "Student", 
		"favorite_subject": [{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
			"@type": "Botony",
			"Grade": "B",
			"Number_of_classes_attended": 45,
			"course_start_date": "2022-09-17T09:21:09Z",
			"number_of_assignments": 52
		},
		{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
			"@type": "Botony",
			"Grade": "D",
			"Number_of_classes_attended": 33,
			"course_start_date": "2022-09-17T09:21:09Z",
			"number_of_assignments": 33
		},
		{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
			"@type": "Botony",
			"Grade": "E",
			"Number_of_classes_attended": 332,
			"course_start_date": "2022-09-17T09:21:09Z",
			"number_of_assignments": 323
		}]
	},
	Apple: {
		"@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27",
		"@type": "Apple",
		"page": "# first The largest heading  \n  ## The second largest heading \n  ###### The smallest heading \n Some basic Git commands are: \n``` git wrong status \n git add \n git commit \n``` ## Emphasis \n \n**This is bold text** \n__This is bold text__ \n*This is italic text* \n_This is italic text_ \n~~Strikethrough~~ \n## Blockquotes \n> Blockquotes can also be nested... \n>> ...by using additional greater-than signs I want to change this shayyyyt right next to each other... \n> > > ...or with spaces between arrows.",
		"lives": [
			{
			  "@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27/lives/address/11c86727d6f26ed32d4baa173012381477ae6bd4bf7c35ae922abf9f65f5b983",
			  "@type": "address",
			  "addressline1": "two",
			  "postal": "two"
			}/*,
			{
			  "@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27/lives/address/84672a39e6a4fb4c4d86e9ddeeeae5019ecb5c63087dd903d36fd5867ce90e9b",
			  "@type": "address",
			  "addressline1": "one",
			  "postal": "one"
			}*/
		  ]
		/*"text": [
		  "onetext1",
		  "twotext1",
		]*/
	  },
	Element: {
		
		"color": "Color/de4f37992756cbc5063dea9e2feed00b12abe439e8528db425df2150d8f500b3",
		"image_url": "https://jsonformatter.org/",
		"part": "Part/something "
	},
	Color: {
		"@id": "Color/de4f37992756cbc5063dea9e2feed00b12abe439e8528db425df2150d8f500b3",
		"@type": "Color",
		"name": "red",
		"rgb": "red",
		"transparent": true
	},
	Theme: {
		"@id": "Theme/123213+Theme",
		"@type": "Theme",
		"name": "Theme",
		parent: "Part/13123123",
		"image_url": "https://react-bootstrap.github.io/components/cards/",
		"theme_id": 123213
	},
	Inventory: {
		"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7",
		"@type": "Inventory",
		"inventory_minifigs": [
		  {
			"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7/inventory_minifigs/InventoryMinifig/AVC",
			"@type": "InventoryMinifig",
			"inventory_minifig_id": "AVC2",
			"minifig": "Minifig/12",
			"quantity": 122
		  }
		  
		], 
		
		"inventory_parts": [
		  {
			"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7/inventory_parts/InventoryPart/123333",
			"@type": "InventoryPart",
			"element": "Element/a1cc7a9bf9d7f93182edec1112fc24c8d733cf0d861ed5ce3c2ce3340ba80df62",
			"inventory_part_id": "1233332",
			"quantity": 122,
			"spare": true
		  },

		  {
			"@id": "Inventory/ecfd8d91eff0447e6dafef3ce1d7ca7f5831c9911f02c2addebaa4934c153bd7/inventory_minifigs/InventoryMinifig/AVC",
			"@type": "InventoryMinifig",
			"inventory_minifig_id": "AVC2",
			"minifig": "Minifig/12",
			"quantity": 2
		  }
		],
		"version": 12
	  }
} 
/*
,
		"lives": [
		  {
			"@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27/lives/address/11c86727d6f26ed32d4baa173012381477ae6bd4bf7c35ae922abf9f65f5b983",
			"@type": "address",
			"addressline1": "two",
			"postal": "two"
		  },
		  {
			"@id": "Apple/0c6b97f5e56ae05f5d88688ef8b2e5a97c98a42a3caf65f4ede73960f5514d27/lives/address/84672a39e6a4fb4c4d86e9ddeeeae5019ecb5c63087dd903d36fd5867ce90e9b",
			"@type": "address",
			"addressline1": "one",
			"postal": "one"
		  }
		]*/

