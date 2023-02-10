import React from "react"
import {RiCommunityLine, RiUserStarLine} from "react-icons/ri"
import {ImLibrary} from "react-icons/im"
import {FiUsers} from "react-icons/fi"

export const FormPaymentLabels = {
	successTitle:'Your subscription was successful',
	successSubtitle:'Thank you for subscribing to TerminusCMS'
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
        text: `Get started for free with the community package.`,
        preprice:'',
        price:'FREE',
        subprice:'',
        labelsList:[
            '3 Teams',
            '10 Users',
            '10 Data Products',
            '5 Roles',
            '10,000 Documents limit',
            '100,000 API calls per month'
        ],
        color:"#fed893",
        textColor: "#664d03",
        buttonLabel:'Get Started',
        buttonTextColor: "free_button_text_color",
        showButton:false,
        icon: <FiUsers className="subscription_icons free"/>,
        className: "free"
    },
    {
        title: PROFESSIONAL_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `More storage, API calls, teams and projects to go further.`,
        preprice:'',
        price:'100',
        subprice:' / month',
        labelsList:[
            '10 Teams',
            '30 Users',
            '30 Data Products',
            '5 Roles',
            '100,000 document limit',
            '1 million API calls per month'
        ],
        color:"#e87cd6",
        textColor: "text-white",
        buttonTextColor: "text-white",
        buttonLabel:"Upgrade to Professional",
        icon: <RiUserStarLine  className="subscription_icons professional"/>,
        className: "professional"
    },
    {
        title: SCALE_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `Dedicated compute resource with more storage and API calls.`,
        preprice:'from ',
        price:'600',
        subprice:' / month',
        labelsList:[
            '20 Teams',
            '100 Users',
            '100 Data Products',
            '5 Roles',
            '10 million document limit',
            '10 million API calls per month'
        ],
        color:"#8659fa",
        textColor: "text-white",
        buttonTextColor: "text-white",
        buttonLabel:"Upgrade to Scale",
        icon: <RiCommunityLine className="subscription_icons scale"/>,
        className: "scale"
    },
    {
        title: ENTERPRISE_PLAN,
        subtitle: 'Modern data infrastructure',
        limitation : ['- 10,000 document limit',
            '- 100,000 API calls'],
        text: `Enterprise support and development services.`,
        price:'TALK',
        labelsList:[
            'Deployment',
            'Feature Development',
            'Customization',
            'Support',
            'Data Consultancy',
            'placeholder_label'
        ],
        color:"#3450dc",
        textColor: "text-white",
        buttonTextColor: "text-white",
        buttonLabel:"Contact us",
        icon: <ImLibrary className="subscription_icons enterprise"/>,
        className: "enterprise"
    },

]

