export const FormPaymentLabels = {
	successTitle:'Your subscription was successful',
	successSubtitle:'Thank you for subscribing to TerminusX'
}

export const MemberPageLabels = {
	title:'Upgrate to pro plans',
	titleDesc:'* All subscriptions are automatically renewed until cancelled.'
}

export const PRICING={
    subtitle:'TerminusDB is an open source project',
    subtitle01:'if you are working on an open source or public interest project,',
    link:'apply for our enhanced program.',
    mailSubject:'TerminusHub open source knowledge program'
}

export const COMMUNITY_PLAN = "Community"
export const PROFESSIONAL_PLAN = "Professional"
export const SCALE_PLAN = "Scale"
export const ENTERPRISE_PLAN = "Enterprise"

export const PLANS_DESCRIPTION = [
    {
        title: COMMUNITY_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `Hosted by us, TerminusCMS is a full featured content and knowledge management system. The free account is limited on object storage and API calls. 

        If you exceed the limits you will need to upgrade to professional within a month. 
        We will inform you when you are close and when you cross the threshold.`,
        preprice:'',
        price:'Free',
        subprice:'',
        labelsList:[
            '3 Teams',
            '10 Users',
            '10 Data Products',
            '5 Roles',
            '10,000 Documents limit',
            '100,000 API calls per month',
            'Unlimited Remote Sources'
        ],
        color:"#fed893",
        buttonLabel:'Get Started',
        showButton:false
    },
    {
        title: PROFESSIONAL_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `Hosted by us, TerminusCMS is a full featured content and knowledge management system. 

        The professional package features 10 teams, 30 seats, 1 million API calls, and 100,000 documents.`,
        preprice:'',
        price:'100',
        subprice:'per month',
        labelsList:[
            '10 Teams',
            '30 Users',
            'Unlimited Data Products',
            '5 Roles',
            '100,000 document limit',
            '1 million API calls per month',
            'Unlimited Remote Sources'
        ],
        color:"#e87cd6",
        buttonLabel:"Update to Professional",
    },
    {
        title: SCALE_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `Hosted by us with guaranteed compute resource. API limits apply.`,
        preprice:'from ',
        price:'600',
        subprice:'per month',
        labelsList:[
            'Unlimited Teams',
            'Unlimited Users',
            'Unlimited Documents',
            '5 Roles',
            '10 million document limit',
            '10 million API calls per month',
            'Unlimited Remote Sources'
        ],
        color:"#8659fa",
        buttonLabel:"Update to Scale",
    },
    {
        title: ENTERPRISE_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `Custom plans to help with your organization-wide content and knowledge management. 

        We can provide bespoke services for deloyment, feature development, customization, and support. Please get in touch to discuss your requirements.`,
        price:'Get in touch',
        labelsList:[
            'Unlimited Teams',
            'Unlimited Users',
            'Unlimited Documents',
            'Unlimited Roles',
            'Unlimited document limit',
            'Unlimited API calls per month',
            'Unlimited Remote Sources'
        ],
        color:"#3450dc",
        buttonLabel:"Contact us",
    },

]

