define(['tmpl!fam/PersonDetailView'], function (PersonDetailViewTmpl) {
  return Backbone.View.extend({
    className: '.personDetail',
    events: {
      'click .close': 'closeView'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'closeView');
    },
    closeView: function () {
      this.remove();
    },
    render: function () {
      $(this.el).html(PersonDetailViewTmpl(this.model.toJSON()));
      return this;
    }
  });
});