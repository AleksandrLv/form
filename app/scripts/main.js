$(document).ready(function () {
    st = new Statement();
    fv = new FormView();
    sv = new StatementView();
});

var Statement = Backbone.Model.extend({
    defaults: {
        name: "",
        faculty: "",
        course: "",
        statement: "",
        date: ""
    },

    validate: function (attrs, options) {
        console.log(attrs.name);
    }
});

var StatementView = Backbone.View.extend({
    el: '.document',

    initialize: function () {
        this.$name = this.$("#out-name");
        this.$faculty = this.$("#out-faculty");
        this.$course = this.$("#out-course");
        this.$statement = this.$("#out-statement");
        this.$date = this.$("#out-date");

//        this.listenTo(st, 'change:name', this.render);
        this.listenTo(st, 'change', this.render);
    },

    render: function () {
        this.$name.html(st.get('name'));
        this.$faculty.html(st.get('faculty'));
        this.$course.html(st.get('course'));
        this.$statement.html(st.get('statement'));
        this.$date.html(st.get('date'));
    }
});

var FormView = Backbone.View.extend({
    tagName: 'form',

    el: 'form',

    events: {
        "change textarea": "edit",
        "change input": "edit"
    },

    edit: function (e) {
        var value = e.target.value.trim();
        var fieldModel = e.target.id.split('-')[1];
        var obj = {};
        obj[fieldModel] = value;
        st.set(obj, {validate:true});
    }
});