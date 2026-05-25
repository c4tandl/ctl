import React from "react";
import { Helmet } from "react-helmet";

export const SEO = ({ title, description, image, pathname }) => {
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{title}</title>
      <meta name={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`https://c-t-l.org/${pathname}`} />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:card"
        content="Center for Teaching & Learning - Edgecomb, ME"
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" />
    </Helmet>
  );
};
