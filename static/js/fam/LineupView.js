define(['fam/PersonLineupView', 'fam/Family', 'tmpl!fam/JoinBtn', 'fam/JoinDialogView'], function (PersonLineupView, Family, JoinBtnTmpl, JoinDialogView) {
  return Backbone.View.extend({
    el: '#lineup',
    events: {
      'click .join a': 'showJoin'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'appendPerson', 'showJoin');

      this.collection = new Family();
      this.collection.bind('reset', this.render);
      this.collection.fetch();
    },
    appendPerson: function (person) {
      var personLineupView = new PersonLineupView({
        model: person
      });
      $(this.el).append(personLineupView.render().el);
    },
    showJoin: function () {
      var joinDialogView = new JoinDialogView();
      $('body').append(joinDialogView.render().el);
    },
    render: function () {
      _(this.collection.models).each(this.appendPerson);
      $(this.el).append(JoinBtnTmpl());
      return this;
    }
  });
});