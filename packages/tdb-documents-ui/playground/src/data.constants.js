
// Mnadatory Simple Document 
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

// use mandatory document for diff example
export const ORIGINAL_DIFF_MANDATORY_DOCUMENT={
	"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
	"@type": "Person",
	//"name": "John Rock",
	//"otherNames": "Birth",
	/*"website": "rack@rocking.com",
	"current_job": "Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24",*/
	"lives_at": {
		"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "Address",
		"AddressLine1": "Somewhere",
		"Country": "New Zeeland",
		"postalCode": "NZ29038",
		"City":"Same"
	}
	/*"likes_color": "Yellow",*/
	/*"nickNames": [
		"Joe",
		"Thor",
		
	],
	"work_history": [
		"Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda"
	],
	favorite_colors: [
		"Yellow",
		"Blue"
	]*/
}


export const CHANGED_DIFF_MANDATORY_DOCUMENT={
	"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
	"@type": "Person",
	//"name": "Major Rock",
	//"otherNames": "Rick",
	/*"website": "rack@rocking.com",
	"current_job": "Jobs/33e3013112e64ke6381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24",*/
	"lives_at": {
		"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "Address",
		"AddressLine1": "Anywhere",
		"City":"Same",
		//"Country": "New Zeeland",
		"postalCode": "7834PG"
	}
	//"likes_color": "Blue",
	/*"nickNames": [
		"Joe",
		"Ronny",
		//"Mac",
		//"New"
		//"Merc"
	],
	"work_history": [
		"Jobs/02e992d5393cc67897bcdb382015a9138a7662d88ce173a3332b83e371b8f7aa"
	],
	favorite_colors: [
		"Red",
		"Blue"
	]*/
}

/* Guy set does not work

    "attends_group_in_order": {
        "@class": "Group",
        "@type": "Set"
    },
    "favorite_group": "Group",
    "member_of": {
        "@class": "Group",
        "@type": "Set"
    },
    "second_favorite_group": {
        "@class": "Group",
        "@type": "Optional"
    }*/

export const ORIGINAL_TEST_LIST={
	"@id": "ComputerStudent/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "ComputerStudent",
	stores_as: [
		{
			key: 'jose',
			same: "yes",
			maybe: "what"
		},
		{
			key: 'xyz',
			same: "g",
		},
		{
			key: 'abc',
			same: "no",
		}
		
	]
}

/*{
	"@id": "TEST/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "TEST",
	/*work_as: [
		"Jobs/123fg4bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/abc929ddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24",
		"Jobs/72884bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda"
	]*/
	/*title: [
		"kitty_change",
		"jose"
	],*/
	/*lives_at: [
		{
			"@id": "Person/82a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "same first address",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "72a8a2778b"
		},
		{
			"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "original first address",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "72a8a2778b"
		},
		{
			"@id": "Person/9addd78bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "original second address",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "PGD"
		},
		{
			"@id": "Person/4444bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "same to test",
			"City":"Somwhere",
			"Country": "New Zeeland",
			"postalCode": "99"
		},
		{
			"@id": "Person/4987c4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "KK place",
			"City":"Kochi",
			"Country": "India",
			"postalCode": "Ind289"
		},
	]*/
//}*/

export const CHANGED_TEST_LIST= { 
	"@id": "ComputerStudent/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "ComputerStudent",
	stores_as: [
		{
			key: 'value',
			same: "yes",
			maybe: "what"
		}
	]
}
  /*{
	
	"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51",
	"@type": "Student",
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
			 "Grade": "B+",
			 "Number_of_classes_attended": 5,
			 "course_start_date": "2022-08-17T09:22:32Z",
			 "number_of_assignments": 4
		},
		{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/study_time_table/1/Botony/be10b1f3c70c1fe28eb52ad3113352356ae53d3375436ae6719abe019dc28f76",
		   "@type": "Botony",
		   "Grade": "B+",
		   "Number_of_classes_attended": 5,
		   "course_start_date": "2022-08-17T09:22:32Z",
		   "number_of_assignments": 4
	  },
		{
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/studied/Maths/666ce31233a834b895f4c42e72b0b5250188ea4dcf2f2bb8bc0dc32e710ceb26",
			"@type": "Maths",
			"Number_of_classes_attended": 45,
			"course_start_date": "2022-08-17T09:21:37Z",
			"level": "Medium",
			"love_maths": true
		  }
	 ]*/
