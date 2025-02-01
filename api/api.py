from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os



app = Flask(__name__)
CORS(app, origins=["https://ivy-ll.github.io", "http://localhost:3000"])

def get_rand_dance(file_path):
    if not os.path.exists(file_path):
        return {"error": "File not found"}, 404

    try:
        # Load the CSV file into a pandas DataFrame
        df = pd.read_csv(file_path)

        # Select a random row
        random_dance = df.sample(n=1).to_dict(orient='records')[0]

        return random_dance, 200
    except Exception as e:
        return {"error": str(e)}, 500


# generate random vid from all list of dance vids
@app.route('/api/getRandDanceAll')
def get_dance_all():
    print("Fetching random dance from allDances.csv")

    allDancesPath = './data_scraping/processed_data/allDances.csv'
    rand_song, status_code = get_rand_dance(allDancesPath)

    return jsonify(rand_song), status_code;


# generate random vid from list of girl group dance vids
@app.route('/api/getRandDanceGG')
def get_dance_gg():
    print("Fetching random dance from ggDances.csv")

    ggDancesPath = './data_scraping/processed_data/ggDances.csv'
    rand_song, status_code = get_rand_dance(ggDancesPath)
    return jsonify(rand_song), status_code;


# generate random vid from list of boy group dance vids
@app.route('/api/getRandDanceBG')
def get_dance_bg():
    print("Fetching random dance from bgDances.csv")

    bgDancesPath = './data_scraping/processed_data/bgDances.csv'
    rand_song, status_code = get_rand_dance(bgDancesPath)

    return jsonify(rand_song), status_code;


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)