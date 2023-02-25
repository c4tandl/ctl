import os
import json
import wpparser
from os.path import join

def make_maps():
    # Get the XML file
    xml_file = join(os.getcwd(), 'bookblog.xml')
    xml_dict = wpparser.parse(xml_file)

    category_dict = {}
    author_dict = {}

    for category in xml_dict['categories']:
        category_dict[category['nicename']] = category['name']


    for author in xml_dict['tags']:
        author_dict[author['slug']] = author["name"]

    json_cats = json.dumps(category_dict,sort_keys=False, indent=4)
    json_auts = json.dumps(author_dict,sort_keys=False, indent=4)
    print(json_cats)
    print(",")
    print(json_auts)

if __name__ == "__main__":
    make_maps()
