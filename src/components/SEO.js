import React from "react";
import { Helmet } from "react-helmet";

const SITE_URL = "https://c-t-l.org";
const SITE_NAME = "Center for Teaching & Learning";
const LOCATION = "Edgecomb, Maine";
const DEFAULT_DESCRIPTION =
  "Center for Teaching & Learning is a Pre-K–8 independent demonstration school in Edgecomb, Maine, dedicated to joyful, authentic methods of teaching.";
const DEFAULT_IMAGE = `${SITE_URL}/icons/icon-512x512.png`;

const formatTitle = (title, isHomePage) => {
  if (isHomePage) {
    return `${SITE_NAME} — Independent School in ${LOCATION}`;
  }
  if (!title) return `${SITE_NAME} — ${LOCATION}`;
  return `${title} | ${SITE_NAME} — ${LOCATION}`;
};

export const SEO = ({
  title,
  description,
  image,
  pathname = "/",
  isHomePage = false,
}) => {
  const fullTitle = formatTitle(title, isHomePage);
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaImage = image || DEFAULT_IMAGE;
  const canonical = `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;
