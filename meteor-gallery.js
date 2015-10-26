Attachments = new Mongo.Collection("attachments");


if (Meteor.isClient) {
	Meteor.subscribe("attachments");
	Session.setDefault('attachment-files', {});
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup

  });
	Meteor.publish("attachments", function(){
		return Attachments.find({
			$and: [
				{userId: this.userId}
			]
		});
	});
}

Meteor.methods({
	removeAttachment(attachmentId){
		Attachments.remove({ _id: attachmentId});
	},
	addAttachment(attachmentId, originalSrc){
		return Attachments.insert({
			userId: Meteor.userId(),
			originalSrc: originalSrc
		});
	},
	updateAttachment(attachmentId, originalSrc){
		Attachments.update(attachmentId, {
			$set: {
				originalSrc: originalSrc
			}
		});
	}
});
