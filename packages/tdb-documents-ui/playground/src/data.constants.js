
// Mandatory Simple Document 
export const MANDATORY_DOCUMENT={
	"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
	"@type": "Person",
	"Birthday": "2022-08-15T12:59:46Z",
	"PhoneNumber": 353912839283123140,
	"Today": "2022-08-15T12:59:50Z",
	"above18": true,
	"age": 22,
	"email": "rack@gmail.com",
	"name": "John Rock",
	"permanentAddress": {
		"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "Address",
		"AddressLine1": "somewhere in Europe",
		"Country": "New Zeeland",
		"City": "City",
		"postalCode": "NZ29038"
	},
	"website": "rack@rocking.com"
}


// Set Document
export const SET_DOCUMENT = {
	"@id": "UnorderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf",
	"@type": "UnorderedPerson",
	"likes_color": [
		"Green",
		"Red",
		"Yellow"
	],
	"lived_at": [
		{
			"@id": "UnorderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/4f4fdae34ab4fa3b6297750917503a7137f75dc11589792de707e7a6d3502db3",
			"@type": "Address",
			"AddressLine1": "anywhere",
			"City": "Nice", 
			"Country": "France",
			"postalCode": "FR27836"
		},
		{
			"@id": "UnorderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/7aaeeb6b983710a0adbc75de8f7d8104278df427124beadc6644b35b9d6c30af",
			"@type": "Address",
			"AddressLine1": "somewhere",
			"City": "Berlin", 
			"Country": "Germany",
			"postalCode": "GER02398"
		}
	],
	"nicknames": [
		"Adam",
		"Chane",
		"Luca"
	],
	"worked_as": [
		"Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24",
		"Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda"
	]
}

// List Document 
export const LIST_DOCUMENT = {
	"@id": "OrderedPerson/c92d269b0dce719299bf86fc19f2065937ec4ef82d8a2a53702867a326d6144b",
	"@type": "OrderedPerson",
	"hangs_out_at" : [
		{
			"@id": "OrderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/4f4fdae34ab4fa3b6297750917503a7137f75dc11589792de707e7a6d3502db3",
			"@type": "Address",
			"AddressLine1": "anywhere",
			"City": "Nice", 
			"Country": "France",
			"postalCode": "FR27836"
		},
		{
			"@id": "OrderedPerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/7aaeeb6b983710a0adbc75de8f7d8104278df427124beadc6644b35b9d6c30af",
			"@type": "Address",
			"AddressLine1": "somewhere",
			"City": "Berlin", 
			"Country": "Germany",
			"postalCode": "GER02398"
		}
	],
	"likes_color": [
		"Blue",
		"Green",
		"Red"
	],
	"to_do": [
		"First Thing",
		"Second Thing",
		"Third Thing"
	]
}

// Array Document 
export const ARRAY_DOCUMENT = {
	"@id": "ArrayExamplePerson/c92d269b0dce719299bf86fc19f2065937ec4ef82d8a2a53702867a326d6144b",
	"@type": "ArrayExamplePerson",
	"hangs_out_at" : [
		{
			"@id": "ArrayExamplePerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/4f4fdae34ab4fa3b6297750917503a7137f75dc11589792de707e7a6d3502db3",
			"@type": "Address",
			"AddressLine1": "anywhere",
			"City": "Nice", 
			"Country": "France",
			"postalCode": "FR27836"
		},
		{
			"@id": "ArrayExamplePerson/3ca7d7a9c64ca2bc8319d83bca14b71697528ebb8536024e3e1795cbd049acdf/lived_at/Address/7aaeeb6b983710a0adbc75de8f7d8104278df427124beadc6644b35b9d6c30af",
			"@type": "Address",
			"AddressLine1": "somewhere",
			"City": "Berlin", 
			"Country": "Germany",
			"postalCode": "GER02398"
		}
	],
	"likes_color": [
		"Blue",
		"Green",
		"Red"
	],
	"to_do": [
		"First Thing",
		"Second Thing",
		"Third Thing"
	]
}


