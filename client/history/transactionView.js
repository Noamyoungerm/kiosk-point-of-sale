Template.transactionView.helpers({
    total: function() {
        return _.reduce(this.items, function(memo, item) {
            return memo + item.saleprice;
        }, 0);
    },
    profit: function() {
        return _.reduce(this.items, function(memo, item) {
            return memo + (item.saleprice - item.purchaseprice);
        }, 0);
    }
});
Template.transactionView.events = {
    "click #delete-button": function(e) {
        e.preventDefault();
        Meteor.call('deleteTransaction', this._id, function(error, id) {
            if (error) {
                console.log(error);
            } else {
                Router.go('history');
            }
        });
    }
}