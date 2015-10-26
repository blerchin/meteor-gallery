UploaderAttachment = React.createClass({
	removeAttachment(event){
		Meteor.call("removeAttachment", this.props.attachment._id)
	},

	componentWillMount(){
		//polling here, which is exactly what we're not supposed to have to do
		//with Meteor???
		var times = 0;
		var repeat = setInterval( ()=>{
			this.props.filesDependency.depend();
			if( ! this.props.attachment.originalSrc){
				console.log('ourname', this.props.attachment._id);
				console.log(this.props.files);
				var file = this.props.files[this.props.attachment._id];
				if( file || ++times > 5 ){
					clearInterval(repeat);
					this.uploadAttachment(file);
				} 
			}
		}, 500);
	},

	uploadAttachment(file){
		this.uploader = new Slingshot.Upload("attachmentUploads");
		this.progressComputation = setInterval( ()=> {
			this.setState({progress: this.uploader.progress()});
		}, 300);
		this.uploader.send( file, this.onUploadFinished );
	},

	onUploadFinished(error, attachmentUrl){
		clearInterval(this.progressComputation);
		if (error) {
			alert(error);
		} else {
			Meteor.call("updateAttachment", this.props.attachment._id, attachmentUrl);
		}
	},
	progressBar(){
		if( this.uploader ){
			var progress = Math.round(this.uploader.progress() * 100);
			if(progress === 100){
				return <span className="glyphicon glyphicon-ok"></span>
			}
			var barStyle={
				width: progress + "%"
			}
			return (
				<div className="progress">
					<div className="progress-bar"
						role="progressbar"
						aria-valuenow={progress}
						aria-valuemin="0"
						aria-valuemax="100"
						style={barStyle}
						>
					<span className="sr-only">{progress}% Complete</span>
				</div>
			</div>
			);
		} else {
			return null;
		}
	},
	render(){
		var bodyStyle = {
			backgroundImage: 'url("' + (this.uploader ? this.uploader.url(true) : this.props.attachment.originalSrc) + '")'
		}
		return (
			<div className="item uploader-attachment">
				<header className="uploader-attachment-header">
					<button className="btn btn-danger" onClick={this.removeAttachment}>
						&times;
					</button>
				</header>
				<div className="uploader-attachment-body" style={bodyStyle}>
				</div>
				<footer className="uploader-attachment-footer">
					{this.progressBar()}
				</footer>
			</div>
		)
	}
});
