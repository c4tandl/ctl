import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Title = styled.div`
  color: #777777;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 2em;
  width: 100%;
  max-width: 1050px;
  margin-top: 1em;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  a {
    text-decoration: none;
    color: #173957;
  }
`;

const BlogFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogPost = styled.div`
  padding: 1em;
  width: 100%;
  max-width: 1050px;
  img {
    width: 200px;
    height: auto;
    position: relative;
    float: left;
    margin-right: 1em;
    margin-bottom: 1em;
  }
`;

const Post = ({ post }) => (
  <BlogFrame>
    <Title>
      <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
      <div>{post.frontmatter.date}</div>
    </Title>
    <BlogPost dangerouslySetInnerHTML={{ __html: post.html }} />
  </BlogFrame>
);

const BlogList = (props) => {
  const about = props.posts.find((edge) =>
    edge.node.frontmatter.slug.includes("/about/")
  );
  const Posts = props.posts
    .filter(
      (edge) =>
        !!edge.node.frontmatter.date &&
        !edge.node.frontmatter.slug.includes("/about/")
    ) // You can filter your posts based on some criteria
    .map((edge) => <Post key={edge.node.id} post={edge.node} />);
  return (
    <div>
      {about ? <Post post={about.node} /> : null}
      {Posts}
    </div>
  );
};

export default BlogList;
