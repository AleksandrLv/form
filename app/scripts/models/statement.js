(function ($) {
    var Statement = Backbone.Model.extend({
        defaults:  {
            name: "",
            faculty: "",
            course: "",
            statement: "",
            date: ""
        },
        validate: function(attrs) {

        }
    });
})(jQuery);