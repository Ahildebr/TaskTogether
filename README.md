# TaskTogether

TaskTogether is a full-stack, real-time task collaboration app that allows users to create project boards, add and manage tasks, and invite collaborators — all with live updates powered by WebSockets.

Built with Flask, React, SQLAlchemy, and Socket.IO, TaskTogether is ideal for small teams or individuals who want to stay organized and up to date without needing to refresh the page.

---

## Features

- User authentication (Sign up / Log in / Log out)
- Create and manage project boards
- Real-time task updates using WebSockets (no page reloads)
- Invite collaborators to boards
- Responsive UI with Material UI and custom theming
- Full CRUD support for tasks and boards
- Built-in form validation with Formik and Yup
- Global state managed with React Context

---

##  Tech Stack

**Frontend**
- React
- React Router
- Socket.IO Client
- Material UI
- Formik + Yup

**Backend**
- Flask
- Flask-SocketIO
- SQLAlchemy
- PostgreSQL (or SQLite)
- Marshmallow / SerializerMixin for serialization

---

##  Installation

### 1. Clone the repository
git clone
cd tasktogether

2. Backend Setup
pipenv install

3. Run Migrations & Seed Data
# Set up your database (e.g., PostgreSQL or SQLite)

# If using Flask-Migrate:
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Seed the database
python seed.py

4. Start the Backend Server
python app.py

5. Frontend Setup
cd client
npm install
npm run dev
The frontend will be available at http://localhost:5173 and will communicate with the Flask backend via WebSockets and API routes.

💡 How to Use It
Sign Up / Log In to access your dashboard.

Create a Board to start organizing your tasks.

Add Tasks to a board — you'll see them live without needing to refresh.

Invite Collaborators to your board by username.

Edit or Delete Tasks/Boards as needed — updates appear instantly for all users on the board.

Each board acts as a collaborative workspace where users can keep track of progress in real time.





 Acknowledgments
Built as a personal learning project focused on understanding WebSockets and full-stack architecture. Big thanks to the open-source tools and libraries that made this possible.

📬 Questions?
If you’re testing, building, or curious about the architecture — feel free to reach out, fork the repo, or drop an issue. Happy coding!

