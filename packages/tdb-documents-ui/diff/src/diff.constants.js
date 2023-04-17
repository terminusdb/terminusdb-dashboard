/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
	"Sys": {
		"rdfProperty": {
			"@lang":"ka",
			"@value":"kan"
		},
		"jsonProp": [{
			"name": "joel",
			"age": 45,
			"nickName": "joe"
		},
		{
			"name": "K"
		},
	
		{
			"name": "RO",
			"age": 4,
			"nickName": "JJ"
		}]
	},
	"MarkDown" : {
		"text": [`
			You will like those projects!
			
			---
			
			# h1 Heading 8-)-)
			## h2 Heading
			### h3 Heading
			#### h4 Heading
			##### h5 Heading
			###### h6 Heading`, 
			`## h2 Heading`
		],
	
	},
	"Graduate": {
		"grades": [{
			"@type": "GradeReports",
			"unknown": [],
		},
		{
			"@type": "GradeReports",
			"Excellent": {
				"@type": "GoodStudents",
				"name": "Jim 1",
				"qualities": "good person"
			}
		},
		{
			"@type": "GradeReports",
			"notes": "sd"
		}],
		"@type": "Graduate"
	},
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		"favorite_subject": [{
			"@type": "Zoology",
			"Zoology_notes": "some notes 1",
			"subject_name": "zoology 1" 
		},
		{
			"@type": "Botony",
			"Botony_notes": "Botony_notes notes",
			"Botony_grade": "A",
			"subject_name": "Botony" 
		}],
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
		"nickNames": [
			"Nano N", "Parka N", "Li N"
		],
		"name": "Nina",
		"age": 23,
		/*"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1",
			"City": "City",
			"Country": "Country",
			"postalCode": "postalCode"
		}*/
	},
	"One": {
		"@id": "One/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "One",
		"name": "John",
		"likes": ["likes/one/1", "likes/one/same", "likes/one/34"]/*{
			"@type": "Animal", 
			"@id": "Animal/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
			"nickName": "Chooo",
			"category": "Cats",
			"owned_by": {
				"@id": "owned_by/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
				"@type": "Person", 
				"likes": { 
					"@id": "likes/Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
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
	}
}  
 

export const changedData = {
	
	"Sys": {
		"rdfProperty": {
			"@lang":"ka",
			"@value":"kan"
		},
		"jsonProp": [{
			"name": "joel new",
			"age": 45,
			"nickName": "joe new"
		},
		{
			"name": "K"
		},
		{
			"name": "joel newAN",
			"age": 45,
			"nickName": "JJ"
		}]
	},
	"Graduate": {
		"grades": [{
			"@type": "GradeReports",
			"absent": [],
		},
		{
			"@type": "GradeReports",
			"Excellent": {
				"@type": "GoodStudents",
				"name": "Jim 11",
				"qualities": "good person1"
			}
		},
		{
			"@type": "GradeReports",
			"notes": "sd 1"
		}],
		"@type": "Graduate"
	},
	"MarkDown" : {
		"text": [`
			You will like those projects!
			 
			---
			
			# h1 Heading 8-)
			## h2 Heading
			### h3 Heading
			#### h4 Heading
			##### h5 Heading
			###### h6 Heading`,
			`## h2 Heading 
			12`]
	},
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		"favorite_subject": [{
			"@type": "Zoology",
			"Zoology_notes": "some notes",
			"subject_name": "zoology" 
		},
		{
			"@type": "Botony",
			"Botony_notes": "Botony_notes notes",
			"Botony_grade": "A",
			"subject_name": "Botony" 
		}],
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
		"nickNames": [
			"Nano", "Parka N", "Li N"
		],
		"name": "Jose",
		"age": 13,
		"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1 new",
			"City": "City",
			"Country": "Country new",
			"postalCode": "postalCode new"
		}
	},
	"One": {
		"@id": "One/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "One",
		"likes":  ["likes/one/122", "likes/one/same", "likes/one/333"]/*{
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
				/*}
			}
		},*/
	}
} 


