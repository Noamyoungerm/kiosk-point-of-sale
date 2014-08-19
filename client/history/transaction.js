Template.transaction.helpers({

  total: function(){
    return _.reduce(this.items, function(memo, item) {
      return memo + item.saleprice;
    }, 0);
  },

  profit: function(){
    return _.reduce(this.items, function(memo, item) {
      return memo + (item.saleprice - item.purchaseprice);
    }, 0);
  }

});