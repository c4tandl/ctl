const CLOUDINARY_BASE =
  "https://res.cloudinary.com/center-for-teaching-learning/image/upload/";

export default async (request) => {
  const url = new URL(request.url);
  const imagePath = url.pathname.replace("/cloudinary/", "");

  const cloudinaryUrl = new URL(`${CLOUDINARY_BASE}${imagePath}`);
  cloudinaryUrl.search = url.search;

  const cloudinaryResponse = await fetch(cloudinaryUrl.toString(), {
    headers: {
      Referer: "https://c-t-l.org/",
    },
  });

  const headers = new Headers(cloudinaryResponse.headers);
  headers.set(
    "Cache-Control",
    "public, max-age=2592000, stale-while-revalidate=86400"
  );

  return new Response(cloudinaryResponse.body, {
    status: cloudinaryResponse.status,
    headers,
  });
};

export const config = { path: "/cloudinary/*" };
