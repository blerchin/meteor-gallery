UploaderAttachment = React.createClass({
	removeAttachment(event){
		Attachments.remove({_id: this.props.attachment._id});
	},

	componentWillMount(){
		if( ! this.props.attachment.originalSrc){
			var file = this.props.files[this.props.attachment._id];
			file && this.uploadAttachment(file);
		}
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
			Attachments.update(this.props.attachment._id, {
				$set: {
					originalSrc: attachmentUrl
				}
			});
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
