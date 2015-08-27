window.app = window.app or {}

$ ->
  statement = new app.Statement()
  new app.FormView model: statement
  new app.StatementView model: statement
  return