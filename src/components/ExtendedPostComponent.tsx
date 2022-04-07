import { useParams } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../api/commentsApi";
import { useGetPostByIdQuery } from "../api/postsApi";
import Comment from "../models/Comment";
import CommentComponent from "./CommentComponent";
import ComponentMapper from "./ComponentMapper";
import PostComponent from "./PostComponent";

const ExtendedPostComponent = () => {
  let params = useParams();
  const { data: post, isSuccess: isPostLoaded } = useGetPostByIdQuery(
    params?.id
  );
  const { data: comments, isSuccess: areCommentsLoaded } =
    useGetCommentsByPostIdQuery(post?.id);

  return (
    <>
      {isPostLoaded ? <PostComponent post={post} /> : <div>loading...</div>}
      <h3 className="section-title">Comments</h3>
      {areCommentsLoaded ? (
        <ComponentMapper
          items={comments}
          element={(comment: Comment) => <CommentComponent comment={comment} />}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ExtendedPostComponent;
