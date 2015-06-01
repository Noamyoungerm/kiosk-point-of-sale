Template.dataNavbar.helpers({
    today: function() {
        return moment().format("DD-MM-YYYY");
    }
});
Template.dataNavbar.events({
    "click .searchdate": function(e) {
        e.preventDefault();
        var resolution = $(e.target).attr('id').split("-")[1]; //The ID MUST be of the form searchdate-resolution
        var date = moment($('#searchdate-input').val(), "DD-MM-YYYY");
        var urlSlug = {
            year: date.format("YYYY")
        };
        if (resolution == "month" || resolution == "day") {
            urlSlug.month = date.format("MM");
        }
        if (resolution == "day") {
            urlSlug.day = date.format("DD");
        }
        if (typeof this.data !== "undefined") {
            urlSlug = _.extend(urlSlug, this.data)
        }
        Router.go(this.viewTemplate, urlSlug);
    }
});