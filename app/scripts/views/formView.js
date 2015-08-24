var FormView = Backbone.View.extend({
    tagName: 'form',
    el: 'form',

    events: {
        "change #in-name": "edit"
    },

    initialize: function() {
        this.$name = this.$("#in-name");
        this.$faculty = this.$("#in-faculty");
        this.$course = this.$("#in-course");
        this.$statement = this.$("#in-statement");
        this.$date = this.$("#in-date");
    },

    edit: function(na) {
        console.log(na);
        var value = this.$name.val();
        var trimValue = value.trim();
        st.set({name: trimValue});
    }
});