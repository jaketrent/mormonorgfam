define(['fam/PersonLineupView', 'fam/Family'], function (PersonLineupView, Family) {
  return Backbone.View.extend({
    el: '#lineup',
    initialize: function () {
      _.bindAll(this, 'render', 'appendPerson');

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
    render: function () {
      _(this.collection.models).each(this.appendPerson);
      return this;
    }
  });
});