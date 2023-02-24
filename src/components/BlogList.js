import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import SearchIcon from "../assets/svgs/icons/search.svg";

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
  width: calc(100% - 40px);
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  margin: 1em 0;
`;

const SingleInput = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  input,
  select {
    line-height: 24px;
    font-size: 16px;
  }
`;

const SearchBar = styled.div`
  font-family: "Bookmania-Regular";
  background-color: #00000014;
  display: flex;
  flex-direction: column;
`;

const PageButton = styled.button`
  font-family: "URWDIN-Regular";
  text-transform: uppercase;
  padding-bottom: 0;
  padding-top: 4px;
  /* Make the font narrower */
  transform: scaleX(0.8);
`;

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
            return (
              <BlogImage
                key={Array.from(image).reverse().join()}
                src={image}
              ></BlogImage>
            );
          })
        : null}
      <BlogPost dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </BlogFrame>
);

const FuzzySearchPosts = ({ posts, onFilter }) => {
  const [input, setInput] = useState("");
  const [latestInput, setLatestInput] = useState(null);
  const [genre, setGenre] = useState([]);
  const timeout = useRef(null);
  const isRunned = useRef(false);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;

    /* CODE THAT SHOULD RUN ONCE */
    onFilter(posts);
  }, [onFilter, posts]);

  const handleInputChange = (e) => {
    switch (e.target.id) {
      case "search":
        setInput(e.target.value);
        break;
      case "genre":
        const newGenre = Array.from(e.target.selectedOptions).map(
          (opt) => opt.value
        );
        setGenre(newGenre);
        break;
      default:
        break;
    }
  };

  const filterResults = useCallback(
    (results) => {
      onFilter(results);
    },
    [onFilter]
  );

  const genreOptions = useMemo(() => {
    const opts = posts
      .filter((edge) => edge.node.frontmatter.categories)
      .reduce((acc, edge) => {
        edge.node.frontmatter.categories.forEach((category) => {
          if (!acc.includes(category)) {
            acc.push(category);
          }
        });
        return acc;
      }, []);
    return opts.sort();
  }, [posts]);

  useEffect(() => {
    const filterPosts = (posts) =>
      posts.filter(
        (edge) =>
          (!genre.length ||
            genre.every((gen) =>
              edge.node.frontmatter.categories?.find(
                (cat) => cat.toLowerCase() === gen.toLowerCase()
              )
            )) &&
          // all search input
          (!input.length ||
            edge.node.html.toLowerCase().includes(input.toLowerCase()) ||
            edge.node.frontmatter.title
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            edge.node.frontmatter.authors?.find((author) =>
              author.toLowerCase().includes(input.toLowerCase())
            ) ||
            edge.node.frontmatter.creator
              ?.toLowerCase()
              .includes(input.toLowerCase()))
      );

    if (
      (posts?.length && input !== latestInput) ||
      (posts?.length && JSON.stringify(genre.length))
    ) {
      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        const results = filterPosts(posts);
        filterResults(results);
        setLatestInput(input);
      }, 500);
    }
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };
  }, [input, posts, genre, filterResults, latestInput]);

  return (
    <Row>
      <SingleInput>
        <SearchIcon />
        :&nbsp;
        <input id="search" type="search" onChange={handleInputChange} />
      </SingleInput>
      <SingleInput>
        :&nbsp;
        <select id="genre" multiple={true} onChange={handleInputChange}>
          {genreOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </SingleInput>
      {JSON.stringify(genre)}
    </Row>
  );
};

const BlogList = (props) => {
  const pageSize = 10;
  const about = props.posts.find((edge) =>
    edge.node.frontmatter.slug.includes("/about/")
  );
  const allPosts = useMemo(
    () =>
      props.posts.filter(
        (edge) =>
          !!edge.node.frontmatter.date &&
          !edge.node.frontmatter.slug.includes("/about/")
      ),
    [props.posts]
  );
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const onFilter = (newPosts) => {
    setFilteredPosts(newPosts);
    const updatedPosts = filteredPosts
      .slice(pageNum * pageSize, (pageNum + 1) * pageSize)
      .map((edge) => <Post key={edge.node.id} post={edge.node} />);
    if (
      !displayedPosts
        .map((post) => post.path)
        .every((path) => filteredPosts.map((post) => post.path).includes(path))
    ) {
      setPageNum(0);
    }
    setDisplayedPosts(updatedPosts);
  };

  const changePage = (change) => {
    setPageNum(pageNum + change);
    const newPosts = filteredPosts
      .slice(pageNum * pageSize, (pageNum + 1) * pageSize)
      .map((edge) => <Post key={edge.node.id} post={edge.node} />);
    setDisplayedPosts(newPosts);
  };

  return (
    <div>
      {about ? <AboutTheBlog post={about.node} /> : null}
      <SearchBar>
        <Row>
          <PageButton disabled={pageNum < 1} onClick={() => changePage(-1)}>
            Previous Page
          </PageButton>
          <h2>
            Showing {pageNum * pageSize + 1} -{" "}
            {(pageNum + 1) * pageSize > filteredPosts.length
              ? filteredPosts.length
              : (pageNum + 1) * pageSize}{" "}
            of {filteredPosts.length} results
          </h2>
          <PageButton
            disabled={(pageNum + 1) * pageSize >= filteredPosts.length}
            onClick={() => changePage(1)}
          >
            Next Page
          </PageButton>
        </Row>
        {props.allowSearch ? (
          <FuzzySearchPosts posts={allPosts} onFilter={onFilter} />
        ) : null}
      </SearchBar>
      {displayedPosts}
    </div>
  );
};

export default BlogList;
