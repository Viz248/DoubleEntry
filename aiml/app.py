# app.py
from flask import Flask, jsonify
import joblib
import pandas as pd

# Part 1: Set up the Flask App and Load the Models
app = Flask(__name__)

CATEGORIES = ['food', 'shopping', 'transportation', 'bills']
models = {}

print("Loading models... please wait.")
for category in CATEGORIES:
    try:
        file_path = f"sarima_{category}_model.pkl"
        models[category] = joblib.load(file_path)
        print(f"-> Successfully loaded model for '{category}'.")
    except FileNotFoundError:
        print(f"-> WARNING: Model file not found for '{category}'. Requests for it will fail.")
print("✅ All models loaded.")


# Part 2: Define the API Endpoint
@app.route("/predict/<string:category_name>", methods=['GET'])
def predict_category(category_name):
    category_key = category_name.lower()
    
    if category_key not in models:
        return jsonify({"error": f"No model available for category: {category_name}"}), 404
        
    model = models[category_key]
    
    last_known_date = pd.to_datetime('2025-09-24')
    forecast = model.get_prediction(start=last_known_date + pd.DateOffset(months=1), 
                                    end=last_known_date + pd.DateOffset(months=3))
    
    predicted_values = forecast.predicted_mean
    
    response = {
        "category": category_name,
        "predictions": [
            {"month": date.strftime('%Y-%m'), "predicted_amount": round(amount, 2)}
            for date, amount in predicted_values.items()
        ]
    }
    
    return jsonify(response)


# Part 3: Run the Server
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")