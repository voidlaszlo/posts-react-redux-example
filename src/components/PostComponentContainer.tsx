import "../css/postComponent.css";
import Post from "../models/Post";
import ComponentMapper from "./ComponentMapper";
import PostComponent from "./PostComponent";

interface Props {
  posts: Post[];
}

const PostComponentContainer = ({ posts }: Props) => {
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
