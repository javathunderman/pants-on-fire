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
/* var CommentList = React.createClass({
    render: function () {
        var Comments = (<div>Loading messages...</div>);
        if (this.props.comments) {
            Comments = this.props.comments.map(function (comment) {
                return (<Comment comment={comment} />);
            });
        }
        return (
            <div className="commentList">
				{Comments}
            </div>
        );
    }
}); */
// var Comment = React.createClass({
//     render: function () {
//         return (
//             <div className="comment">
//                 <span className="author">{this.props.comment.author}</span><br/>
//                 <div className="body">{this.props.comment.text}</div>
//             </div>
//         );
//     }
// });
var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var that = this;

        var text = this.refs.text.getDOMNode().value.trim();
        var comment = { text: text };
        var submitButton = this.refs.submitButton.getDOMNode();
        //submitButton.innerHTML = 'Posting comment...';
        //submitButton.setAttribute('disabled', 'disabled');
        this.props.submitComment(comment, function(err) {
            that.refs.text.getDOMNode().value = '';
            submitButton.innerHTML = 'Post';
            //submitButton.removeAttribute('disabled');
        });
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>

                <textarea name="text" ref="text" placeholder="Message" required></textarea><br/>
                <button type="submit" ref="submitButton">Post</button>

            </form>
        );
    }
});

React.render(
    <CommentBox/>,
    document.getElementById('content')
);
