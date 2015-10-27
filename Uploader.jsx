ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
Uploader = React.createClass({

	sortableOptions: {
		draggable: '.upload-attachment'
	},

	files: {},
	filesDependency: new Tracker.Dependency,


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
					<UploaderList 
						attachments={this.props.attachments}
						files={this.files}
						filesDependency={this.filesDependency} />
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