// Multi language 
export const MULTI_LANGUAGE_DOCUMENT = {
	"@id": "Example/36aa2286d3adff226e5e5d672d0fa2c6efb5b6c45f4cf6aa038ebc3f38495e47",
	"@type": "Example",
	"address": {
	  "@id": "Example/36aa2286d3adff226e5e5d672d0fa2c6efb5b6c45f4cf6aa038ebc3f38495e47/address/Address/5517d37b98620b486ffab7ff44c429eebe126bfc565728a62fba90e47a533295",
	  "@type": "Address",
	  "AddressLine1": "123 Street",
	  "Country": "Ireland",
	  "postalCode": "D23847"
	},
	"choice": "yes",
	"example_sys": {
	  "key": "value"
	},
	"name": "Anie",
	"nickName": "Aniee aniee",
	"previousAddress": [
	  {
		"@id": "Example/36aa2286d3adff226e5e5d672d0fa2c6efb5b6c45f4cf6aa038ebc3f38495e47/previousAddress/Address/1e9fbb8a4cc84d524e8bc552c2189ad4e2c71ecc62e31821f969122ccb5a74b0",
		"@type": "Address",
		"AddressLine1": "some place",
		"Country": "France",
		"postalCode": "FRA9213"
	  }
	],
	"scored": {
	  "@id": "Example/36aa2286d3adff226e5e5d672d0fa2c6efb5b6c45f4cf6aa038ebc3f38495e47/scored/Grades/375ee45e80ab2a2825d6e93ca04594ac3a0052d37f0a2e9413de6b1fd9f27caf",
	  "@type": "Grades",
	  "marks": 50
	},
	"studied": [
	  {
		"@id": "Example/36aa2286d3adff226e5e5d672d0fa2c6efb5b6c45f4cf6aa038ebc3f38495e47/studied/Maths/de81b2977f7596fd163a87ef0a479792d3e5803c82b004887a5be8e6f111ecf6",
		"@type": "Maths",
		"Number_of_classes_attended": 213,
		"course_start_date": "2022-08-29T10:03:41Z",
		"level": "Medium",
		"love_maths": true
	  }
	],
	"works_as": [
	  "Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda"
	]
  }
// choice sub document
export const CHOICE_SUB_DOCUMENT= {
	"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51",
	"@type": "Student",
	"favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
		"@type": "Botony",
		"Grade": "A",
		"Number_of_classes_attended": 4,
		"course_start_date": "2022-08-17T09:21:09Z", 
		"number_of_assignments": 5
	},
	"second_favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/second_favorite_subject/Zoology/2f0ab12e837a6d1bdbb15b41e556940b288167e7909061e1b32e56d91005431b",
		"@type": "Zoology",
		"Grade": "A",
		"Notes": "loves zoology",
		"Number_of_classes_attended": 5,
		"course_start_date": "2022-08-17T09:21:20Z"
	},
	"studied": [
	   {
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/studied/Botony/cc7e311138c8244f9ba043ad5f96e846c6a0961d9190210ee3f297f96976fd00",
			"@type": "Botony",
			"Grade": "A",
			"Number_of_classes_attended": 67,
			"course_start_date": "2022-08-17T09:21:53Z",
			"number_of_assignments": 23
	   },
	   {
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/studied/Maths/666ce31233a834b895f4c42e72b0b5250188ea4dcf2f2bb8bc0dc32e710ceb26",
			"@type": "Maths",
			"Number_of_classes_attended": 45,
			"course_start_date": "2022-08-17T09:21:37Z",
			"level": "Medium",
			"love_maths": true
	   }
	],
	"study_time_table": [
	   {
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/study_time_table/0/Zoology/d0cade9042e0baee8e0b91a8ed0e85ec09db40084d0ff56532d92a454ff67c57",
			"@type": "Zoology",
			"Grade": "A",
			"Notes": "Best student",
			"Number_of_classes_attended": 5,
			"course_start_date": "2022-08-17T09:22:06Z"
	   },
	   {
	 		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/study_time_table/1/Botony/be10b1f3c70c1fe28eb52ad3113352356ae53d3375436ae6719abe019dc28f76",
			"@type": "Botony",
			"Grade": "B",
			"Number_of_classes_attended": 54,
			"course_start_date": "2022-08-17T09:22:32Z",
			"number_of_assignments": 34
	   }
	]
}

// choice classes
export const CHOICE_CLASSES_DOCUMENT = {
	"@id": "Guy/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "Guy",
	"favorite_group": "Art/Charcoal%20Art%20Group",
	"attends_group_in_order": [
		"Dance/Dance%20Everyday",
	  "Art/Pastel%20Art%20Group",
	  "Music/Music%2220Pop"
	],
	"member_of": [
	  "Art/Pastel%20Art%20Group",
	  "Dance/Dance%20Everyday"
	],
	"second_favorite_group": "Dance/Dance%20Everyday",
	
}

