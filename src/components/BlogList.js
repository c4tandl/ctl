import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.slug}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
);

const BlogList = (props) => {
  const Posts = props.posts
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);
  return <div>{Posts}</div>;
};

export default BlogList;
