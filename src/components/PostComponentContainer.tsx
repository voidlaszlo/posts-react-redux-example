import Post from "../models/Post";
import "../css/postComponent.css";
import PostComponent from "./PostComponent";
import React from "react";
import ComponentMapper from "./ComponentMapper";

interface PostComponentContainerProps {
  posts: Post[];
}

const PostComponentContainer = ({ posts }: PostComponentContainerProps) => {
  return (
    <div className="post-container">
      <h3 className="section-title">Posts</h3>
      <ComponentMapper
        items={posts}
        element={(post: Post) => <PostComponent post={post} />}
      />
    </div>
  );
};

export default PostComponentContainer;
