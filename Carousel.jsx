Carousel = React.createClass({
	renderAttachments(){
		if( this.props.attachments.length > 0 ) {
			return this.props.attachments.sort((a,b)=> a.weight > b.weight)
				.map((attachment, index) => {
				return <Attachment
					key={attachment._id}
					attachment={attachment}
					first={index === 0}
					/>;
			});
		} else {
			return <div className="item active empty-message">
				<p>Nothing uploaded yet.</p>
				<p><a href="#" onClick={ this.goToUploader() }>Upload Files.</a></p>
			</div>
		}
	},

	goToUploader(){
		//stub, have to implement a way to change state on parent. with Events?
	},

	render(){
		return (
			<div id="carousel-meteor" className="carousel slide" data-ride="carousel" data-timeout="4000">
				<div className="carousel-inner">
					{ this.renderAttachments() }
				</div>

				<a className="left carousel-control" href="#carousel-meteor" data-slide="prev">
					<span className="glyphicon glyphicon-chevron-left"></span>
				</a>
				<a className="right carousel-control" href="#carousel-meteor" data-slide="next">
					<span className="glyphicon glyphicon-chevron-right"></span>
				</a>
			</div>
		);
	}
});