// one of 
export const ONE_OF_DOCUMENT = {
	"@id": "Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23",
	"@type": "Graduate",
	"scored": {
	  "@id": "Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23/scored/Grades/8079b8089b18a97dab9d4af3bffd496f744841bf7b72caaa4a2a2f189fc496b7",
	  "@type": "Grades",
	  "report": {
		"@id": "Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23/scored/Graduate/efb4f89c825dd2c6404b5998b0d170b1df9a250103d7556833c3017e2107da23/scored/Grades/8079b8089b18a97dab9d4af3bffd496f744841bf7b72caaa4a2a2f189fc496b7/report/GradeReport/d947ef4e4a261ef6e469b9e24c944c58405e49952fe45b8f50852b650481aec1",
		"@type": "GradeReport",
		"comments": "Outstanding ",
		"score": "Outstanding"
	  }
	}
}

// sys 
export const SYS_JSON_DOCUMENT={
	"@id": "ComputerStudent/431b3406a64d99714b57133019408a16a6a514755fb229aff01419b4b423cb62",
	"@type": "ComputerStudent",
	"likes": {
		"age": 39,
		"name": "Madame Uppercut",
		"powers": ["Million tonne punch", "Damage resistance", "Superhuman reflexes"],
		"secretIdentity": "Jane Wilson"
	},
	"stores_as": [
		{
			"name": "Molecule Man",
			"age": 29,
			"secretIdentity": "Dan Jukes",
			"powers": [
				"Radiation resistance",
				"Turning tiny",
				"Radiation blast"
			]
		},
		{
			"name": "Eternal Flame",
			"age": 1000000,
			"secretIdentity": "Unknown",
			"powers": [
			  "Immortality",
			  "Heat Immunity",
			  "Inferno",
			  "Teleportation",
			  "Interdimensional travel"
			]
		}
	]
}

// metadata 
export const METADATA_EXAMPLE_DOCUMENT ={
	"@id": "metaDataExample/431b3406a64d99714b57133019408a16a6a514755fb229aff01419b4b423cb62",
	"@type": "metaDataExample",
	"title": "Example",
	"body": "---\ndescription: >-\n  This page provides an overview of the TerminusCMS dashboard to help you\n  navigate its features.\n---\n\n# Product Tour\n\nTerminusCMS includes many features to build content infrastructures for complex environments. This product tour aims to provide you with an understanding of how to navigate the product and get started on your projects.&#x20;\n\n* [Creating projects, managing them, and designing your schema](projects-data-products.md)\n* [Content and data curation](content-and-data-curation.md)\n* [Change request workflows for collaborative content management](change-request-workflows.md)\n* [Managing teams and users](manage-teams-and-users.md)\n* [GraphQL and WOQL playgrounds to build and test queries](graphql-and-woql-playgrounds.md)\n\n### Sign Up and Try Out a Demo Project&#x20;\n\nSign up for TerminusCMS for free at: [https://dashboard.terminusdb.com](https://dashboard.terminusdb.com).\n\nVerify your email address by clicking on the link emailed to you and logging in.\n\nClick get started on the Community Package and then select the automatically generated team.&#x20;\n\nFrom here, clone one of the demo projects to play around with -\n\n<figure><img src=\"../../.gitbook/assets/terminuscms-demos.png\" alt=\"\"><figcaption></figcaption></figure>"
}

// order_by
export const ORDER_BY_EXAMPLE_DOCUMENT ={
	"@id": "OrderByExample/431b3406a64d99714b57133019408a16a6a514755fb229aff01419b4b423cb62",
	"@type": "OrderByExample",
	"paragh": "An example showing field ordered",
	"title": "ordering example",
	"num_lines": "23",
	"body": {
		"@id": "SubBody/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/body/SubBody/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "SubBody",
		"text": "sample text",
    "section": "a section",
    "url": "https://terminusdb.com/"
	},
}

/********************************************* old stuff ***************** */

// Defined list to match with searched text for Document Links 
export const SELECT_OPTIONS = [
	{ value: 'Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24', label: 'Designer' },
	{ value: 'Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Lecturer' },
	{ value: 'Jobs/csd4bddb166325e704e3w68da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Writter' }
]



