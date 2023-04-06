/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		"likes": {
			"@type": "Animal", 
			"@id": "Animal/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
			"nickName": "Chooo",
			"category": "Cats",
			"owned_by": {
				"@id": "owned_by/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
				"@type": "Person", 
				"name": "Ron",
				"likes": { 
					"@id": "likes/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
					"@type": "Animal", 
					"nickName": "Ronny",
					"category": "Dogs",
					/*"owned_by": {
						"@type": "Person", 
						"name": "Marry Ann"
					}*/
				}
			}
		},
		"manYAddress": [
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			}
		], 
		/*"nickNames": [
			"Nano N", "Parka N", "Li N"
		],*/
		/*"name": "Nina",
		"age": 23,*/
		"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1",
			"City": "City",
			"Country": "Country",
			"postalCode": "postalCode"
		}
	}
} 
 

export const changedData = {
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		"likes": {
			"@id": "Animal/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
			"@type": "Animal", 
			"nickName": "Chooo",
			"category": "Cats",
			"owned_by": {
				"@id": "owned_by/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
				"@type": "Person", 
				"name": "Ron Terol",
				"likes": {
					"@id": "likes/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
					"@type": "Animal", 
					"nickName": "Jimmy",
					"category": "Dogs",
					/*"owned_by": {
						"@type": "Person", 
						"name": "Marry Ann"
					}*/
				}
			}
		},
		"manYAddress": [
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 new",
				"City": "City",
				"Country": "Country new",
				"postalCode": "postalCode new"
			},
			{
				"@type": "Address",
				"AddressLine1": "ADDR ",
				"City": "LATER",
				"Country": "LATER ",
				"postalCode": "LATER "
			},
		],
		/*"nickNames": [
			"Nano", "Parka N", "Li N"
		],*/
		/*"name": "Jose",
		"age": 13,*/
		/*"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1 new",
			"City": "City",
			"Country": "Country new",
			"postalCode": "postalCode new"
		}*/
	}
} 


