var app = app || {};

$(function () {
    var statement = new app.Statement();
    new app.FormView({model:statement});
    new app.StatementView({model:statement});
});

(function () {
    app.Statement = Backbone.Model.extend({
        defaults: {
            name: "",
            faculty: "",
            course: "",
            statement: "",
            date: ""
        },

        validate: function (attrs, options) {
            console.log(attrs);
        }
    });
})();

(function ($) {
    app.StatementView = Backbone.View.extend({
        el: '.document',

        initialize: function () {
            this.fields = {
                'name' : this.$("#out-name"),
                'faculty' : this.$("#out-faculty"),
                'course' : this.$("#out-course"),
                'statement' : this.$("#out-statement"),
                'date' : this.$("#out-date")
            };
            this.listenTo(this.model, 'change', this.updateDocument);
        },

        render: function () {
            this.fields.name.html(this.model.get('name'));
            this.fields.faculty.html(this.model.get('faculty'));
            this.fields.course.html(this.model.get('course'));
            this.fields.statement.html(this.model.get('statement'));
            this.fields.date.html(this.model.get('date'));
        },

        updateDocument: function () {
            var self = this;
            _.each(this.model.changedAttributes(),function(value,key){
                self.fields[key].html(value);
            });
        }
    });
})(jQuery);

(function ($) {
    app.FormView = Backbone.View.extend({
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
            this.model.set(obj, {validate:true});
        }
    });
})(jQuery);