Uploader = React.createClass({

	files: {},

	renderAttachments(){
		if( this.props.attachments.length > 0 ) {
			return this.props.attachments.map((attachment) => {
				return <UploaderAttachment
					key={attachment._id}
					attachment={attachment}
					files={this.files}
					/>;
			});
		} else {
			return <div className="item empty-message">
				<p>Nothing uploaded yet.</p>
			</div>
		}
	},

	addNewAttachment(){
		var fileupload = document.getElementById('meteor-gallery-fileupload');
		fileupload.click();
	},

	uploadNewAttachment(event){
		for( var i=0; i<event.target.files.length; i++ ) {
			let attachmentId = Attachments.insert({
				userId: this.props.currentUser._id
			});
			this.files[attachmentId] = event.target.files[i];
		};
	},

	render(){
		return (
			<div className="uploader">
				<header className="uploader-header">
				</header>
				<div className="uploader-body">
					{this.renderAttachments()}
				</div>
				<header className="uploader-footer well">
					<button className="btn btn-default" onClick={this.addNewAttachment}>
						+ Upload New
					</button>
					<div className="uploader-form hidden">
						<input 
							id="meteor-gallery-fileupload" 
							type="file" 
							onChange={this.uploadNewAttachment}
							multiple
							/>
					</div>
				</header>
			</div>
		);
	}
});
