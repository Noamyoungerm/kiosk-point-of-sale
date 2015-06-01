Template.inventory.helpers({
    itemManager: function() {
        return Items.find({}, {
            sort: {
                'name': 1
            }
        });
    },
});
Template.inventory.events = {
    "click #create-button": function(e) {
        e.preventDefault();
        Router.go("itemEdit", {
            _id: null
        });
    }
};