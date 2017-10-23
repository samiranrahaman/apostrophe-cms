var apos = require('apostrophe')({
  shortName: 'apostrophesandbox',
  title: 'Apostrophe Sandbox 2.0.0',
  demo: true,
  
  bundles: ['apostrophe-blog'],

  // These are the modules we want to bring into the project.
  modules: {
    
    'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
    'apostrophe-express': {
      session: {
        secret: 'ksajhfkdsfha43fahif3a8asdfkyfsd7f'
      }
    },
    
    // Standard Apostrophe Modules
    'apostrophe-assets': {},
    'apostrophe-blog': {},
    'apostrophe-blog-pages': {},
    'apostrophe-blog-widgets': {},
    'apostrophe-users': {},
	'apostrophe-forms': {},
	'schedule-form': {},
    'schedule-form-widgets': {},
	//'contact-form': {},
    //'contact-form-widgets': {},
	
	
	


    // Apostrophe Sandbox (as-) specific modules
    'as-helpers': {},
    'as-two-column-block-widgets': {},

    // REMOVE ME IMMEDIATELY if you are not running a public demo
    // that should let EVERYBODY be INSTANTLY loggged in AS ADMIN!
    'demo-autologin': {},
	 'apostrophe-twitter-widgets': {
      consumerKey: 'MZk5qjnp8CvlsRBhKe6KtSzMN',
      consumerSecret: 'cYdWWUIQcdJ50XaoEUAHc7wis3yS8186yMIutLGury4uuk2D3X',
      accessToken: '147629346-yQArcbO3yTEcX7i9AcnyDnMXHBs06P1ikhK5Osa3',
      accessTokenSecret: 'gV5euySVLF3yr39gpT19SVABbQ2kVxPoXRNX9Vxi2pVhM'
    },
	
	
	
  }

});
