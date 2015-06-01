Meteor.startup(function() {
    if (process.env.SIGNUP_CODE == '' || process.env.ADMIN_PASSWORD == '') {
        throw new Meteor.Error("Passwords must be set");
    }
    AccountsEntry.config({
        signupCode: process.env.SIGNUP_CODE,
    });
    if (Meteor.users.find().count() == 0) {
        console.log("Created Default Administrator")
        adminId = Accounts.createUser({
            email: "administrator@admin.net",
            password: process.env.ADMIN_PASSWORD,
            profile: {
                name: "Administrator",
            }
        });
        Roles.addUsersToRoles(adminId, "admin");
    }
});