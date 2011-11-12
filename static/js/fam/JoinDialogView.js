define(['tmpl!fam/JoinDialog', 'fam/Person'], function (JoinDialogTmpl, Person) {
  return Backbone.View.extend({
    className: 'joinDialog',
    events: {
      'click .close': 'closeView',
      'click .go': 'importProfile'
    },
    initialize: function () {
      _.bindAll(this, 'render', 'closeView', 'importProfile');
      this.model = new Person();
    },
    closeView: function () {
      this.remove();
    },
    importProfile: function () {
      this.model.save(this.model.attributes, {
        success: function (model, res) {
          alert('success!');
        },
        error: function (model, res) {
          alert('failure!');
        }
      });
    },
    render: function () {
      $(this.el).html(JoinDialogTmpl());
      return this;
    }
  });
});