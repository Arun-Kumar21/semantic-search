# Vector Embedding Based Search (**Semantic Search System**)✨

> **Warning**: This project is currently under development. ⚠️

A reusable and scalable **Semantic Search System** built with **React**, **Flask**, and **Hugging Face Transformers**, leveraging **FAISS** for efficient indexing. This project allows you to upload and search through MDX, PDF, and text files seamlessly

---

## 🌟 Features

- **🚀 Semantic Search**: High-accuracy search powered by Hugging Face Transformers.
- **📂 Multi-format Support**: Upload and index MDX, PDF, and plain text files.
- **🔎 Lightning-fast Retrieval**: Optimized with FAISS for quick and scalable searches.
- **📈 Scalable Architecture**: React frontend with Flask backend, designed for reusability.
- **💾 Knowledge Base Builder**: Easily add your data to the system as a knowledge base.
- **🛠️ Developer-friendly**: Modular codebase.

---

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

## 📚 Usage

1. **Upload Files**: Drag and drop your MDX, PDF, or text files in the frontend.
2. **Index Data**: The backend processes and indexes your data using FAISS.
3. **Search**: Enter your query in the search bar and get semantically relevant results instantly.

---

## 🔧 Technologies Used

| Technology                | Purpose                               |
| ------------------------- | ------------------------------------- |
| React                     | Frontend user interface               |
| Flask                     | Backend API                           |
| Hugging Face Transformers | Natural language processing (**NLP**) |
| FAISS                     | Efficient indexing and retrieval      |

---

## 📋 Use Cases

**Efficient Blog Search**: Quickly find specific information or insights in MDX-based blog posts.

**Personal Knowledge Base**: Organize and retrieve information from large datasets like PDFs or text files.

**Interactive Documentation**: Enhance technical or project documentation with semantic search capabilities.
