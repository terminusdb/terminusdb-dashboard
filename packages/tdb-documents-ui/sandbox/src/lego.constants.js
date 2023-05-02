export const LEGO_FRAMES = {
  "@context": {
    "@base": "terminusdb:///lego/data/",
    "@schema": "terminusdb:///lego/schema#",
    "@type": "Context"
  },
  "Category": {
    "@type": "Enum",
    "@values": [
      "Bars, Ladders and Fences",
      "Baseplates",
      "Bricks Sloped",
      "Belville, Scala and Fabuland",
      "Bricks Curved",
      "Bricks Round and Cones",
      "Bricks Special",
      "Bricks Wedged",
      "Bricks",
      "Clikits",
      "Containers",
      "Duplo, Quatro and Primo",
      "Electronics",
      "Flags, Signs, Plastics and Cloth",
      "HO Scale",
      "Hinges, Arms and Turntables",
      "Large Buildable Figures",
      "Magnets and Holders",
      "Mechanical",
      "Minidoll Heads",
      "Minidoll Lower Body",
      "Minidoll Upper Body",
      "Minifig Accessories",
      "Minifig Heads",
      "Minifig Headwear",
      "Minifig Lower Body",
      "Minifig Upper Body",
      "Minifigs",
      "Modulex",
      "Non-Buildable Figures (Duplo, Fabuland, etc)",
      "Non-LEGO",
      "Other",
      "Panels",
      "Plants and Animals",
      "Plates Angled",
      "Plates Round Curved and Dishes",
      "Plates Special",
      "Plates",
      "Pneumatics",
      "Projectiles / Launchers",
      "Rock",
      "Stickers",
      "String, Bands and Reels",
      "Supports, Girders and Cranes",
      "Technic Axles",
      "Technic Beams Special",
      "Technic Beams",
      "Technic Bricks",
      "Technic Bushes",
      "Technic Connectors",
      "Technic Gears",
      "Technic Panels",
      "Technic Pins",
      "Technic Special",
      "Technic Steering, Suspension and Engine",
      "Tiles Round and Curved",
      "Tiles Special",
      "Tiles",
      "Tools",
      "Transportation - Land",
      "Transportation - Sea and Air",
      "Tubes and Hoses",
      "Wheels and Tyres",
      "Windows and Doors",
      "Windscreens and Fuselage",
      "Znap"
    ]
  },
  "Color": {
    "@type": "Class",
    "name": "xsd:string",
    "rgb": "xsd:string",
    "transparent": "xsd:boolean"
  },
  "Element": {
    "@type": "Class",
    "color": {
      "@class": "Color",
      "@type": "Optional"
    },
    "image_url": {
      "@class": "xsd:anyURI",
      "@type": "Optional"
    },
    "part": "Part"
  },
  "Inventory": {
    "@type": "Class",
    "inventory_minifigs": {
      "@class": {
        "@class": "InventoryMinifig",
        "@subdocument": []
      },
      "@type": "Set"
    },
    "inventory_parts": {
      "@class": {
        "@class": "InventoryPart",
        "@subdocument": []
      },
      "@type": "Set"
    },
    "version": "xsd:positiveInteger"
  },
  "InventoryMinifig": {
    "@key": {
      "@fields": [
        "inventory_minifig_id"
      ],
      "@type": "Lexical"
    },
    "@subdocument": [],
    "@type": "Class",
    "inventory_minifig_id": "xsd:string",
    "minifig": "Minifig",
    "quantity": "xsd:positiveInteger"
  },
  "InventoryPart": {
    "@key": {
      "@fields": [
        "inventory_part_id"
      ],
      "@type": "Lexical"
    },
    "@subdocument": [],
    "@type": "Class",
    "element": "Element",
    "inventory_part_id": "xsd:string",
    "quantity": "xsd:positiveInteger",
    "spare": "xsd:boolean"
  },
  "InventorySet": {
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
    "@type": "Class",
    "inventory": "Inventory",
    "quantity": "xsd:positiveInteger"
  },
  "LegoSet": {
    "@type": "Class",
    "description": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "image_url": {
      "@class": "xsd:anyURI",
      "@type": "Optional"
    },
    "inventory_set": {
      "@class": {
        "@class": "InventorySet",
        "@subdocument": []
      },
      "@type": "Set"
    },
    "name": "xsd:string",
    "theme": "Theme",
    "year": "xsd:gYear"
  },
  "Material": {
    "@type": "Enum",
    "@values": [
      "Cardboard/Paper",
      "Cloth",
      "Foam",
      "Metal",
      "Plastic",
      "Rubber"
    ]
  },
  "Minifig": {
    "@key": {
      "@fields": [
        "figure_number"
      ],
      "@type": "Lexical"
    },
    "@type": "Class",
    "figure_number": "xsd:string",
    "img_url": "xsd:anyURI",
    "name": "xsd:string",
    "num_parts": {
      "@class": "xsd:positiveInteger",
      "@type": "Optional"
    }
  },
  "Part": {
    "@key": {
      "@fields": [
        "part_number"
      ],
      "@type": "Lexical"
    },
    "@type": "Class",
    "category": {
      "@id": "Category",
      "@type": "Enum",
      "@values": [
        "Bars, Ladders and Fences",
        "Baseplates",
        "Bricks Sloped",
        "Belville, Scala and Fabuland",
        "Bricks Curved",
        "Bricks Round and Cones",
        "Bricks Special",
        "Bricks Wedged",
        "Bricks",
        "Clikits",
        "Containers",
        "Duplo, Quatro and Primo",
        "Electronics",
        "Flags, Signs, Plastics and Cloth",
        "HO Scale",
        "Hinges, Arms and Turntables",
        "Large Buildable Figures",
        "Magnets and Holders",
        "Mechanical",
        "Minidoll Heads",
        "Minidoll Lower Body",
        "Minidoll Upper Body",
        "Minifig Accessories",
        "Minifig Heads",
        "Minifig Headwear",
        "Minifig Lower Body",
        "Minifig Upper Body",
        "Minifigs",
        "Modulex",
        "Non-Buildable Figures (Duplo, Fabuland, etc)",
        "Non-LEGO",
        "Other",
        "Panels",
        "Plants and Animals",
        "Plates Angled",
        "Plates Round Curved and Dishes",
        "Plates Special",
        "Plates",
        "Pneumatics",
        "Projectiles / Launchers",
        "Rock",
        "Stickers",
        "String, Bands and Reels",
        "Supports, Girders and Cranes",
        "Technic Axles",
        "Technic Beams Special",
        "Technic Beams",
        "Technic Bricks",
        "Technic Bushes",
        "Technic Connectors",
        "Technic Gears",
        "Technic Panels",
        "Technic Pins",
        "Technic Special",
        "Technic Steering, Suspension and Engine",
        "Tiles Round and Curved",
        "Tiles Special",
        "Tiles",
        "Tools",
        "Transportation - Land",
        "Transportation - Sea and Air",
        "Tubes and Hoses",
        "Wheels and Tyres",
        "Windows and Doors",
        "Windscreens and Fuselage",
        "Znap"
      ]
    },
    "material": {
      "@id": "Material",
      "@type": "Enum",
      "@values": [
        "Cardboard/Paper",
        "Cloth",
        "Foam",
        "Metal",
        "Plastic",
        "Rubber"
      ]
    },
    "name": "xsd:string",
    "part_number": "xsd:string"
  },
  "PartRelation": {
    "@type": "Class",
    "left": "Part",
    "relation_type": {
      "@id": "RelationType",
      "@type": "Enum",
      "@values": [
        "Alternate",
        "Mold",
        "Pair",
        "Pattern",
        "Print",
        "Sub-Part"
      ]
    },
    "right": "Part"
  },
  "RelationType": {
    "@type": "Enum",
    "@values": [
      "Alternate",
      "Mold",
      "Pair",
      "Pattern",
      "Print",
      "Sub-Part"
    ]
  },
  "Theme": {
    "@key": {
      "@fields": [
        "theme_id",
        "name"
      ],
      "@type": "Lexical"
    },
    "@type": "Class",
    "image_url": {
      "@class": "xsd:anyURI",
      "@type": "Optional"
    },
    "name": "xsd:string",
    "parent": {
      "@class": "Theme",
      "@type": "Optional"
    },
    "theme_id": "xsd:positiveInteger"
  }
}

