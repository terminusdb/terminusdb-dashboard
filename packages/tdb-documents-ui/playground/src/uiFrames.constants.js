// constant to store ui frames for bootstrap class examples
export const BOOTSTRAP_CLASSES_UI_FRAME = {
    classNames: "bg-primary p-5 border border-success rounded ", // bootstrap classes at root level will alter look and feel of the form
    name:{
        "classNames" : "h3 " // make name header 3 size 
    },
    age: {
        "classNames" : "text-uppercase h2" // uppercase and header 2 size
    },
    PhoneNumber: {
        classNames: "text-danger fw-bold" // bootstrap classes at field level
    }
} 

// constant to store ui frames to show how to hide fields from form
export const HIDDEN_UI_FRAME = {
    name:{
        "ui:widget" : "hidden" // hide name field 
    },
    DOB:{
        "ui:widget" : "hidden"
    },
    likes_color: {
        "ui:widget" : "hidden"
    },
    studied: {
        "ui:widget" : "hidden"
    },
    works_as: {
        "ui:widget" : "hidden"
    },
    lives_at: {
        "ui:widget" : "hidden",
    }
} 

//constant to store ui frames to show different widgets on form 
export const WIDGETS_UI_FRAME  = {
    DOB: {
        "ui:widget": "alt-date"
    },
    comments: {
        "ui:widget": "textarea"
    },
    email: {
        "ui:widget": "email"
    },
    favorite_teacher : {
        "ui:widget": "radio"
    },
    likes_color: {
        "ui:widget": "color"
    },
    password: {
        "ui:widget": "password"
    }
}

// Geo JSON ui constanst 
export const LINE_STRING_UI_FRAME = {
    coordinates: {
        lineColor: "#de7dd8"
    }
}




