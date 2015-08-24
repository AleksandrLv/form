(function ($) {
    var StatementView = Backbone.View.extend({
        el: '.document',

        initialize: function() {
            this.$name = this.$("#out-name");
            this.$faculty = this.$("#out-faculty");
            this.$course = this.$("#out-course");
            this.$statement = this.$("#out-statement");
            this.$date = this.$("#out-date");

            this.listenTo(st, 'change:name', this.render);
        },

        render: function() {
            this.$name.html(st.get('name'));
        }
    });
})(jQuery);