//Handles click events inside of a displayed row
Template.userRow.helpers({
  defaultCheck: function() {
  	return Roles.userIsInRole(this._id, 'admin');
  },
  emailAddr: function(){
  	return this.emails[0].address;
  }
});

//Handles click events inside of a displayed row
Template.userRow.events = {
  "click #set-role": function(e) {
    e.preventDefault();
    var role = $("#role-0-" + this._id).is(':checked') ? $("#role-0").val() : "none";
    console.log(role);
    Meteor.call('setUserRole', this._id, role, function(error, id){
    	if(error) {
        console.log(error);
      }
    });
  }
}