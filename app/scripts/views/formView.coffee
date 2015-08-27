window.app = window.app or {}

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