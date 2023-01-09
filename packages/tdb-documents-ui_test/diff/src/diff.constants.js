/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
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
		"version": 1
	  }
} 

export const changedData = {
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
		  }
		],
		"version": 12
	  }
}   

