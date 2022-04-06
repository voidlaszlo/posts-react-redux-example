import React from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../../../app/api/comments/commentsApi";
import { useGetPostByIdQuery } from "../../../app/api/posts/postsApi";
import Post from "../../../models/posts/post.model";
import CommentComponent from "../../comments/CommentComponent";
import PostComponent from "../postComponent/PostComponent";

const ExtendedPostComponent = () => {
  let params = useParams();
  const { data: post, isSuccess: isPostLoaded } = useGetPostByIdQuery(
    params.id as string
  );
  const { data: comments, isSuccess: areCommentsLoaded } =
    useGetCommentsByPostIdQuery(post ? post.id : -1);

  return (
    <>
      {isPostLoaded ? (
        <PostComponent>{post ? post : ({} as Post)}</PostComponent>
      ) : (
        <div>loading...</div>
      )}
      <h3 className="section-title">Comments</h3>
      {areCommentsLoaded ? (
        comments?.map((comment) => (
          <React.Fragment key={comment.id}>
            <CommentComponent comment={comment} />
          </React.Fragment>
        ))
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default ExtendedPostComponent;