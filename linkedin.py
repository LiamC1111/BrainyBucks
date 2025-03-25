from flask import Flask, render_template_string
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def home():
    url = 'https://mail.google.com/'  # Replace with a valid URL
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        paragraphs = soup.find_all('p')  # Change this to the desired tag
        content = '<br>'.join([paragraph.text for paragraph in paragraphs])
    else:
        content = f"Failed to retrieve data: {response.status_code}"

    return render_template_string('''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Scraped Data</title>
        </head>
        <body>
            <h1>Scraped Data</h1>
            <div id="data-container">
                {{ content|safe }}
            </div>
        </body>
        </html>
    ''', content=content)

if __name__ == '__main__':
    app.run(debug=True)