//}
/*{
	"@id": "TEST/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "TEST",
	/*work_as: [
		"Jobs/adfg4bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/abc929ddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/72884bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/a9114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/k23bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda",
		"Jobs/123fg4bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda"
	]*/
	/*title: [
		"kitty",
		"jose"
	],*/
	/*lives_at: [
		{
			"@id": "Person/82a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "same first address",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "72a8a2778b"
		},
		{
			"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "changed first address",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "PGD"
		},
		{	
			"@id": "Person/9addd78bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",	
			"@type": "Address",	
			"AddressLine1": "original second address",	
			"City":"Same",	
			"Country": "New Zeeland",	
			"postalCode": "PGD"	
		},
		{
			"@id": "Person/4444bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "same to test",
			"City":"Somwhere",
			"Country": "New Zeeland",
			"postalCode": "99"
		},
		{
			"@id": "Person/4987c4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "same place",
			"City":"different",
			"Country": "India",
			"postalCode": "Ind289"
		},
	]*/
//}

export const ORIGINAL_LIST={
	"@id": "List/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "List",
	title: "something",
	/*name: [
		"maggi",
		"efghhhhhh"
	]*/
	name: [
		"kitty",
		"nutty",
		"frutty",
		"tuti"
	],
	/*name: [
		"kitty_before",
		"100",
		"jose",
		"same",
	]*/
	name: [
		"kitty",
		"100_before",
		"jose",
		"same",
		"200_before",
		"300_before",
		"same_again",
		"400_before",
		
	]
}

export const CHANGED_LIST={
	"@id": "List/4489199036b83dbf79a6e7527a1594fbd416d11b9dde2f8a67fe6fa495dae433",
	"@type": "List",
	title: "something changed",
	/*name: [
		"maggi_ch",
		"efghhhhhh_ch"
	]*/
	/*name: [
		"",
		"",
		"frutty",
		"nutty",
		
	],*/
	/*name: [
		"kitty",
		"100",
		"jose",
		"same"
	]*/
	name: [
		"kitty",
		"100_changed",
		"jose",
		"same",
		"200_changed",
		"300_changed",
		"same_again",
		"400_changed",
		"magic",
		"magic_1"
	]
}
// set subdocuments 
/*{
	"@id": "List/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
	"@type": "List",
	"lives_at": [
		{
		"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "Address",
		"AddressLine1": "original first address",
		"City":"Same",
		"Country": "New Zeeland",
		"postalCode": "72a8a2778b"
		},
		{
			"@id": "Person/9999asdjbafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "original address 9999",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "7834PG"
		}
	]
}*/
/*
export const CHANGED_LIST={
	"@id": "List/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
	"@type": "List",
	"lives_at": [
		{
		"@id": "Person/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
		"@type": "Address",
		"AddressLine1": "changed addressAnywhere",
		"City":"Same",
		//"Country": "New Zeeland",
		"postalCode": "7834PG"
		},
		{
			"@id": "Person/9999asdjbafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587/permanentAddress/Address/5879ec85b65bb0caaa03f48e99073a9d4302c31ec3c3a382889a12980899e95f",
			"@type": "Address",
			"AddressLine1": "changed second address 9999",
			"City":"Same",
			"Country": "New Zeeland",
			"postalCode": "7834PG"
		}
	]
}*/
	/*"favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
		"@type": "Botony",
		"Grade": "A+",
		"Number_of_classes_attended": 6,
		"course_start_date": "2022-08-17T09:21:09Z",
		"number_of_assignments": 5
	}
}*/

