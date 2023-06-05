import os
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
from transformers import AutoModelForCausalLM, AutoTokenizer
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
chat_history = []


@app.route("/")
@cross_origin()
def hello_world():
    return "Hello, World! From BayMax"


@app.route("/v1", methods=['POST'])
@cross_origin()
def runModelV1():
    return jsonify({'baymax': 'This API is deprecated, please use v2 or v3'})


@app.route("/v3", methods=["POST"])
@cross_origin()
def runModelForChat():
    global chat_history
    req = request.get_json()
    input = req['input']
    response = {}
    new_user_input_ids = tokenizer.encode(input + tokenizer.eos_token, return_tensors='pt')
    bot_input_ids = torch.cat([chat_history, new_user_input_ids], dim=-1) if len(chat_history) > 0 else new_user_input_ids
    response_ids = model.generate(
        bot_input_ids,
        max_length=200,
        pad_token_id=tokenizer.eos_token_id,
        no_repeat_ngram_size=3,
        do_sample=True,
        top_k=100,
        top_p=0.7,
        temperature=0.8
    )
    response = tokenizer.decode(response_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
    return jsonify({"baymax": response})


@app.route("/v2", methods=['POST'])
@cross_origin()
def runModel():
    req = request.get_json()
    seeker_post = req['seeker']
    response_post = req['response']
    post = seeker_post + '<SPLIT>' + response_post
    response = {}
    new_user_input_ids = tokenizer.encode(post + tokenizer.eos_token, return_tensors='pt')
    bot_input_ids = torch.cat([chat_history, new_user_input_ids], dim=-1) if len(chat_history) > 0 else new_user_input_ids
    response_ids = model.generate(
        bot_input_ids,
        max_length=200,
        pad_token_id=tokenizer.eos_token_id,
        no_repeat_ngram_size=3,
        do_sample=True,
        top_k=100,
        top_p=0.7,
        temperature=0.8
    )
    response = tokenizer.decode(response_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
    return jsonify({"baymax": response})


if __name__ == "__main__":
    model = AutoModelForCausalLM.from_pretrained("Yogeshvars/BayMaxChat")
    tokenizer = AutoTokenizer.from_pretrained("Yogeshvars/BayMaxChat")
    app.run(debug=True, host="0.0.0.0", port=9000)
    
