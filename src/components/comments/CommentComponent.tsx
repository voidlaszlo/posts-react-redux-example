import Comment from "../../models/comments/comment.model";
import "./css/commentComponent.css";

interface CommentProps {
  comment: Comment;
}

const CommentComponent = ({ comment }: CommentProps) => {
  return (
    <div className="comment">
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
      <div className="comment-footer">
        <p>
          <small>from</small> {comment.email}
        </p>
      </div>
    </div>
  );
};

export default CommentComponent;
