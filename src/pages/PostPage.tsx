import { useParams } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../api/commentsApi";
import { useGetPostByIdQuery } from "../api/postsApi";
import Comment from "../models/Comment";
import CommentCard from "../components/CommentCard";
import ComponentMapper from "../components/helpers/ComponentMapper";
import PostCard from "../components/PostCard";
import Loading from "../components/helpers/Loading";

const PostPage = () => {
  let params = useParams();
  const { data: post, isSuccess: isPostLoaded } = useGetPostByIdQuery(
    params?.id
  );
  const { data: comments, isSuccess: areCommentsLoaded } =
    useGetCommentsByPostIdQuery(post?.id);

  return (
    <>
      {isPostLoaded ? <PostCard post={post} /> : <Loading />}
      <h3 className="section-title">Comments</h3>
      {areCommentsLoaded ? (
        <ComponentMapper
          items={comments}
          elementRenderer={(comment: Comment) => (
            <CommentCard comment={comment} />
          )}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostPage;
