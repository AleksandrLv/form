var app = app || {};

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