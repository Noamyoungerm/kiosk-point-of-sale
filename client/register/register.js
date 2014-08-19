Template.register.helpers({
  purchaseItems: function() {
    return Session.get("purchaseItems");
  },
  total: function(){
    var items = Session.get("purchaseItems");
    return _.reduce(items, function(memo, item) {
      return memo + item.saleprice;
    }, 0);
  }
});

Template.register.events = {
  "submit #entryform": function(e) {
    e.preventDefault();
    var item = Items.findOne({
      name: $(e.target).find("[name=itementry]").val()
    });
    var currentPurchaseItems = Session.get("purchaseItems");

    if (typeof item == "undefined") {
      $(e.target).find("[name=itementry]").parent().addClass("has-error");
      $('#itementry-error').html('Item does not exist')
      return;
    } 

    var currentItemInQueue = _.filter(currentPurchaseItems, function(testItem) {
      return testItem._id == item._id;
    });
    currentItemInQueue = currentItemInQueue.length;

    if (item.qty - currentItemInQueue <= 0) {
      $(e.target).find("[name=itementry]").parent().addClass("has-error");
      $('#itementry-error').html('Item is out of stock')
      return;
    }

    $(e.target).find("[name=itementry]").parent().removeClass("has-error"); //Clear old errors
    $('#itementry-error').html('')

    currentPurchaseItems.push(item)
    Session.set("purchaseItems", currentPurchaseItems);
    $(e.target).find("[name=itementry]").val(""); //Clear for next item
  },

  "click .removebtn": function(e) {
    e.preventDefault();
    var removeID = $(e.target).attr('id').split('-')[1]; //ID must be of the form removebtn-itemID
    var purchaseItems = Session.get("purchaseItems")
    for (var i = purchaseItems.length - 1; i >= 0; i--) {
      if(purchaseItems[i]._id == removeID){
        purchaseItems.splice(i, 1);
        Session.set("purchaseItems", purchaseItems);
        return;
      }
    }
  },

  "click #submitbtn": function(e) {
    e.preventDefault();
    var purchaseItems = Session.get("purchaseItems");
    if(purchaseItems.length == 0){
      return;
    }
    _.each(purchaseItems, function(item){
        Meteor.call('buyItem', item._id, function(error, id) {
            if(error) console.log(error);
        });
    });
    Meteor.call('insertTransaction', purchaseItems, function(error, id){
      if(error) console.log(error);
    });

  }
};

Template.register.created = function() {
  Session.set("purchaseItems", []);
}