from flask import Flask, request, jsonify
import requests
from flask_cors import CORS # Import CORS

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Define the correct Ollama API endpoint URL for generation
OLLAMA_URL = "http://localhost:11434/api/generate"

@app.route('/')
def hello_world():
    """A simple route to confirm the server is running."""
    return 'Hello, your Flask server is running!'

@app.route("/predict", methods=["POST"])
def predict():
    """
    This route receives text from a user, sends it to the Ollama API
    with the 'tinyllama' model, and returns a short auto-completion suggestion.
    """
    try:
        input_text = request.json.get("text", "")

        if not input_text:
            return jsonify({"error": "Input text cannot be empty."}), 400

        data = {
            "model": "tinyllama",
            "prompt": input_text,
            "stream": False,
            "options": {
                "num_predict": 10
            }
        }

        response = requests.post(OLLAMA_URL, json=data)
        response.raise_for_status()

        result = response.json()
        suggestion = result.get("response", "No suggestion found.").strip()

        return jsonify({"suggestion": suggestion})

    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Ollama API: {e}")
        return jsonify({"error": "Failed to connect to the Ollama API. Is Ollama running?"}), 502
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
