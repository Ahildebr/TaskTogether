from flask import request, jsonify, make_response, session
from config import app, db, socketio
from models import *
from flask_cors import CORS

# Enable CORS with credentials
CORS(app, supports_credentials=True)



# --- WebSocket Lifecycle Events ---
@socketio.on("connect")
def handle_connect():
    print("✅ Client connected")


@socketio.on("disconnect")
def handle_disconnect():
    print("❌ Client disconnected")


# --- Auth & Session Routes ---
@app.route("/api/login", methods=["POST"])
def login():
    """Authenticate user and start session."""
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.authenticate(password):  # <-- Use authenticate instead
        session["user_id"] = user.id
        return make_response(jsonify(user.to_dict()), 200)
    else:
        return jsonify({"error": "Username or password didn't match"}), 422



@app.route("/api/logout", methods=["DELETE"])
def logout():
    session.pop("user_id", None)
    return make_response({}, 204)


@app.route("/api/check_current_user", methods=["GET"])
def check_current_user():
    if "user_id" not in session:
        return make_response({"error": "Unauthorized"}, 401)

    user = db.session.get(User, session["user_id"])
    return make_response(user.to_dict(), 200)


# --- Boards Routes ---
@app.route("/api/boards", methods=["GET", "POST"])
def boards():
    if "user_id" not in session:
        return make_response({"error": "Unauthorized"}, 401)

    if request.method == "GET":
        user = db.session.get(User, session["user_id"])
        user_boards = [ub.board.to_dict() for ub in user.user_boards]
        return make_response(jsonify(user_boards), 200)

    if request.method == "POST":
        data = request.get_json()
        new_board = Boards(
            title=data["title"],
            description=data["description"]
        )
        db.session.add(new_board)
        db.session.commit()

        # Add board membership
        user_board = UserBoards(user_id=session["user_id"], board_id=new_board.id)
        db.session.add(user_board)
        db.session.commit()

        board_data = new_board.to_dict()
        print("📡 Emitting board_created:", board_data)
        socketio.emit("board_created", board_data)

        return make_response(jsonify(board_data), 201)


@app.route("/api/boards/<int:board_id>/tasks", methods=["GET"])
def get_tasks_for_board(board_id):
    if "user_id" not in session:
        return make_response({"error": "Unauthorized"}, 401)

    board = db.session.get(Boards, board_id)
    if not board:
        return make_response({"error": "Board not found"}, 404)

    tasks = [task.to_dict() for task in board.tasks]
    return make_response(jsonify(tasks), 200)


# --- Tasks Routes ---
@app.route("/api/tasks", methods=["POST"])
def create_task():
    if "user_id" not in session:
        return make_response({"error": "Unauthorized"}, 401)

    data = request.get_json()
    task = Tasks(
        title=data["title"],
        description=data["description"],
        board_id=data["board_id"],
        status=data["status"],
        user_id=session["user_id"]
    )
    db.session.add(task)
    db.session.commit()

    task_data = task.to_dict()
    print("📡 Emitting task_created:", task_data)
    socketio.emit("task_created", task_data)

    return make_response(jsonify(task_data), 201)


@app.route("/api/tasks/<int:task_id>", methods=["PATCH", "DELETE"])
def modify_task(task_id):
    task = db.session.get(Tasks, task_id)
    if not task:
        return make_response({"error": "Task not found"}, 404)

    if "user_id" not in session or task.user_id != session["user_id"]:
        return make_response({"error": "Unauthorized"}, 403)

    if request.method == "PATCH":
        data = request.get_json()
        task.title = data.get("title", task.title)
        task.description = data.get("description", task.description)
        task.status = data.get("status", task.status)

        db.session.commit()

        task_data = task.to_dict()
        print("📡 Emitting task_updated:", task_data)
        socketio.emit("task_updated", task_data)

        return make_response(jsonify(task_data), 200)

    if request.method == "DELETE":
        db.session.delete(task)
        db.session.commit()

        print(f"📡 Emitting task_deleted: {{'task_id': {task.id}}}")
        socketio.emit("task_deleted", {"task_id": task.id})

        return make_response({"message": "Task deleted successfully"}, 200)


# --- Server Startup ---
if __name__ == "__main__":
    socketio.run(app, debug=True, port=5555, allow_unsafe_werkzeug=True)
