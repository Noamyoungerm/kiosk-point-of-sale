Meteor.startup(function () {
	var SIGNUP_CODE = 'z9ZRwzCpD61en3k8Npuj';
	var ADMIN_PASSWORD = 'y2hfochd5a';
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