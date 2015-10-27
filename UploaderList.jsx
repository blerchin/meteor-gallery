ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
UploaderList = React.createClass({
	mixins: Meteor.isClient ? [SortableMixin] : [],

	sortableOptions: {
	},

	componentDidMount(){
		this.setState({items: this.props.attachments});
	},

	handleSort(event, sortable){
		var ids = this.props.attachments.map((a)=> a._id );
		var moved = ids.splice([event.oldIndex], 1)[0];
		ids.splice(event.newIndex, 0, moved);
		Meteor.call("sortAttachments", ids);
	},

	renderAttachments(){
		if( this.props.attachments.length > 0 ) {
			return this.props.attachments.sort((a,b)=> a.weight > b.weight).map((attachment) => {
				return <UploaderAttachment
					key={attachment._id}
					attachment={attachment}
					files={this.props.files}
					filesDependency={this.props.filesDependency}
					/>;
			});
		} else {
			return <div className="item empty-message">
				<p>Nothing uploaded yet.</p>
			</div>
		}
	},

	render(){
		return (
			<ReactCSSTransitionGroup transitionName="uploader-attachment" 
				transitionEnterTimeout="500" transitionLeaveTimeout="300">
				{ this.renderAttachments() }
			</ReactCSSTransitionGroup>
		)
	}
});
