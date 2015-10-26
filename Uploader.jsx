ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
Uploader = React.createClass({

	files: {},
	filesDependency: new Tracker.Dependency,

	renderAttachments(){
		if( this.props.attachments.length > 0 ) {
			return this.props.attachments.map((attachment) => {
				return <UploaderAttachment
					key={attachment._id}
					attachment={attachment}
					files={this.files}
					filesDependency={this.filesDependency}
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
		for( let i=0; i<event.target.files.length; i++ ) {
			let file = event.target.files[i];
			Meteor.call("addAttachment", "", (error, result)=>{
				if(error){
					alert(error);
				} else {
					this.files[result] = file;
					this.filesDependency.changed();
				}
			});
		};
	},

	render(){
		return (
			<div className="uploader">
				<header className="uploader-header">
				</header>
				<div className="uploader-body">
					<ReactCSSTransitionGroup transitionName="uploader-attachment" 
						transitionEnterTimeout="500" transitionLeaveTimeout="300">
						{this.renderAttachments()}
					</ReactCSSTransitionGroup>
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
