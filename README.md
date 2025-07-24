# AI Autocomplete with React, Flask, and Ollama

This project demonstrates a real-time, AI-powered autocomplete feature. It uses a React frontend to capture user input, a Flask backend to process it, and Ollama with the `tinyllama` model to generate intelligent text suggestions. The entire application is containerized with Docker for easy deployment and scalability.

## ✨ Features

* **Real-time Suggestions:** Get instant text predictions as you type.
* **AI-Powered:** Leverages the power of the `tinyllama` large language model running locally via Ollama.
* **Modern UI:** A clean and intuitive user interface built with React and styled with Tailwind CSS.
* **Decoupled Architecture:** A separate frontend and backend make the application scalable and maintainable.
* **Containerized:** Fully dockerized for consistent environments and easy deployment.

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Flask, Python
* **AI Model:** Ollama with `tinyllama`
* **Containerization:** Docker, Gunicorn

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js and npm:** [https://nodejs.org/](https://nodejs.org/)
* **Python 3.9+ and pip:** [https://www.python.org/](https://www.python.org/)
* **Ollama:** [https://ollama.com/](https://ollama.com/)
* **Docker:** [https://www.docker.com/get-started](https://www.docker.com/get-started)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/yourusername/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Set up the Ollama model:**
    Pull the `tinyllama` model.
    ```bash
    ollama pull tinyllama
    ```
    Ensure the Ollama server is running.

3.  **Set up the Flask Backend:**
    Navigate to the backend directory, create a virtual environment, and install the dependencies.
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```
    Run the Flask server:
    ```bash
    python app.py
    ```
    The backend will be running at `http://localhost:5000`.

4.  **Set up the React Frontend:**
    In a new terminal, navigate to the frontend directory and install the dependencies.
    ```bash
    cd frontend
    npm install
    ```
    Run the React development server:
    ```bash
    npm start
    ```
    The frontend will be accessible at `http://localhost:3000`.

## 🐳 Docker Deployment

You can also run the backend service using Docker.

1.  **Build the Docker image:**
    Make sure you are in the `backend` directory where the `Dockerfile` is located.
    ```bash
    docker build -t flask-ollama-api .
    ```

2.  **Run the Docker container:**
    Use the `--network="host"` flag to allow the container to communicate with the Ollama service on your local machine.
    ```bash
    docker run -p 5000:5000 --network="host" flask-ollama-api
    ```
    The backend API will now be running inside Docker and accessible at `http://localhost:5000`.

## ⚙️ API Endpoint

### `/predict`

* **Method:** `POST`
* **Description:** Receives text and returns an AI-generated suggestion.
* **Request Body:**
    ```json
    {
        "text": "your input text here"
    }
    ```
* **Success Response (200):**
    ```json
    {
        "suggestion": "the generated suggestion"
    }
    ```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
