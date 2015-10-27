Meteor Gallery
=============
A nice sortable image uploader on Amazon S3, built using Meteor and React
--------------------------------------------------------------------------

Example Config (most of this required to connect AWS and Slingshot):
```Javascript
/* meteor-gallery-app.jsx */
if (Meteor.isClient) {

	Meteor.startup(function() {
		React.render(<MeteorGallery />, document.getElementById("render-target"));
	});
}

if (Meteor.isServer) {

	Slingshot.fileRestrictions("attachmentUploads", {
		allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
		maxSize: 20 * 1024 * 1024
	});

	Slingshot.createDirective('attachmentUploads', Slingshot.S3Storage, {
		bucket: "meteor-gallery-attachments",

		acl: "public-read",

		authorize: function(){
			if( Meteor.userId() ) {
				return true;
			}
		},

		key: function(file){
			return `${Meteor.userId()}/${Date.now()}__${file.name}`;
		},
	});
}
```

Don't forget to setup AWS access keys. See [Slingshot
Docs](https://github.com/CulturalMe/meteor-slingshot/).

