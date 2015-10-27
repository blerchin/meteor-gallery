Package.describe({
  name: 'blerchin:meteor-gallery',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A nice sortable image uploader on Amazon S3, built with Meteor and React.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/blerchin/meteor-gallery.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
//  api.versionsFrom('1.2.0.2');
  api.use('ecmascript@0.1.5');
	api.use('edgee:slingshot@0.7.1');
	api.use('es5-shim@4.1.13');
	api.use('less@2.5.0_3');
	api.use('mobile-experience@1.0.1');
	api.use('mongo@1.1.2');
	api.use('meteor-base@1.0.1');
	api.use('nemo64:bootstrap@3.3.5_2');
	api.use('react@0.1.13');
	api.use('session@1.1.1');
	api.use('standard-minifiers@1.0.1');
	api.use('tracker@1.0.9');
	api.use('check@1.0.6');
	api.use('accounts-password@1.1.3');
	api.use('accounts-ui@1.1.6');
	api.use('reactive-dict@1.1.2');
	api.addFiles('client/vendor/Sortable.js', ['client'], false);
	api.addFiles('client/vendor/react-sortable-mixin.js', ['client'], false);

  api.addFiles('meteor-gallery.js');
  api.addFiles('MeteorGallery.jsx');
  api.addFiles('Carousel.jsx');
  api.addFiles('Attachment.jsx');
  api.addFiles('Uploader.jsx');
  api.addFiles('UploaderList.jsx');
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

