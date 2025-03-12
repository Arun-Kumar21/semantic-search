# Semantic Search✨

> **Warning**: This project is currently under development. ⚠️

A **Semantic Search System** built with **React**, **Flask**, and **Hugging Face Transformers**, leveraging **FAISS** for efficient indexing.

---

## Project Video

https://github.com/user-attachments/assets/de61a8ed-4ced-4e52-938f-38c54e0872b0

## Known Issues

Currently, the LLM responses are not accurately generated for queries. As demonstrated in the video, the responses for the first two questions are off-topic, while only the response for "Supervised learning" is correct. Efforts are ongoing to improve the response accuracy. If you have any suggestions, please feel free to share them.

## 🛠️ Installation Steps

Follow these steps to get started with the Vector embedding based search Project:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for the React frontend)
- [Python 3.8+](https://www.python.org/)

### Clone the Repository

```bash
git clone https://github.com/Arun-Kumar21/Vector-embedding-based-search .
```

### Backend Setup (Flask)

1. Navigate to the server directory:

```bash
cd server
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

On Windows:

```bash
venv\Scripts\activate
```

On macOS/Linux:

```bash
source venv/bin/activate
```

4. Install Python dependencies:

```bash
pip install -r requirements.txt
```

5. Run the backend server:

```bash
python wsgi.py
```

### Frontend Setup (React)

1. Navigate to the frontend directory:

   ```bash
   cd ../client
   ```

2. Copy the example environment file and create your `.env`:

   ```bash
   cp .example-env .env
   ```

3. Install Node.js dependencies:

   ```bash
   npm install
   ```

4. Run the React development server:

   ```bash
   npm start
   ```

---

## 📂 Project Structure

```plaintext
Vector-embedding-based-search/
├── server/         # Flask backend for API and semantic search logic
├── client/        # React frontend for user interaction
├── README.md        # Project documentation
```

---

## 🔧 Technologies Used

| Technology                | Purpose                               |
| ------------------------- | ------------------------------------- |
| React                     | Frontend user interface               |
| Flask                     | Backend API                           |
| Hugging Face Transformers | Natural language processing (**NLP**) |
| FAISS                     | Efficient indexing and retrieval      |

---