/**
 * "favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/studied/Maths/666ce31233a834b895f4c42e72b0b5250188ea4dcf2f2bb8bc0dc32e710ceb26",
      	"@type": "Maths",
      	"Number_of_classes_attended": 45,
      	"course_start_date": "2022-08-17T09:21:37Z",
      	"level": "Medium",
      	"love_maths": true
	}
 */

/**
 * "@id": "List/72a8a2778bafbc4290f59ca851e0307c6918f7205207d93ac1b2a1f796a94587",
	"@type": "List",
	"favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
		"@type": "Botony",
		"Grade": "A+",
		"Number_of_classes_attended": 6,
		"course_start_date": "2022-08-17T09:21:09Z",
		"number_of_assignments": 5
	}
 */




// Optional Document 
export const OPTIONAL_DOCUMENT = {
	"@id": "Info/c4abb650ad1b8a952e738186508de20f5e9bb691a3945fd61b505964d3ce16db",
	"@type": "Info",
	"alternativeAddress": {
		"@type": "Address",
		"AddressLine1": "Rockbrook avenue",
		"Country": "Australia",
		"postalCode": "3298",
		"City": "Sydney"
	},
	"nicknames": "Tommy"
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

// Defined list to match with searched text for Document Links 
export const SELECT_OPTIONS = [
	{ value: 'Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24', label: 'Designer' },
	{ value: 'Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Lecturer' },
	{ value: 'Jobs/csd4bddb166325e704e3w68da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Writter' }
]

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
	"member_of": [
	  "Art/Pastel%20Art%20Group",
	  "Dance/Dance%20Everyday"
	],
	"second_favorite_group": "Dance/Dance%20Everyday"
}

// one ofs 
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

// ui Frames 
export const UI_WIDGET_DOCUMENT = {
	"@id": "Teacher/ccb14e45952fd7b8faf38e26cf64052f0faae082d1b6f2a7c435ee62b199a7e8",
	"@type": "Teacher",
	"DOB": "2022-08-22T07:39:37Z",
	"comments": "Very good teacher. ",
	"email": "rock@gmail.com",
	"favorite_teacher": true,
	"likes_color": "#CA2222",
	"password": "dummy"
}

/** GEO JSON */
export const GEO_POINT_DOCUMENT = {
	"@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
	"@type": "Point",
	"coordinates": [
		53.34393439514184,
		-6.254528686083641
	],
	"type": "Point"
}

export const GEO_LINE_STRING_DOCUMENT = {
	"@id": "LineString/3a86d8a9b162aa7f8e053081f270dde2b40c7309e509d6e12c9ddf18346f34e5",
	"@type": "LineString",
	"coordinates": [
	  [
			53.322926883875546,
			-6.26537484739404
	  ],
	  [
			53.28706535897836,
			-6.242305645604074
	  ],
	  [
			53.33172144965978,
			-6.2617876437548965
	  ]
	],
	"type": "LineString"
}

export const GEO_POLYGON_DOCUMENT={
    "@id": "Polygon/c1449f01662914b65ebfdafeda25bf750727a93186e3f9e7fc3a53863782e55d",
    "@type": "Polygon",
    "coordinates": [
        [
            [
                51.515,
                -0.09
            ],
            [
                51.52,
                -0.1
            ],
            [
                51.52,
                -0.12
            ]
        ]
    ],
    "type": "Polygon"
}

export const GEO_MULTIPOLYGON_DOCUMENT = {
    "@id": "MultiPolygon/7f9b83c6de0a4618830d85b5fcdebc55aeb60486d6d6091a1a12e7ebe5d306b5",
    "@type": "MultiPolygon",
    "coordinates": [
        [
			[51.51, -0.12],
			[51.51, -0.13],
			[51.53, -0.13],
		  ],
		  [
			[51.51, -0.05],
			[51.51, -0.07],
			[51.53, -0.07],
		  ],
    ],
    "type": "MultiPolygon"
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