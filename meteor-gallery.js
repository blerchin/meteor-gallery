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
			},{
				sort:{weight: 1}
			});
	});
}

Meteor.methods({
	removeAttachment(attachmentId){
		Attachments.remove({ _id: attachmentId});
	},
	addAttachment(attachmentId, originalSrc){
		return Attachments.insert({
			_id: attachmentId,
			userId: Meteor.userId(),
			originalSrc: originalSrc
		});
	},
	updateAttachment(attachmentId, originalSrc, weight){
		check(attachmentId, String);
		check(originalSrc, String);
		check(weight, Number);


		Attachments.update(attachmentId, {
			$set: {
				originalSrc: originalSrc,
				weight: weight
			}
		});
	},
	sortAttachments(attachmentIds){
		check(attachmentIds, [String]);
		for( let i=0; i<attachmentIds.length; i++){
			Attachments.update(
				{ _id: attachmentIds[i]},
				{$set: {weight: i}}
			);
		}
	}
});
