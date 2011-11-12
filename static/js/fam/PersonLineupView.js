define(['tmpl!fam/PersonLineupView'], function (PersonLineupViewTmpl) {
  return Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      _.bindAll(this, 'render');
    },
    render: function () {
      $(this.el).html(PersonLineupViewTmpl(this.model.toJSON()));
      return this;
    }
  });
});