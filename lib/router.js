Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});
Router.onBeforeAction('loading');
Router.route('inventory', {
    path: '/inventory',
    data: function() {
        return Items.find();
    },
    waitOn: function() {
        return Meteor.subscribe('items');
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('itemEdit', {
    path: '/inventory/edit/:_id/',
    data: function() {
        return Items.findOne(this.params._id);
    },
    waitOn: function() {
        return [Meteor.subscribe('transactions'), Meteor.subscribe('items')];
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('itemHistory', {
    path: '/inventory/history/:_id/:year/:month/:day?',
    data: function() {
        var urlDate = dateFromURL(this.params.year, this.params.month, this.params.day)
        return {
            searchDate: urlDate.date,
            resolution: urlDate.resolution,
            item: Items.findOne(this.params._id)
        };
    },
    waitOn: function() {
        return [Meteor.subscribe('transactions'), Meteor.subscribe('items')];
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('register', {
    path: '/register/',
    waitOn: function() {
        return Meteor.subscribe('items');
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('history', {
    path: '/history/',
    data: function() {
        return {
            searchDate: moment().startOf('day'),
            resolution: 'day'
        };
    },
    waitOn: function() {
        return [Meteor.subscribe('transactions'), Meteor.subscribe('items')];
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('history_date', {
    template: 'history',
    path: '/history/:year/:month/:day?',
    data: function() {
        var urlDate = dateFromURL(this.params.year, this.params.month, this.params.day)
        return {
            searchDate: urlDate.date,
            resolution: urlDate.resolution
        };
    },
    waitOn: function() {
        return [Meteor.subscribe('transactions'), Meteor.subscribe('items')];
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('transactionView', {
    path: '/transaction/view/:_id/',
    data: function() {
        return Transactions.findOne(this.params._id);
    },
    waitOn: function() {
        return [Meteor.subscribe('transactions'), Meteor.subscribe('items')];
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('usermanagement', {
    path: '/users/management/',
    waitOn: function() {
        return Meteor.subscribe('users');
    },
    onBeforeAction: function() {
        AccountsEntry.signInRequired(this);
    }
});
Router.route('home', {
    path: '/'
});
Router.route('about', {
    path: 'about'
});
var dateFromURL = function(year, month, day) {
    var resolution = 'day'; //Give a default resolution to look at
    /* When giving momement.js a date, it maps 0 to January and 11 to December.
     * In order to generate intuitive URLs we decrease the value by one on those fields */
    if (day === undefined || day == null) {
        resolution = 'month'; //If there's no day given, we look at the whole month
    }
    if (month === undefined || month == null) {
        resolution = 'year'; //If there's no month given, we look at the whole year
    } else {
        month--; //Correct off-by-one
    }
    return {
        'date': moment({
            'year': year,
            'month': month,
            'day': day
        }).startOf(resolution).toDate(),
        'resolution': resolution
    };
}