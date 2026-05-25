import React from "react";
import { Helmet } from "react-helmet";

const SITE_URL = "https://c-t-l.org";

const schema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Center for Teaching & Learning",
  alternateName: "CTL",
  description:
    "Center for Teaching & Learning is a Pre-K–8 independent demonstration school in Edgecomb, Maine.",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512x512.png`,
  image: `${SITE_URL}/icons/icon-512x512.png`,
  telephone: "+1-207-882-9706",
  faxNumber: "+1-207-882-6413",
  email: "katy@c-t-l.org",
  address: {
    "@type": "PostalAddress",
    streetAddress: "119 Cross Point Road",
    addressLocality: "Edgecomb",
    addressRegion: "ME",
    postalCode: "04556",
    addressCountry: "US",
  },
  geo: {
    type: "GeoCoordinates",
    latitude: 43.979503,
    longitude: -69.649212,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Lincoln County, Maine" },
    { "@type": "AdministrativeArea", name: "Midcoast Maine" },
  ],
  sameAs: [
    "https://www.facebook.com/CTLKto8",
    "https://www.instagram.com/ctlkto8/",
    "https://www.linkedin.com/school/ctlmekto8",
  ],
};

const SchoolStructuredData = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  </Helmet>
);

export default SchoolStructuredData;
