Meteor.startup(function () {
	AccountsEntry.config({
	  signupCode: 'z9ZRwzCpD61en3k8Npuj',
	});

	if(Meteor.users.find().count() == 0){
		console.log("Created Default Administrator")
		adminId = Accounts.createUser({
		  email: "administrator@admin.net",
		  password: "y2hfochd5a",
		  profile: {
		  	name: "Administrator",
		  }
		});

		Roles.addUsersToRoles(adminId, "admin");
	}
});