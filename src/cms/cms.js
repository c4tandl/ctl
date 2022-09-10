import CMS, { init } from "netlify-cms-app";
import cloudinary from "netlify-cms-media-library-cloudinary";
// This global flag enables manual initialization.
window.CMS_MANUAL_INIT = true;
/**
 * Optionally pass in a complete config object and set a flag
 *  (`load_config_file: false`) to ignore the `config.yml`.
 *
 * For example, the code below contains a complete config. The
 * `config.yml` will be ignored when setting `load_config_file` to false.
 * It is not required if the `config.yml` file is missing to set
 * `load_config_file`, but will improve performance and avoid a load error.
 */

init({
  config: {
    backend: {
      name: "github",
      repo: "c4tandl/ctl",
      branch: "main",
    },
    load_config_file: false,
    media_library: {
      name: "cloudinary",
      config: {
        cloud_name: "center-for-teaching-learning",
        api_key: process.env.GATSBY_CLOUDINARY_API_KEY,
      },
    },
    collections: [
      {
        name: "Home",
        label: "Home",
        folder: "src/markdown/pages/home",
        create: false,
        fields: [
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "object",
            type: "carousel",
            name: "carousel",
            summary: {
              "[object Object]": null,
            },
            fields: [
              {
                label: "Images",
                name: "images",
                widget: "list",
                field: {
                  label: "Image",
                  name: "image",
                  widget: "image",
                },
              },
            ],
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "About",
        label: "About",
        folder: "src/markdown/pages/about",
        create: false,
        fields: [
          {
            name: "path",
            widget: "hidden",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "object",
            type: "carousel",
            name: "carousel",
            summary: {
              "[object Object]": null,
            },
            fields: [
              {
                label: "Images",
                name: "images",
                widget: "list",
                field: {
                  label: "Image",
                  name: "image",
                  widget: "image",
                },
              },
            ],
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Admissions",
        label: "Admissions",
        folder: "src/markdown/pages/admissions",
        create: false,
        fields: [
          {
            name: "path",
            widget: "hidden",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "object",
            type: "carousel",
            name: "carousel",
            summary: {
              "[object Object]": null,
            },
            fields: [
              {
                label: "Images",
                name: "images",
                widget: "list",
                field: {
                  label: "Image",
                  name: "image",
                  widget: "image",
                },
              },
            ],
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "How we Teach & Learn",
        label: "How we Teach & Learn",
        folder: "src/markdown/pages/how-we-teach-and-learn",
        create: false,
        fields: [
          {
            name: "path",
            widget: "hidden",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "object",
            type: "carousel",
            name: "carousel",
            summary: {
              "[object Object]": null,
            },
            fields: [
              {
                label: "Images",
                name: "images",
                widget: "list",
                field: {
                  label: "Image",
                  name: "image",
                  widget: "image",
                },
              },
            ],
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Reading Resources",
        label: "Reading Resources",
        folder: "src/markdown/pages/reading-resources",
        create: false,
        fields: [
          {
            name: "path",
            widget: "hidden",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Internships",
        label: "Internships",
        folder: "src/markdown/pages/internships",
        create: false,
        fields: [
          {
            name: "path",
            widget: "hidden",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Donate",
        label: "Donate",
        folder: "src/markdown/pages/donate",
        create: false,
        fields: [
          {
            name: "path",
            widget: "hidden",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Contact",
        label: "Contact",
        folder: "src/markdown/pages/contact",
        create: false,
        fields: [
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Head of School Blog",
        label: "Head of School Blog",
        folder: "src/markdown/blogs/head-of-school-blog",
        create: true,
        fields: [
          {
            name: "slug",
            label: "Slug",
            comment:
              "Prefix with `/head-of-school-blog/` necessary for proper routing",
            default: "/head-of-school-blog/new-post",
          },
          {
            name: "blog",
            type: "hidden",
            default: "head-of-school-blog",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "Book Blog",
        label: "Book Blog",
        folder: "src/markdown/blogs/middle-school-book-blog",
        create: true,
        fields: [
          {
            name: "slug",
            label: "Slug",
            comment:
              "Prefix with `/middle-school-book-blog/` necessary for proper routing",
            default: "/middle-school-book-blog/",
          },
          {
            name: "blog",
            type: "hidden",
            default: "middle-school-book-blog",
          },
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            name: "categories",
            label: "Categories",
            widget: "list",
          },
          {
            name: "authors",
            label: "Authors",
            widget: "list",
          },
          {
            name: "comments",
            label: "Comments",
            widget: "list",
          },
          {
            name: "images",
            label: "Images",
            widget: "list",
            field: {
              label: "Image",
              name: "image",
              widget: "image",
            },
          },
          {
            name: "creator",
            label: "Creator",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
      {
        name: "About Book Blog",
        label: "About Book Blog",
        folder: "src/markdown/blogs/middle-school-book-blog/about",
        create: true,
        fields: [
          {
            name: "date",
            label: "Date",
            widget: "datetime",
          },
          {
            name: "title",
            label: "Title",
          },
          {
            widget: "markdown",
            label: "Body",
            name: "body",
            editor_components: ["image"],
          },
        ],
      },
    ],
  },
});

CMS.registerMediaLibrary(cloudinary);
