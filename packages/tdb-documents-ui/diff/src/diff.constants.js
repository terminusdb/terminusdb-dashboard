/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		/*"likes": {
			"@type": "Animal", 
			"nickName": "Chooo",
			"category": "Cats",
			"owned_by": {
				"@type": "Person", 
				"name": "Ron Terol",
				"likes": {
					"@type": "Animal", 
					"nickName": "Ronny",
					"category": "Dogs",
					/*"owned_by": {
						"@type": "Person", 
						"name": "Marry Ann"
					}*/
				/*}
			}
		},*/
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
		"name": "Nina",
		"age": 23,
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
		/*"likes": {
			"@type": "Animal", 
			"nickName": "Chooo",
			"category": "Cats",
			"owned_by": {
				"@type": "Person", 
				"name": "Ron Terol",
				"likes": {
					"@type": "Animal", 
					"nickName": "Jimmy",
					"category": "Dogs",
					/*"owned_by": {
						"@type": "Person", 
						"name": "Marry Ann"
					}*/
				/*}
			}
		},*/
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
		"name": "Jose",
		"age": 13,
		"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1 new",
			"City": "City",
			"Country": "Country new",
			"postalCode": "postalCode new"
		}
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


		/*
		Student:  {
		"@id": "Student/6d7ce84afe75bb58615511b80943afaf2914033227cb2579d829e090536a82f5",
		"@type": "Student",
		/*"favorite_subject": {
		  "@id": "Student/6d7ce84afe75bb58615511b80943afaf2914033227cb2579d829e090536a82f5/favorite_subject/Botony/c4237ac7344ff668791825f5c8fb879f1e013a568c711ff9bc68c2ee7e097302",
		  "@type": "Botony",
		  "Botony_Notes": "Botony_Notes",
		  "subject_main_note": "subject_main_note"
		},*/
		/*"hangs_out": [
			{
			  "@id": "Student/6d7ce84afe75bb58615511b80943afaf2914033227cb2579d829e090536a82f5/hangs_out/0/address/d294eb1adf71bb8c55ade3e9360ee63abb0747b0949f984c09c0c94ae9313dfa",
			  "@type": "address",
			  "address_line_1": "address_line_1_one_list",
			  "numer": "1",
			  "zip": "address_line_1_one_list"
			},
			{
			  "@id": "Student/6d7ce84afe75bb58615511b80943afaf2914033227cb2579d829e090536a82f5/hangs_out/0/address/d294eb1adf71bb8c55ade3e9360ee63abb0747b0949f984c09c0c94ae9313dfa",
			  "@type": "address",
			  "address_line_1": "address_line_2_one_list",
			  "numer": "2",
			  "zip": "address_line_2_one_list"
			}
		  ],
		  /*"lives_in": {
			"@id": "Student/6d7ce84afe75bb58615511b80943afaf2914033227cb2579d829e090536a82f5/lives_in/address/9c4469565edd8cc270607dc167bc855915cfd6eb00094bff9b2b547ac621e501",
			"@type": "address",
			"address_line_1": "address_line_1_OPT",
			"numer": "1",
			"zip": "address_line_1_OPT"
		  },*/
		  /*"studied": [
			{
			  "@id": "Student/6d7ce84afe75bb58615511b80943afaf2914033227cb2579d829e090536a82f5/studied/Botony/124cbe54f2eee96e87e4eb6cc780b86970b4e2497ad6726e85dbc0b98e2ffc2a",
			  "@type": "Botony",
			  "Botony_Notes": "Botony_Notes_LIST_1",
			  "subject_main_note": "Botony_Notes_LIST_1"
			}
		  ]*/
		/*}*/

