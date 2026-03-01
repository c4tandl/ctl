const CLOUDINARY_BASE =
  "https://res.cloudinary.com/center-for-teaching-learning/image/upload/";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const proxyCloudinaryUrl = (url) => {
  if (!IS_PRODUCTION || !url) return url;
  if (url.includes(CLOUDINARY_BASE)) {
    return url.replace(CLOUDINARY_BASE, "/cloudinary/");
  }
  return url;
};

export const proxyCloudinaryHtml = (html) => {
  if (!IS_PRODUCTION || !html) return html;
  return html.replaceAll(CLOUDINARY_BASE, "/cloudinary/");
};

export const optimizeCloudinaryImageUrl = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  const transformed = url.replace("/image/upload/", "/image/upload/t_body_images/");
  return proxyCloudinaryUrl(transformed);
};

export const optimizeCloudinaryBodyHtml = (html) => {
  if (!html) return html;
  const transformed = html.replaceAll(
    CLOUDINARY_BASE,
    `${CLOUDINARY_BASE}t_body_images/`
  );
  return proxyCloudinaryHtml(transformed);
};
