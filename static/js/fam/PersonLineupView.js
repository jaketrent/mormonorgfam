define(['tmpl!fam/PersonLineupView', 'fam/PersonDetailView'], function (PersonLineupViewTmpl, PersonDetailView) {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .more': 'showDetail'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'showDetail');
    },
    showDetail: function () {
      var personDetailView = new PersonDetailView({
        model: this.model
      });
      $('body').append(personDetailView.render().el);
    },
    render: function () {
      $(this.el).html(PersonLineupViewTmpl(this.model.toJSON()));
      return this;
    }
  });
});