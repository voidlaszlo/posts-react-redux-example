import Comment from "../models/Comment";
import "../css/commentComponent.css";

interface CommentComponentProps {
  comment?: Comment;
}

const CommentComponent = ({ comment }: CommentComponentProps) => {
  return (
    <div className="comment">
      <div className="comment-body">
        <p>{comment?.body}</p>
      </div>
      <div className="comment-footer">
        <p>
          <small>from</small> {comment?.email}
        </p>
      </div>
    </div>
  );
};

export default CommentComponent;
