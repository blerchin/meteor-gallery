MeteorGallery = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState(){
		return {
			mode: 'carousel'
		}
	},

	setMode(newMode){
		this.setState({
			mode: newMode,
		})
	},

	getMeteorData(){
		return {
			attachments: Attachments.find({userId: Meteor.userId()}).fetch(),
			currentUser: Meteor.user()
		};
	},

	getCurrentModule(){
		var mode = this.state.mode;
		if ( ! this.data.currentUser ){
			return <h3>Please sign in to use the uploader.</h3>;
		} else if( mode === "carousel" ){
			return <Carousel attachments={this.data.attachments} />
		} else if ( mode === "upload"){
			return <Uploader attachments={this.data.attachments} currentUser={this.data.currentUser} />
		
		} else {
			return <p>No mode currently selected</p>;
		}
	},
	
	render() {
			return (
				<div className="container meteor-gallery">
					<header>
						<navbar className="navbar navbar-default">
							<div className="container-fluid">
								<div className="navbar-header">
									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#meteor-gallery-navbar">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
									<a className="navbar-brand" href="#">Meteor Uploader</a>
								</div>
								<div className="collapse navbar-collapse" id="meteor-gallery-navbar">
									<ul className="nav navbar-nav">
										<li>
											<AccountsUIWrapper />
										</li>
									</ul>
									<ul className="nav navbar-nav navbar-right">
										<li className={this.state.mode==="carousel" ? "active" : ""}>
											<a href="#" onClick={this.setMode.bind(null,"carousel")}>Carousel</a>
										</li>
										<li className={this.state.mode==="upload" ? "active" : ""}>
											<a href="#" onClick={this.setMode.bind(null,"upload")}>Upload</a>
										</li>
									</ul>
								</div>
							</div>
						</navbar>
					</header>
					<div className="gallery-content container">
						{ this.getCurrentModule() }
					</div>
				</div>
		);
	}
});
