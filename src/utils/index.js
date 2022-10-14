export const enwrapImgTagsInAnotherDivWithClass = (htmlToEnwrap, className) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlToEnwrap, "text/html");
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    const div = document.createElement("div");
    div.classList.add(className);
    img.parentNode.insertBefore(div, img);
    div.appendChild(img);
  });
  return document.body.innerHTML;
};
