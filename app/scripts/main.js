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

        initialize: function() {
            var attrs = JSON.parse(localStorage.getItem('statement'));
            this.set(attrs);
        },

        validate: function (attrs, options) {
            var errors = [];
            if (!this.checkRusText(attrs.name)) {
                errors.push({field: 'name', message: 'Имя русскими буквами в родительном падеже.'});
            }
            if (!this.checkRusText(attrs.faculty)) {
                errors.push({field: 'faculty', message: 'Факультет русскими буквами в родительном падеже.'});
            }
            if (!this.checkCourse(attrs.course)) {
                errors.push({field: 'course', message: 'Цифра от 1 до 6.'});
            }
            if (!this.checkDate(attrs.date)) {
                errors.push({field: 'date', message: 'Дата введена неверно. Введите дату в формате ДД.ММ.ГГГГ'});
            }
            return errors.length > 0 ? errors : false;
        },

        checkRusText: function(text) {
            var re = /^[а-яА-Я ]+$/;
            return re.test(text);
        },

        checkCourse: function(number) {
            var re = /^[1-6]$/;
            return re.test(number);
        },

        checkDate: function(date) {
            var re = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/;
            return re.test(date);
        }
    });
})();

(function () {
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
            this.render();
        },

        render: function () {
            this.fields.name.html(this.model.get('name'));
            this.fields.faculty.html(this.model.get('faculty'));
            this.fields.course.html(this.model.get('course'));
            this.fields.statement.html(this.model.get('statement'));
            this.fields.date.html(this.model.get('date'));
            return this;
        },

        updateDocument: function () {
            _.each(this.model.changedAttributes(),function(value,key){
                this.fields[key].html(value);
            },this);
        }
    });
})();

(function () {
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
})();