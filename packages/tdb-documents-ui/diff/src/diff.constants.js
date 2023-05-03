/** Review DependencyRelation - boolean field  | Geometry */
export const oldData = {
	"Test": {new: ["X", "Y", "Z", "A", "B"]},
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
			KITTY NEW STUFF You will like those projects!
			
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
		"likes": [
			"A",
			"B"
		]
		/*"favorite_subject": [{
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
				/*}
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
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine NEW 1",
				"City": "City NEW 1",
				"Country": "Country NEW 1",
				"postalCode": "postalCode NEW 1"
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 NEW 2",
				"City": "City NEW 2",
				"Country": "Country NEW 2",
				"postalCode": "postalCode NEW 2"
			}
		],
		/*"nickNames": [
			"Nano N", "Parka N", "Li N",  "new", "again"
		],*/
		/*"name": "Nina",
		"age": 23,*/
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
		"likes": {
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
				}
			}
		},
	},
	"Definition": {
		"@id": "Definition/031b8d459e60df9ea656b686ec656928177d788d595051312f872fb8bd9b1df5",
		"@type": "Definition",
		"name": "ok",
		"parameters": [ 
			"P/13",
			"P/23",
			"P/3"
		],
		"returns": "Returns/NEW6091821362531aed8af24944c8dffe5a9ceeea1e572e2fb27c84029a49b6e732",
		"summary": "NEW Check whether the TerminusDB server is still OK.\n   Status is not OK when this function returns false\n   or throws an exception (mostly ConnectTimeout)"
	}
}  
 

export const changedData = {
	"Test": {new: ["X", "Y", "Z"]},
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
		"likes": [
			"A",
			"B",
			"C",
			"D"
		]
		/*"favorite_subject": [{
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
				/*}
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
			}
		],
		/*"nickNames": [
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
		}*/
	},
	"One": {
		"@id": "One/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "One",
		"likes": "likes/one/122"/*, "likes/one/same", "likes/one/333"]/*{
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
	},
	"Definition": {
		"@id": "Definition/031b8d459e60df9ea656b686ec656928177d788d595051312f872fb8bd9b1df5",
		"@type": "Definition",
		"name": "ok",
		"parameters": [
			"P/1",
			"P/2"
		],
		"returns": "Returns/6091821362531aed8af24944c8dffe5a9ceeea1e572e2fb27c84029a49b6e732",
		"summary": "Check whether the TerminusDB server is still OK.\n   Status is not OK when this function returns false\n   or throws an exception (mostly ConnectTimeout)"
	}
} 


