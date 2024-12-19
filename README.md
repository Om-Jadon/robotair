# Log Viewer Application

This is a React-based Log Viewer application with a Flask backend. It allows users to upload log files, filter logs based on severity and search terms, and download filtered logs as a `.log` file.
Front end deployed on: https://lighthearted-tartufo-c3a80a.netlify.app/

## Features

1. **Log Upload**: Upload `.log` files to the server for processing.
2. **Log Display**: View logs in a table format with the following details:
   - Timestamp
   - Severity
   - Node
   - Message
3. **Filtering**:
   - Filter logs by severity (INFO, WARN, ERROR, DEBUG, FATAL).
   - Search logs by keywords in the message or node.
4. **Download Logs**:
   - Download filtered logs as a `.log` file.
5. **Dynamic UI**:
   - Automatically updates logs based on filters and search input.

## Technologies Used

### Frontend
- React
- Material-UI (MUI) for styling and components

### Backend
- Flask (Python) for API endpoints

## Installation and Setup

### Backend
1. Clone the repository.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Start the Flask server:
   ```bash
   python server.py
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm run dev
   ```

### Connecting Frontend and Backend
Ensure the Flask server is running on `http://127.0.0.1:5001` so the frontend can make API requests.

## API Endpoints

### `/upload` (POST)
Uploads a log file to the server.
- **Request**: Multipart form data with a file.
- **Response**: Success or error message.

### `/logs` (GET)
Fetches logs based on query parameters.
- **Query Parameters**:
  - `severity`: Comma-separated list of severities to filter.
  - `search`: Keyword to search in the logs.
- **Response**: JSON array of filtered logs.

## Usage

1. **Upload Logs**:
   - Use the "Upload File" button to upload a `.log` file.
2. **Filter Logs**:
   - Use the search bar to filter logs by keywords.
   - Click the filter icon to select severities.
3. **Download Logs**:
   - Click the "Download Filtered Logs (.log)" button to download the currently displayed logs.
