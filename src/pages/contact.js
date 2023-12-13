import React, { useRef } from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";
import Body from "../components/Body";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Updated = styled.div`
  position: fixed;
  bottom: 0;
  left: 1em;
  margin: 5px;
  cursor: default;
  color: grey;
`;

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyHolder = styled.div`
  background-color: #fff;
  z-index: 0;
  width: 900px;
  padding: 0 20px;
  margin-top: 250px;
  transition: 0.3s;
  h1 {
    font-size: 25pt;
  }
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  @media only screen and (max-width: 1111px) {
    margin-top: 0;
    width: auto;
    padding: 2rem;
    img {
      max-width: 70vw;
    }
  }
`;

const Form = styled.div`
  form {
    width: 100%;
    p {
      width: 100%;
      &.double {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
      }
      &.triple {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1rem;
      }
      &.submit {
        width: 100%;
        display: flex;
        div.success-message {
          color: green;
          position: absolute;
        }
        button {
          width: 120px;
          height: 2rem;
          padding: 0 1rem;
          margin: 0 auto;
          margin-bottom: 8px;
          border-radius: 3px;
          border: 1px solid #234;
          background-color: #def;
          &:hover {
            background-color: #fed;
          }
          cursor: pointer;
        }
      }
      label {
        line-height: 2rem;
        span.required {
          color: red;
        }
      }
      input {
        height: 2rem;
      }
      input,
      textarea {
        width: calc(100% - 6px);
        border: 1px solid #234;
        border-radius: 3px;
        line-height: 2rem;
        font-size: 1rem;
        font-family: inherit;
      }
      textarea {
        height: 10rem;
      }
    }
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const {
    title,
    date,
    carousel: { images },
  } = frontmatter;
  const messageRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        displaySuccessMessage();
        form.reset();
      })
      .catch((error) => alert(error));
  };

  const displaySuccessMessage = () => {
    if (messageRef.current) {
      messageRef.current.innerText = "Form Submitted!";
    }
    setTimeout(() => {
      messageRef.current.innerText = "";
    }, 5000);
  };

  return (
    <Page>
      <Helmet>
        <title>CTL{title}</title>
      </Helmet>
      <Carousel images={images}></Carousel>
      <FullPage>
        <BodyHolder>
          <Body body={html} />
          <Form id="inquiry-form">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              name="contact"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p class="double">
                <label for="first-name">
                  First Name{" "}
                  <input
                    id="first-name"
                    type="text"
                    name="first-name"
                    title="First Name"
                  />
                </label>
                <label for="last-name">
                  Last Name{" "}
                  <input
                    id="last-name"
                    type="text"
                    name="last-name"
                    title="Last Name"
                  />
                </label>
              </p>
              <p class="double">
                <label for="email">
                  <span title="Email required">Email</span>
                  <span class="required"> *</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    title="Email"
                  />
                </label>
                <label for="phone">
                  <span title="Phone number">Phone Number</span>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    title="Phone number"
                  />
                </label>
              </p>
              <p>
                <label for="address">
                  Mailing Address{" "}
                  <input
                    id="address"
                    type="text"
                    name="address"
                    title="Mailing address"
                  />
                </label>
              </p>
              <p class="triple">
                <label for="city">
                  City
                  <input id="city" type="text" name="city" title="City" />
                </label>
                <label for="state">
                  State
                  <input
                    id="state"
                    type="text"
                    pattern="[A-Z]{2}"
                    name="state"
                    title="Two letter state code"
                  />
                </label>
                <label for="zip">
                  Zip{" "}
                  <input
                    id="zip"
                    type="text"
                    pattern="[0-9]{5}"
                    title="Five digit zip code"
                  />
                </label>
              </p>
              <p>
                <label for="message">
                  Message{" "}
                  <textarea id="message" name="message" title="Message" />
                </label>
              </p>
              <p class="submit">
                <button title="Submit inquiry" type="submit">
                  Send
                </button>
                <div class="success-message" ref={messageRef}></div>
              </p>
            </form>
          </Form>
        </BodyHolder>
      </FullPage>
      <Updated title={`Last updated - ${date}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { contactpage: { eq: true } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        carousel {
          images
        }
      }
    }
  }
`;
