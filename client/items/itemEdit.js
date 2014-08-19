Template.itemEdit.helpers = {
  isNewItem: function() {
    return this._id == null || this._id == "null";
  }
}
//If I feel like it, condense this into item.js like the user profile edit
Template.itemEdit.events = {
  "submit form": function(e) {
    e.preventDefault();
    var itemUpdateProperties = {
      name: $(e.target).find("[name=nameinput]").val(),
      qty: parseInt($(e.target).find("[name=quantityinput]").val()),
      saleprice: parseFloat($(e.target).find("[name=saleinput]").val()),
      purchaseprice: parseFloat($(e.target).find("[name=purchaseinput]").val()),
    };
    if(this._id == null || typeof this._id == "undefined"){
      Meteor.call('insertItem', itemUpdateProperties, function(error, id){
        if(error) {
          console.log(error);
        } else {
          Router.go('inventory');
        }
      });
    } else {
      Meteor.call('updateItem', this._id, itemUpdateProperties, function(error, id){
        if(error) {
          console.log(error);
        } else {
          Router.go('inventory');
        }
      });
    }
   
  },

  "click #delete-button": function(e) {
    e.preventDefault();
    Meteor.call('deleteItem', this._id, function(error, id) {
      if(error) {
        console.log(error);
      } else {
        Router.go('inventory');
      }
    });
  }
}