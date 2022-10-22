import React, { useState, useEffect } from "react";
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
  padding: 0 1em;
  width: 100%;
  max-width: 1050px;
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-family: "Bookmania-Regular";
    font-size: 20pt;
    margin: 1em 0;
  }
  div {
    width: 90%;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
`;
const PageButton = styled.button``;

const BlogImage = styled.img`
  width: 200px;
  height: auto;
  position: relative;
  float: left;
  margin: 1em;
`;

const AboutTheBlog = ({ post }) => (
  <AboutSection>
    <h1>{post.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
  </AboutSection>
);

const Post = ({ post }) => (
  <BlogFrame>
    <Title>
      <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
      <div>{post.frontmatter.date}</div>
    </Title>
    <div>
      {post.frontmatter.images?.length
        ? post.frontmatter.images.map((image) => {
            return <BlogImage src={image}></BlogImage>;
          })
        : null}
      <BlogPost dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </BlogFrame>
);

const SearchPosts = ({ posts, onFilter }) => {
  const [input, setInput] = useState("");
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const performSearch = (posts, input) => {
    return posts.filter(
      (edge) =>
        edge.node.html.toLowerCase().includes(input.toLowerCase()) ||
        edge.node.frontmatter.title
          .toLowerCase()
          .includes(input.toLowerCase()) ||
        edge.node.frontmatter.authors?.find((author) =>
          author.toLowerCase().includes(input.toLowerCase())
        ) ||
        edge.node.frontmatter.creator
          ?.toLowerCase()
          .includes(input.toLowerCase())
    );
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const results = performSearch(posts, input);
      onFilter(results);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [input, onFilter, posts]);

  return (
    <Row>
      <span>
        Search: <input type="text" onChange={handleInputChange} />
      </span>
    </Row>
  );
};

const BlogList = (props) => {
  const pageSize = 10;
  const about = props.posts.find((edge) =>
    edge.node.frontmatter.slug.includes("/about/")
  );
  const allPosts = props.posts.filter(
    (edge) =>
      !!edge.node.frontmatter.date &&
      !edge.node.frontmatter.slug.includes("/about/")
  );
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const onFilter = (newPosts) => {
    console.log("onFilter");
    setFilteredPosts(newPosts);
  };

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    const newPosts = filteredPosts
      .slice(pageNum * pageSize, (pageNum + 1) * pageSize)
      .map((edge) => <Post key={edge.node.id} post={edge.node} />);
    setPosts(newPosts);
  }, [pageNum, filteredPosts]);

  return (
    <div>
      {about ? <AboutTheBlog post={about.node} /> : null}
      <Row>
        <PageButton
          disabled={pageNum < 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous Page
        </PageButton>
        <h2>
          Showing {pageNum * pageSize + 1} - {(pageNum + 1) * pageSize} of{" "}
          {allPosts.length} results
        </h2>
        <PageButton
          disabled={(pageNum + 1) * pageSize >= allPosts.length}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next Page
        </PageButton>
      </Row>
      <SearchPosts posts={allPosts} onFilter={onFilter}></SearchPosts>
      {posts}
    </div>
  );
};

export default BlogList;
