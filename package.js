Package.describe({
  name: 'blerchin:meteor-gallery',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
//  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
	api.use('autopublish');
	api.use('edgee:slingshot');
	api.use('es5-shim');
	api.use('insecure');
	api.use('less');
	api.use('mobile-experience');
	api.use('mongo');
	api.use('meteor-base');
	api.use('nemo64:bootstrap');
	api.use('react');
	api.use('session');
	api.use('standard-minifiers');
	api.use('tracker');
	api.use('reactive-var');
	api.use('mrt:reactive-extra');
	api.imply("accounts-password");
	api.imply("accounts-ui");

  api.addFiles('meteor-gallery.js');
  api.addFiles('MeteorGallery.jsx');
  api.addFiles('Carousel.jsx');
  api.addFiles('Attachment.jsx');
  api.addFiles('Uploader.jsx');
  api.addFiles('UploaderAttachment.jsx');
  api.addFiles('AccountsUIWrapper.jsx');

  api.addFiles('meteor-gallery.less');

	api.export("MeteorGallery");

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('blerchin:meteor-gallery');
  api.addFiles('meteor-gallery-tests.js');
});

