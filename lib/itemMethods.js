Meteor.methods({
	insertItem: function(item) {
		check(item.name, String);
		check(item.qty, Number);
		check(item.saleprice, Number);
		check(item.purchaseprice, Number);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin','inventory-management'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		return Items.insert(item);
	},

	deleteItem: function(itemID) {
		check(itemID, String);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin','inventory-management'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Items.remove(itemID);
	},

	updateItem: function(itemID, newItem) {
		check(itemID, String);
		check(newItem.name, String);
		check(newItem.qty, Number);
		check(newItem.saleprice, Number);
		check(newItem.purchaseprice, Number);

		delete newItem._id;

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin','inventory-management'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Items.update(itemID, newItem);
	},	

	buyItem: function(itemID) {
		check(itemID, String);

		if(!Meteor.user()) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Items.update(itemID, {$inc: {qty: -1}});
	}


});