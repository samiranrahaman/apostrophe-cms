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
      name: 'phone',
      type: 'string',
      label: 'Phone Number',
      required: true
    },
	{
      name: 'zip',
      type: 'string',
      label: 'Zip Code',
      required: true
    },
	{
		  type: 'select',
		  name: 'title',
		  label: 'Service Needed',
		  choices: [
			{
			  label: 'Air Conditioning',
			  value: 'air-conditioning'
			},
			{
			  label: 'Heating and Furnace',
			  value: 'heating-and-furnace'
			},
			{
			  label: 'Plumbing',
			  value: 'plumbing'
			},
			{
			  label: 'Indoor Air Quality',
			  value: 'indoor-air-quality'
			}
		  ],
		  required: true
	},
    /* {
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
	}, */


    {
      name: 'body',
      type: 'string',
      label: 'Message',
      textarea: true,
    },
	{
	  type: 'checkboxes',
	  name: 'emergency',
	  choices: [
		{
		  label: 'I have an emergency',
		  value: 'yes'
		}
	  ]
	}
  ],
  permissionsFields: false,

  afterConstruct: function(self) {
    self.setSubmitSchema();
  },

  construct: function(self, options) {

    self.setSubmitSchema = function() {
      self.submitSchema = self.apos.schemas.subset(self.schema,
        [ 'fname','lname', 'title','email', 'phone', 'zip','body','emergency' ]
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