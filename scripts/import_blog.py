import os
from pyquery import PyQuery as pq
import cloudinary
import wpparser
import cloudinary.uploader
import cloudinary.api

from pprint import pprint

def upload_image(image):
    """
    Upload the image to Cloudinary
    """

    # Upload the image
    cloudinary.uploader.upload(image)
    image.src = cloudinary.utils.cloudinary_url()


def create_markdown_file(title, content, image, tags):
    """
    Create the Markdown file
    """
    # Create new markdown file
    md_file = os.path.join(os.getcwd(), '_posts', '{}.md'.format(title))

    if content and "http://c-t-l.org/wp-content/uploads/" in content:
        doc = pq(content)
        doc('img').each(lambda i, e: upload_image(e.get('src')))
    
    # Create the file
    with open(md_file, 'w') as f:
        # Write the title
        f.write('# {}\n'.format(title))
        # Write the content
        f.write('{}\n'.format(content))
        # Write the tags
        f.write('Tags: {}\n'.format(tags))
        # Write the image
        f.write('![{}]({})\n'.format(image, image))


def main():
    """
    Main function to import blog posts from XML file to Markdown files,
    with images uploaded to Cloudinary
    """
    # Get the XML file
    xml_file = os.path.join(os.getcwd(), 'bookblog.xml')
    # Parse the XML file
    data = wpparser.parse(xml_file)
    posts = data['posts']

    posts = [p for p in posts if p['content'] is not None]
    print(len(posts))

    # Iterate over the posts
    for post in []:
        # Get the title
        title = post.get('title')
        # Get the content
        content = post.get('content')
        # Get the image
        image = post.get('image')
        # Get the tags
        tags = post.get('tags')
        # Create the Markdown file
        create_markdown_file(title, content, image, tags)


if __name__ == "__main__":
    main()
