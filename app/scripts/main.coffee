window.app = window.app or {}

$ ->
  statement = new app.Statement()
  new app.FormView model: statement
  new app.StatementView model: statement
  return

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

do ->
  app.StatementView = Backbone.View.extend(
    el: '.document'

    initialize: ->
      this.fields =
        'name': this.$("#out-name")
        'faculty': this.$("#out-faculty")
        'course': this.$("#out-course")
        'statement': this.$("#out-statement")
        'date': this.$("#out-date")
      console.log "stView"

      this.listenTo this.model, 'change', this.updateDocument
      this.render()
      return


    render: ->
      this.fields.name.html this.model.get 'name'
      this.fields.faculty.html this.model.get 'faculty'
      this.fields.course.html this.model.get 'course'
      this.fields.statement.html this.model.get 'statement'
      this.fields.date.html this.model.get 'date'
      return this


    updateDocument: ->
      _.each this.model.changedAttributes(), ((value, key) ->
        this.fields[key].html value
        return
      ), this
      return
  )
  return


do ->
  app.FormView = Backbone.View.extend(
    tagName: 'form'

    el: 'form'

    initialize: ->
      this.fields =
        'name': this.$("#in-name")
        'faculty': this.$("#in-faculty")
        'course': this.$("#in-course")
        'statement': this.$("#in-statement")
        'date': this.$("#in-date")
      console.log "fv"
      this.listenTo this.model, 'invalid', this.showErrors
      this.listenTo this.model, 'change', this.saveLocalStorage
      this.render()
      return


    events:
#      "change textarea": "edit"
#      "change input": "edit"
      "click #save": "saveData"

    render: ->
      _.each this.fields, (($input, field) ->
        $input.val this.model.attributes[field]
        return
      ), this
      return

    edit: (e) ->
      value = e.target.value.trim()
      fieldModel = e.target.id.split('-')[1]
      obj = {}
      obj[fieldModel] = value
      this.model.set obj, validate: true, field: fieldModel
      return


    saveData: ->
      this.hideErrors()
      obj = {}
      _.each this.fields, ($input, field) ->
        obj[field] = $input.val()
        return
      this.model.set obj, validate: true
#       this.model.save obj
      return


    saveLocalStorage: ->
      localStorage.setItem 'statement', JSON.stringify this.model.attributes
      return


    showErrors: (model, errors) ->
      _.each errors, ((error) ->
        inputField = this.fields[error.field]
        inputField.addClass 'error'
        inputField.next('.help-inline').text error.message
        return
      ), this
      return


    hideErrors: ->
      this.$('input').removeClass 'error'
      this.$('textarea').removeClass 'error'
      this.$('.help-inline').text ''
      return
  )
  return
