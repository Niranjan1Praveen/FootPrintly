from flask import Flask, request, jsonify
from flask_cors import CORS 
import random

app = Flask(__name__)

CORS(app)  # This allows cross-origin requests from the frontend

# Function to get score based on selected option
def get_score(selected_option):
    scores = {
        'Walk / Cycle': 10,
        'Public Transport (Bus/Train/Metro)': 7,
        'Car (Alone)': 3,
        'Frequent Flights (Domestic/International)': 1,
        'Meat-heavy diet (Beef, Lamb, Pork, etc.)': 3,
        'Chicken/Fish-based diet': 5,
        'Vegetarian (Dairy + Veggies)': 7,
        'Vegan (Only plant-based foods)': 10,
        '100% Renewable Energy (Solar, Wind, etc.)': 10,
        'Mixed (Grid electricity + some renewables)': 7,
        'Mostly Fossil Fuels (Coal, Oil, Gas, etc.)': 3,
        'Diesel Generator/Unstable Power Source': 1,
        'Rarely, I reuse or buy second-hand': 10,
        'Once a month': 7,
        'Every week (Fast fashion buyer)': 3,
        'I buy new clothes frequently': 1,
        'Recycle & Compost everything': 10,
        'Recycle sometimes, but still produce waste': 7,
        'Throw everything in one bin (No recycling)': 3,
        'I don’t track my waste at all': 1
    }
    
    return scores.get(selected_option, None)  # Return None if option is not found

# Function to assign sustainability level
def assign_level(score):
    if score >= 41:
        return "Eco Warrior"
    elif score >= 26:
        return "Eco Learner"
    elif score >= 16:
        return "Green Explorer"
    else:
        return "Beginner"

# Function to assign random challenge based on score level
def assign_challenge(level):
    challenges = {
        "Eco Warrior": [
            "Host a Zero-Waste Day",
            "Teach a Friend about sustainability",
            "Zero Plastic Challenge - Avoid plastic for 3 days",
            "Sustainable Fashion Challenge - Swap or donate clothes",
            "Eco-Investor - Support a sustainable brand",
            "Local Farmers Market Visit",
            "Social Media Awareness Post"
        ],
        "Eco Learner": [
            "Meat-Free Monday",
            "Public Transport Challenge",
            "Shorter Showers - Reduce time to under 5 minutes",
            "Recycling Boost - Collect & recycle 5 items",
            "Minimal Electricity Day - Reduce power consumption",
            "Car-Free Day",
            "Reusable Challenge - Only use reusable items today"
        ],
        "Green Explorer": [
            "Carry a Reusable Bottle",
            "Skip the Straw",
            "Ditch Fast Fashion for a Day",
            "Minimal Food Waste - Eat all meals without waste",
            "Turn Off Devices when not in use",
            "Walk Instead of Drive",
            "Plant a Small Greenery"
        ],
        "Beginner": [
            "Refill Instead of Buying a new bottle",
            "Try Public Transport Once",
            "One Meat-Free Meal",
            "Turn Off a Light",
            "Say No to Plastic Bags",
            "Recycle 1 Item Today",
            "Bring Your Own Mug"
        ]
    }

    return random.choice(challenges[level])  # Return a random challenge

# Route to get score based on selected option
@app.route('/get_score', methods=['POST'])
def get_score_for_option():
    data = request.get_json()  # Receive JSON from frontend
    selected_option = data.get('selected_option')
    
    if not selected_option:
        return jsonify({'error': 'No option selected'}), 400
    
    score = get_score(selected_option)  # Get score for the selected option
    
    if score is None:
        return jsonify({'error': 'Invalid option selected'}), 400
    
    return jsonify({'score': score})

# Route to get sustainability level based on total score
@app.route('/assign_level', methods=['POST'])
def get_sustainability_level():
    data = request.get_json()
    total_score = data.get('total_score')  # Expecting total score from request body
    
    if total_score is None or not isinstance(total_score, (int, float)):
        return jsonify({'error': 'Invalid score provided'}), 400
    
    level = assign_level(total_score)  # Assign sustainability level
    
    return jsonify({'level': level})

# Route to get a random challenge based on user level
@app.route('/assign_challenge', methods=['POST'])
def get_challenge():
    data = request.get_json()
    total_score = data.get('total_score')  # Expecting total score
    
    if total_score is None or not isinstance(total_score, (int, float)):
        return jsonify({'error': 'Invalid score provided'}), 400
    
    level = assign_level(total_score)  # Determine level
    challenge = assign_challenge(level)  # Get random challenge
    
    return jsonify({'level': level, 'challenge': challenge})

# Running the app
if __name__ == '__main__':
    app.run(debug=True)
