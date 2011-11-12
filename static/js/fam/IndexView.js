define([], function () {
  return Backbone.View.extend({
    el: '#main',
    initialize: function() {
      _.bindAll(this, 'render');
    },
    render: function () {
      $(this.el).html('awesome');
      return this;
    }
  });
});