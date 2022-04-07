import "../css/commentComponent.css";
import Comment from "../models/Comment";

interface Props {
  comment?: Comment;
}

const CommentCard = ({ comment }: Props) => {
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

export default CommentCard;
