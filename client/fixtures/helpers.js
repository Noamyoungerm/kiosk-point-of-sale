UI.registerHelper("priceFormatted", function(price) { 
	return  "₪" + (price.toFixed(2));
});

UI.registerHelper("dateFormatted", function(date) { 
	return  moment(date).format("DD-MM-YYYY HH:mm");
});

UI.registerHelper("currentYear", function() {
	return parseInt(moment().format("YYYY"));
})

UI.registerHelper("currentMonth", function() {
	return parseInt(moment().format("MM"));
})