// COLOR 
export const COLOR_DATA = {
  "@id": "Color/0083670d2fc828af565b009726bc74c061ae9c7d6a24504365db7cbd1a3e9ce1",
  "@type": "Color",
  "name": "Two-tone Silver",
  "rgb": "737271",
  "transparent": false
}

// ELEMENT 
export const ELEMENT_DATA = {
  "@id": "Element/2151cb25b413a5d6cf9e90cb59a8dd5f11773560158dda2a51b24bb2248efddf",
  "@type": "Element",
  "color": "Color/0083670d2fc828af565b009726bc74c061ae9c7d6a24504365db7cbd1a3e9ce1",
  "image_url": "https://cdn.rebrickable.com/media/parts/elements/6290307.jpg",
  "part": "Part/973c10h10pr5008"
}

// LEGO SET 
export const LEGO_SET_DATA = {
  "@id": "LegoSet/00084fa9b5ba84e4e7fe7ed8971518065c95e24f03e678f6e9b512a1887234cf",
  "@type": "LegoSet",
  "description": "\n\n\nName\nSpy-Bot\n\n\nReleased\n1987\n\n\nInventory\n63 parts\n\n\nTheme\nSpace > Classic Space\n\n\n",
  "image_url": "https://cdn.rebrickable.com/media/thumbs/sets/1498-1/7061.jpg/1000x800p.jpg",
  "inventory_set": [
    {
      "@id": "LegoSet/00084fa9b5ba84e4e7fe7ed8971518065c95e24f03e678f6e9b512a1887234cf/inventory_set/InventorySet/482f6f3140e66e8cc730ebbe622e248da05729fdd774a7a11b2daeb354b93866",
      "@type": "InventorySet",
      "inventory": "Inventory/faeb0046ea78a6aa7d3bcf31d6e2b0696be57d8197e390ab5b423ed0482cb84a",
      "quantity": "1"
    }
  ],
  "name": "Spy-Bot",
  "theme": "Theme/130+Classic%20Space",
  "year": "1987"
}

