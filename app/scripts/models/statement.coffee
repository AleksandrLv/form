window.app = window.app or {}

do ->
  app.Statement = Backbone.Model.extend(
    defaults:
      name: ""
      faculty: ""
      course: ""
      statement: ""
      date: ""


    initialize: ->
      attrs = JSON.parse localStorage.getItem 'statement'
      this.set attrs
      return


    validate: (attrs, options) ->
      errors = []
      if !this.checkRusText attrs.name
        errors.push
          field: 'name'
          message: 'Имя русскими буквами в родительном падеже.'

      if !this.checkRusText attrs.faculty
        errors.push
          field: 'faculty'
          message: 'Факультет русскими буквами в родительном падеже.'

      if !this.checkCourse attrs.course
        errors.push
          field: 'course'
          message: 'Цифра от 1 до 6.'

      if !this.checkDate attrs.date
        errors.push
          field: 'date'
          message: 'Дата введена неверно. Введите дату в формате ДД.ММ.ГГГГ.'

      return if errors.length > 0 then errors else false

    checkRusText: (text) ->
      re = /^[а-яА-Я ]+$/
      return re.test text

    checkCourse: (number) ->
      re = /^[1-6]$/
      return re.test number

    checkDate: (date) ->
      re = /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}$/
      return re.test date
  )
  return