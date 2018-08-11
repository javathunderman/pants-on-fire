var CommentBox = React.createClass({
    getInitialState: function () {
        return {
            comments: null
        };
    },
    componentDidMount: function () {
        var that = this;
        this.socket = io();
        this.socket.on('comments', function (comments) {
            that.setState({ comments: comments });
        });
        this.socket.emit('fetchComments');
    },
    submitComment: function (comment, callback) {
		console.log(comment);
        this.socket.emit('newComment', comment, function (err) {
            if (err)
                return console.error('New comment error:', err);
            callback();
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <CommentForm submitComment={this.submitComment}/>
            </div>
        );
    }
});
var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var that = this;
        rating.innerHTML = "Please wait...";
		var sitename = this.refs.sitename.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        var comment = { text: text, sitename: sitename };
        var submitButton = this.refs.submitButton.getDOMNode();
        this.props.submitComment(comment, function(err) {
            that.refs.text.getDOMNode().value = '';
			that.refs.sitename.getDOMNode().value = '';
        });
    },
    render: function () {
        return (
        <form className="commentForm" onSubmit={this.handleSubmit} id="article">
				<label for="article">My News Of Questionable Origin</label>
					<h5>Article text</h5>
					<textarea name="text" class="u-full-width" placeholder="BUILD THE WALL" id="article" ref="text"></textarea>
					<h5>Web address of source</h5>
					<textarea name="sitename" class="u-full-width" placeholder="nytimes.com" id="sitename" ref="sitename"></textarea>
					<br />
				    <br />
				<button class="button-primary" type="submit" ref="submitButton" id="truth" onclick="move()">Truth Me</button>
			</form>
        );
    }
});
React.render(
    <CommentBox/>,
    document.getElementById('content')
);
