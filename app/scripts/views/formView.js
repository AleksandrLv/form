var app = app || {};

(function ($) {
    app.FormView = Backbone.View.extend({
        tagName: 'form',

        el: 'form',

        initialize: function() {
            this.fields = {
                'name' : this.$("#in-name"),
                'faculty' : this.$("#in-faculty"),
                'course' : this.$("#in-course"),
                'statement' : this.$("#in-statement"),
                'date' : this.$("#in-date")
            };
            this.listenTo(this.model, 'invalid', this.showErrors);
            this.listenTo(this.model, 'change', this.saveLocalStorage);
            this.render();
        },

        events: {
//            "change textarea": "edit",
//            "change input": "edit",
            "click #save": "saveData"
        },

        render: function() {
            _.each(this.fields,function($input,field){
                $input.val(this.model.attributes[field]);
            },this);
        },

        edit: function (e) {
            var value = e.target.value.trim();
            var fieldModel = e.target.id.split('-')[1];
            var obj = {};
            obj[fieldModel] = value;
            this.model.set(obj, {validate:true, field:fieldModel});
        },

        saveData: function() {
            this.hideErrors();
            var obj = {};
            _.each(this.fields,function($input,field){
                obj[field] = $input.val();
            });

            this.model.set(obj, {validate:true});
//            this.model.save(obj);
        },

        saveLocalStorage: function() {
             localStorage.setItem('statement',JSON.stringify(this.model.attributes));
        },

        showErrors: function(model, errors) {
            _.each(errors, function (error) {
                var inputField = this.fields[error.field];
                inputField.addClass('error');
                inputField.next('.help-inline').text(error.message);
            }, this);
        },

        hideErrors: function () {
            this.$('input').removeClass('error');
            this.$('textarea').removeClass('error');
            this.$('.help-inline').text('');
        }
    });
})(jQuery);