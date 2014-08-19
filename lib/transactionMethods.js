Meteor.methods({
	insertTransaction: function(transactionItems) {
		check(transactionItems, Array);

		var transaction = {};
		transaction.date = new Date()
		transaction.items = transactionItems;

		if(!Meteor.user()) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		return Transactions.insert(transaction);
	},

	deleteTransaction: function(transactionID) {
		check(transactionID, String);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin','finance-management'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Transactions.remove(transactionID);
	},

	updateTransaction: function(transactionID, newTransaction) {
		check(transactionID, String);
		check(newTransaction.items, Array);

		newTransaction.date = new Date();
		delete newTransaction._id;

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin','finance-management'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Transactions.update(transactionID, newTransaction);
	}
});