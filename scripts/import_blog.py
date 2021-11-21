import os
from os.path import join, dirname
import requests
from datetime import datetime
from dotenv import load_dotenv
from pyquery import PyQuery as pq
import cloudinary
import wpparser
import cloudinary.uploader
import cloudinary.api

from pprint import pprint


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

cloud = cloudinary
cloud.config(
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME'),
    api_key = os.environ.get('CLOUDINARY_API_KEY'),
    api_secret = os.environ.get('CLOUDINARY_API_SECRET'),
    secure = True
)

def upload_image(cloud, image):
    """
    Upload the image to Cloudinary
    """
    # Download the image
    image_url = image.get('src')
    filename = image_url.split("/")[-1]
    r = requests.get(image_url, stream = True)
    r.raw.decode_content = True
    with open(filename, 'wb') as file:
        for chunk in r.iter_content(chunk_size = 1024):
            if chunk:
                file.write(chunk)
    # Upload the image
    response = cloud.uploader.upload(filename, public_id = filename)
    pq(image).attr('src', response.get('secure_url'))
    # Delete the file
    os.remove(filename)


def create_markdown_file(cloud, post):
    """
    Create the Markdown file
    """
    # Create /_posts directory if it doesn't exist
    if not os.path.exists('_posts'):
        os.makedirs('_posts')
    # Create new markdown file
    md_file = join(os.getcwd(), '_posts', f'{post["slug"]}.md')

    # pq is pyquery (jquery like html parsing)
    if post["content"]and "http://c-t-l.org/wp-content/uploads/" in post["content"]:
        doc = pq(post["content"])
        # doc('img').each(lambda i, e: upload_image(cloud, e))
        for image in doc('img'):
            upload_image(cloud, image)
        post["content"] = doc.html()
    
    # Create the file like:
    # ---
    # slug: /middle-school-book-blog/is-this-about-something
    # date: 2021-09-25T14:20:29.338Z
    # title: Is this about something?
    # blog: middle-school-book-blog
    # ---
    with open(md_file, 'w') as file:
        file.write(f'---\n')
        file.write(f'slug: /middle-school-book-blog/{post["slug"]}\n')
        # Write the title
        file.write(f'date: {post["date"]}\n')
        file.write(f'title: {post["title"]}\n')
        file.write(f'blog: middle-school-book-blog\n')
        file.write(f'---\n\n')
        # Write the content
        file.write(f'{post["content"]}\n')


def main():
    """
    Main function to import blog posts from XML file to Markdown files,
    with images uploaded to Cloudinary
    """
    # Get the XML file
    xml_file = join(os.getcwd(), 'bookblog.xml')
    # Parse the XML file
    data = wpparser.parse(xml_file)
    posts = data['posts']

    posts = [p for p in posts if p['post_type'] == 'post' and p['content'] is not None and p['title'] is not None]

    # Iterate over the posts
    for post in posts[:5]:
        normalized_post = {
            'title': post.get('title'),
            'content': post.get('content'),
            'categories': post.get('categories'),
            'comments': post.get('comments'),
            'creator': post.get('creator'),
            'slug': post.get('post_name'),
            'date': datetime.strptime(post.get('post_date'), '%Y-%m-%d %H:%M:%S').isoformat() + 'Z',
            'tags': post.get('tags')
        }
        # Create the Markdown file
        create_markdown_file(cloud, normalized_post)



if __name__ == "__main__":
    main()
