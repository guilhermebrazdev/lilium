# Lilium Project Setup

This project consists of a backend API and a frontend. To run the application locally, you will need to use two separate terminals: one for the backend and another for the frontend.

## Backend Setup

1. Open a terminal in the root directory of the project (`lilium/`).
2. Navigate to the `lilium_api` folder:
   ```bash
   cd lilium_api/
   ```
3. activae the Python virtual environment:
   Windows -
   ```bash
   source venv/Scripts/activate
   ```
   Linux -
   ```bash
   source venv/bin/activate
   ```
   MacOS -
   ```bash
   source venv/bin/activate
   ```
4. Instal backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Once the dependencies are installed, navigate to the actual API folder:
   ```bash
   cd lilium_crud_api/
   ```
6. Start the bacckend server:
   ```bash
   python manage.py runserver
   ```
7. Keep this terminal open to run the backend API server.

## Frontend Setup

1. Open another terminal in the root directory (lilium/).
2. Navigate to the lilium_front/ folder:
   ```bash
   cd lilium_front/
   ```
3. Install frontend dependencies:
   ```bash
   yarn
   ```
4. Once the dependencies are installed, start the frontend server:
   ```bash
   yarn dev
   ```

## Default Ports

Backend: http://localhost:8000/
Frontend: http://localhost:5173/

Make sure to double-check the ports, and if necessary, adjust the API endpoint in the 'environments/.env' file.
Now everything is ready! You can start using the frontend and test the API calls.
