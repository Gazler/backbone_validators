I18n.translations = {};
I18n.translations["en"] = {
  "errors": {
    "form": {
      "required": "is required"
    }
  }
}

var Gazler = {};

Gazler.Model = Backbone.Model.extend({
  validates: {},
  errors: {},

  validate: function(changedAttributes) {
    this.errors = Backbone.Validate(this, changedAttributes);
    if (!_.isEmpty(this.errors)) {
      return this.errors;
    }
  }
});

Backbone.Validate = function(model, changedAttributes) {
  
  return (function() {
    this.errors = {};
    this.attributes = _.clone(model.attributes);
    _.extend(this.attributes, changedAttributes);
    _.each(model.validates, function(value, rule) {
      this.validators[rule](value);
    });

    this.validators = {
      required: function(fields) {
       _.each(fields, function(field) {
          if(_.isEmpty(this.attributes[field]) === true) {
            this.addError(field, I18n.t('errors.form.required'));
          }
        });
      }
    };

    this.addError = function(field, message) {
      if (_.isUndefined(this.errors[field])) {
        this.errors[field] = [];
      }
      this.errors[field].push(message);
    };

    return this.errors;
  })();
};
