import React from "react";
import { graphql, Link } from "gatsby";
import { authorsMap, categoriesMap } from "../assets/blogmaps";
import styled from "styled-components";

const MainContainer = styled.div`
  margin: 0 5vw;
`
const Header = styled.div`
  margin: 20px 0;
  font-family: "URWDIN-Medium", "Helvetica Neue", Arial, Helvetica, sans-serif;
`

const Body = styled.div`
  ul {
    margin-left: 30px;
    list-style: disc;
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <MainContainer>
      <div>
        <Link to={`/${frontmatter.blog}`}>All Posts</Link>
      </div>
      <Header>
        <h2>{frontmatter.title}</h2>
        <h2>{frontmatter.date}</h2>
        {
          frontmatter.categories ? (
          <h2>
            categories:{" "}
            {frontmatter.categories?.map((x) => categoriesMap[x]).join(", ")}
          </h2>
          ) : null
        }
        {
          frontmatter.authors ? (
          <h2>
            authors: {frontmatter.authors?.map((x) => authorsMap[x]).join(", ")}
          </h2>
          ) : null
        }
      </Header>
      <Body dangerouslySetInnerHTML={{ __html: html }} />
    </MainContainer>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        blog
        categories
        authors
      }
    }
  }
`;
