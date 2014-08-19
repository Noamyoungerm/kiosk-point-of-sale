Meteor.publish('transactions', function(){
    return Transactions.find();
});

Meteor.publish('items', function(){
    return Items.find();
});

Meteor.publish('users', function(){
  if(Roles.userIsInRole(this.userId, 'admin')) { //Publish the student's own data instead
    return Meteor.users.find();
  }
  this.stop();
  return;
})