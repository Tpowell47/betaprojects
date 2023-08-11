from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chatbot", methods=["POST"])
def chatbot():
    request_data = request.get_json()
    message = request_data["message"]
    response = get_bot_response(message)
    return jsonify({"response": response})

def get_bot_response(message):
    # Logic for generating bot response based on the user message
    # Replace this with your desired bot response generation logic
    return "Bot response: " + message

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080)
