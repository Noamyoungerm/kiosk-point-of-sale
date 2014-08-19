Meteor.methods({
	setUserRole: function(userId, role) {
		check(userId, String);
		check(role, String);
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}


		return Roles.setUserRoles(userId, [role]);
	}

});