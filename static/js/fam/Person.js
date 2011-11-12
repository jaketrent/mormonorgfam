define([], function () {
  return Backbone.Model.extend({
    defaults: {
      name: '',
      tagline: '',
      img: '',
      url: ''
    }
  });
});