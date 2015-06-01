Meteor.startup(function() {
    AccountsEntry.config({
        logo: '/iasa-logo.png',
        homeRoute: '/sign-in/', // mandatory - path to redirect to after sign-out
        dashboardRoute: '/register', // mandatory - path to redirect to after successful sign-in
        passwordSignupFields: 'EMAIL_ONLY',
        showSignupCode: true,
        extraSignUpFields: [{ // Add extra signup fields on the signup page
            field: "name", // The database property you want to store the data in
            label: "Full Name", // The html lable for the field
            type: "text", // The type of field you want
            required: true // Adds html 5 required property if true
        }]
    });
});