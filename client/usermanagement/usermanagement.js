Template.usermanagement.helpers({

	//Find the database entries for today, or create them if they don't exist
	userManager: function() {
		return Meteor.users.find({}, {sort: {'roles': 1, 'profile.name': 1}});
	},


});
