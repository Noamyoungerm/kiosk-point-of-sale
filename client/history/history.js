Template.history.helpers({

	transactionManager: function() {
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    var endDate = moment(this.searchDate).endOf(this.resolution).toDate();
		return Transactions.find({date: {$gte: startDate, $lte: endDate}}, {sort:{'date':1}});
	},

  totalRevenue: function(){
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    var endDate = moment(this.searchDate).endOf(this.resolution).toDate();
    var listContents = Transactions.find({date: {$gte: startDate, $lte: endDate}}).fetch();
    var total = 0;
    for (var i = listContents.length - 1; i >= 0; i--) {
      total += _.reduce(listContents[i].items, function(memo, item) {
                    return memo + item.saleprice;
                  }, 0);
    }
    return total;
  },

  totalProfit: function(){
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    var endDate = moment(this.searchDate).endOf(this.resolution).toDate();
    var listContents = Transactions.find({date: {$gte: startDate, $lte: endDate}}).fetch();
    var total = 0;
    for (var i = listContents.length - 1; i >= 0; i--) {
      total += _.reduce(listContents[i].items, function(memo, item) {
                    return memo + (item.saleprice - item.purchaseprice);
                  }, 0);
    }
    return total;
  }
});