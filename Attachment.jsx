Attachment = React.createClass({
	render(){
		return (
			<div className={'item ' + (this.props.first ? 'active' : "") }>
				<img src={ this.props.attachment.originalSrc } />
			</div>
		);
	}
});
