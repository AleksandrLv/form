window.app = window.app or {}

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