// INVENTORY 
export const INVENTORY_DATA = {
  "@id": "Inventory/faeb0046ea78a6aa7d3bcf31d6e2b0696be57d8197e390ab5b423ed0482cb84a",
  "@type": "Inventory",
  "inventory_parts": [
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203001%201",
      "@type": "InventoryPart",
      "element": "Element/34ad6d43f667d67e0f82852e5355ff827a207385ede32cfc2842e4d5a1eeef98",
      "inventory_part_id": "1673 3001 1",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203001%2014",
      "@type": "InventoryPart",
      "element": "Element/2881f02744abfde4ae1d87e024b78a06c45632a700e564db68ffb2632c3a77f0",
      "inventory_part_id": "1673 3001 14",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203001%204",
      "@type": "InventoryPart",
      "element": "Element/2151cb25b413a5d6cf9e90cb59a8dd5f11773560158dda2a51b24bb2248efddf",
      "inventory_part_id": "1673 3001 4",
      "quantity": "4",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203002%200",
      "@type": "InventoryPart",
      "element": "Element/bfe7bd64220739222fbe8f32ab1da481716184ff62cac282521c3435f135fc75",
      "inventory_part_id": "1673 3002 0",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203002%2014",
      "@type": "InventoryPart",
      "element": "Element/bded4a59af3e8bca25bc2b324b5a10777ec3b88415322ae9f912e8c36f7029e6",
      "inventory_part_id": "1673 3002 14",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203002%204",
      "@type": "InventoryPart",
      "element": "Element/d038603119d7e449caf421d622d7b989897aa7bc8b59522acda78bfe62116939",
      "inventory_part_id": "1673 3002 4",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203003%200",
      "@type": "InventoryPart",
      "element": "Element/06a15224a2a9e49ee05b72e4f89ff2ee9efa788715827d445c01cb8155c97919",
      "inventory_part_id": "1673 3003 0",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203003%201",
      "@type": "InventoryPart",
      "element": "Element/d0b80c9d38ec8d1173df3a0e34141b12129e64cc55a84d167ed77859a1a50428",
      "inventory_part_id": "1673 3003 1",
      "quantity": "3",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203003%2014",
      "@type": "InventoryPart",
      "element": "Element/df1185293abd5dd3dc1d021b150b0f0794e1d9f6229e105a8e6389540658ea58",
      "inventory_part_id": "1673 3003 14",
      "quantity": "2",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203003%204",
      "@type": "InventoryPart",
      "element": "Element/b0548004e888da5e1f39217699267f3afd040266313cb5009303c4f871419f59",
      "inventory_part_id": "1673 3003 4",
      "quantity": "4",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203007%204",
      "@type": "InventoryPart",
      "element": "Element/5f96f19c821e37ce29fac9e66708afe8326e8d6fccd19bd8be91f1e45ee8ff19",
      "inventory_part_id": "1673 3007 4",
      "quantity": "1",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%203483%200",
      "@type": "InventoryPart",
      "element": "Element/4cf6f41ce98c712ccdc6cc1d49f1855f0b8a73b253ecbd226a0777a8f6ea0ca9",
      "inventory_part_id": "1673 3483 0",
      "quantity": "4",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%204204%202",
      "@type": "InventoryPart",
      "element": "Element/4e5daf1d1a1e823e7da11298e8f647e6dca434cdf6af5caffb7055d54f81151a",
      "inventory_part_id": "1673 4204 2",
      "quantity": "1",
      "spare": false
    },
    {
      "@id": "Inventory/000378d22c4e1ac6abf25c2e575ec97695cb5608f089b1217d49d56762e7dd37/inventory_parts/InventoryPart/1673%204594%2047",
      "@type": "InventoryPart",
      "element": "Element/cdc2d381a58ebed100121fb7bb089dc951d176f15609fa7e05cb4cc1de3c94d3",
      "inventory_part_id": "1673 4594 47",
      "quantity": "1",
      "spare": false
    }
  ],
  "version": "1"
}

// MINIFIG 
export const MINIFIG_DATA = {
  "@id": "Minifig/fig-000004",
  "@type": "Minifig",
  "figure_number": "fig-000004",
  "img_url": "https://cdn.rebrickable.com/media/sets/fig-000004.jpg",
  "name": "Man, White Torso, Black Legs, Brown Hair",
  "num_parts": "4"
}

// PART 
export const PART_DATA = {
  "@id": "Part/003432",
  "@type": "Part",
  "category": "Stickers",
  "material": "Plastic",
  "name": "Sticker Sheet for Sets 357-1, 355-1, 940-1",
  "part_number": "003432"
}

// PART 
export const PART_RELATION_DATA = {
  "@id": "PartRelation/000bada8432b1b24bfcf960038468d73201986b8aeb1d6bc99132fa81149c634",
  "@type": "PartRelation",
  "left": "Part/003432",
  "relation_type": "Print",
  "right": "Part/973c03h03"
}

// THEME 
export const THEME_DATA={
  "@id": "Theme/130+Classic%20Space",
  "@type": "Theme",
  "name": "Classic Space",
  "parent": "Theme/126+Space",
  "theme_id": "130"
}