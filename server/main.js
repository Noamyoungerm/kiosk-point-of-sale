Meteor.startup(function () {
	var SIGNUP_CODE = '';
	var ADMIN_PASSWORD = '';
	if(SIGNUP_CODE == '' || ADMIN_PASSWORD == ''){
		throw new Meteor.Error("Passwords must be set");
	}
	AccountsEntry.config({
	  signupCode: SIGNUP_CODE,
	});

	if(Meteor.users.find().count() == 0){
		console.log("Created Default Administrator")
		adminId = Accounts.createUser({
		  email: "administrator@admin.net",
		  password: ADMIN_PASSWORD,
		  profile: {
		  	name: "Administrator",
		  }
		});

		Roles.addUsersToRoles(adminId, "admin");
	}
});