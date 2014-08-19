UI.registerHelper("priceFormatted", function(price) { 
	return  "₪" + (price.toFixed(2));
});

UI.registerHelper("dateFormatted", function(date) { 
	return  moment(date).format("DD-MM-YYYY HH:mm");
});