Template.itemHistory.helpers({

  totalRevenue: function(){
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    var total = itemCount(startDate, this.resolution, this.item);
    return total * this.item.purchaseprice;
  },

  totalProfit: function(){
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    var total = itemCount(startDate, this.resolution, this.item);
    return total * (this.item.saleprice - this.item.purchaseprice);
  },

  totalQuantity: function() {
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    return itemCount(startDate, this.resolution, this.item);
  },

  itemDataManager: function() {
    var nextResolution;
    if(this.resolution == "year") {
      nextResolution = "months"
    }
    if(this.resolution == "month") {
      nextResolution = "days"
    }
    if(this.resolution == "day") {
      nextResolution = "hours"
    }
    var startDate = moment(this.searchDate).startOf(this.resolution).toDate();
    var endDate = moment(this.searchDate).endOf(this.resolution).toDate();
    var data = [];
    for(var currentDate = startDate; currentDate < endDate; currentDate = moment(currentDate).add(1, nextResolution).toDate()) {
      data.push({
        dateText: displayDate(currentDate, this.resolution),
        qty: itemCount(currentDate, nextResolution, this.item),
        profit: itemCount(currentDate, nextResolution, this.item) * (this.item.saleprice - this.item.purchaseprice)
      });
    }
    return data;
  },
  itemData: function() {
    return {_id: this.item._id};
  }
});

Template.itemHistory.created = function() {
  this.data.searchDate = this.data.searchDate || moment().startOf('month').toDate();
  this.data.resolution = this.data.resolution || "month";
}

var itemCount = function(date, resolution, item) {
  var startDate = moment(date).startOf(resolution).toDate();
  var endDate = moment(date).endOf(resolution).toDate();
  var listContents = Transactions.find({date: {$gte: startDate, $lte: endDate}}).fetch();
  var total = 0;
  for (var i = listContents.length - 1; i >= 0; i--) {
    total += _.reduce(listContents[i].items, function(memo, currentItem) {
                  return memo + ((currentItem._id == item._id) ? 1 : 0);
                }, 0);
  }
  return total;
}

var displayDate = function(date, resolution) {
  if(resolution == "year") {
    return moment(date).format("MMM");
  }
  if(resolution == "month") {
    return moment(date).format("DD");
  }
  if(resolution == "day") {
    return moment(date).format("HH")
  }
}