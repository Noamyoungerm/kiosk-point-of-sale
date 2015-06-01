Meteor.publish('transactions', function() {
    if (Roles.userIsInRole(this.userId, ['admin', 'finance-management'])) {
        return Transactions.find();
    }
    this.stop();
    return;
});
Meteor.publish('items', function() {
    if (Roles.userIsInRole(this.userId, ['admin', 'inventory-management'])) {
        return Items.find();
    }
    return Items.find({}, {
        fields: {
            name: 1,
            saleprice: 1,
            qty: 1
        }
    });
});
Meteor.publish('users', function() {
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Meteor.users.find();
    }
    this.stop();
    return;
})