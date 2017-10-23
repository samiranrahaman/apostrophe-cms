// in lib/modules/schedule-form/index.js
var async = require('async');

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'schedule-form',
  label: 'Schedule Service Form',
  alias: 'contactForm',
  addFields: [
    {
      name: 'fname',
      type: 'string',
      label: 'First Name',
      required: true
    },
	 {
      name: 'lname',
      type: 'string',
      label: 'Last Name',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      label: 'Your Email',
      required: true
    },
    {
      name: 'title',
      type: 'string',
      label: 'Service',
      required: true
    },
	{
		  type: 'checkboxes',
		  name: 'preferences',
		  label: 'Preferences (check one or more)',
		  choices: [
			{
			  label: 'Big',
			  value: 'big'
			},
			{
			  label: 'Friendly',
			  value: 'friendly'
			},
			{
			  label: 'Furry',
			  value: 'furry'
			}
		  ]
		},
	{
		  type: 'select',
		  name: 'housing',
		  label: 'Where will you be staying?',
		  choices: [
			{
			  label: 'On Campus',
			  value: 'on-campus',
			  showFields: [
				'accessible', 'vegetarian'
			  ]
			},
			{
			  label: 'Off Campus',
			  value: 'off-campus'
			}
		  ]
	},


    {
      name: 'body',
      type: 'string',
      label: 'Message',
      textarea: true,
    }
  ],
  permissionsFields: false,

  afterConstruct: function(self) {
    self.setSubmitSchema();
  },

  construct: function(self, options) {

    self.setSubmitSchema = function() {
      self.submitSchema = self.apos.schemas.subset(self.schema,
        [ 'fname','lname', 'email', 'title', 'body','housing' ]
      );
    };

    self.submit = function(req, callback) {
      var piece = {};
      return async.series([
        convert,
        insert
      ], callback);
      function convert(callback) {
        return self.apos.schemas.convert(req, self.schema, 'form', req.body, piece, callback);
      }
      function insert(callback) {
        return self.insert(req, piece, { permissions: false }, callback);
      }
    };

  }
};