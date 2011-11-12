define(['fam/Person'], function (Person) {
  return Backbone.Collection.extend({
    model: Person,
    url: '/ws/fam'
  });
});