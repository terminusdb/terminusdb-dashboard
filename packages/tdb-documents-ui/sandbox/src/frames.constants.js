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