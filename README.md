# DoubleEntry – Hackbattle 2025

**DoubleEntry** is a smart personal finance application developed for Hackbattle 2025. The app helps users understand and manage their finances through intuitive storytelling, predictive insights, and privacy-conscious visualizations. Instead of just showing raw numbers, it transforms financial activities into dynamic narratives that make tracking income, expenses, and trends engaging and actionable.

## Features

1. **Interactive Financial Timeline**
   - Displays income and expenses as a scrollable, interactive timeline.
   - Highlights key financial events in a narrative format.
   - Example: “You spent your first salary on groceries.” / “You started saving more in July.”

2. **Predictive Insights**
   - Projects future financial outcomes based on current spending and saving habits.
   - Provides actionable guidance to stay within budget or achieve financial goals.
   - Example: “If current spending continues, your savings in six months will be ₹X.”

3. **Smart Alerts & Recommendations**
   - Detects overspending in specific categories (e.g., food, entertainment).
   - Suggests ways to save or adjust spending to stay on track.

4. **Privacy-Focused Visualization**
   - Emphasizes trends and patterns instead of exact amounts.
   - Example: “Food represents 25% of your monthly expenditure, trending upward.”

## Tech Stack

- **Frontend:** React / Flutter (animated story interface)
- **Backend:** FastAPI (transaction processing, predictive logic, API endpoints)
- **Database:** SQLite (local storage of user transactions)
- **Authentication / User Management:** Firebase Authentication (email OTP, Google sign-in)
- **Data Handling & Storage:** Firebase Firestore (optional cloud sync for user data)
- **Server / Deployment:** Uvicorn (ASGI server for FastAPI)
- **Other Tools / Libraries:** SQLModel (ORM for SQLite), Pydantic (data validation), Python dotenv (environment variables)

## Getting Started

1. Clone the repo:
```bash
git clone https://github.com/Viz248/DoubleEntry.git
cd DoubleEntry
```

2. Create and activate a virtual environment:
```bash
python -m venv env
env\Scripts\activate  # Windows
# source env/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn backend.main:app --reload
```

5. Open the frontend in your preferred framework (React/Flutter) to see the interface.

## Contributing

- Fork the repository
- Create a new branch for your feature or bugfix
- Submit a pull request with a clear description

