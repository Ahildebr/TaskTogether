from config import app, db
from models import *

if __name__ == "__main__":
  with app.app_context():

    print("Seeding database...")

    # Clear the database
    db.session.query(UserBoards).delete()
    db.session.query(Tasks).delete()
    db.session.query(Boards).delete()
    db.session.query(User).delete()
    db.session.commit()

    # Create Users
    user1 = User(username="alice")
    user1.password_hash = "password123"  

    user2 = User(username="bob")
    user2.password_hash = "securepass"  

    user3 = User(username="charlie")
    user3.password_hash = "mypassword"  

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # Create Boards
    board1 = Boards(title="Development Board", description="Tasks for the dev team")
    board2 = Boards(title="Marketing Board", description="Marketing-related tasks")
    board3 = Boards(title="Operations Board", description="Day-to-day operations")

    db.session.add_all([board1, board2, board3])
    db.session.commit()

    # Assign Users to Boards (Many-to-Many via UserBoards)
    user_board1 = UserBoards(user_id=user1.id, board_id=board1.id)
    user_board2 = UserBoards(user_id=user2.id, board_id=board1.id)
    user_board3 = UserBoards(user_id=user2.id, board_id=board2.id)
    user_board4 = UserBoards(user_id=user3.id, board_id=board3.id)

    db.session.add_all([user_board1, user_board2, user_board3, user_board4])
    db.session.commit()

    # Create Tasks
    task1 = Tasks(title="Build API", description="Develop REST API endpoints", status="To Do", user_id=user1.id, board_id=board1.id)
    task2 = Tasks(title="Design UI", description="Create wireframes for the app", status="In Progress", user_id=user2.id, board_id=board1.id)
    task3 = Tasks(title="Social Media Campaign", description="Plan next month’s posts", status="To Do", user_id=user2.id, board_id=board2.id)
    task4 = Tasks(title="Budget Planning", description="Prepare next quarter's budget", status="Completed", user_id=user3.id, board_id=board3.id)

    db.session.add_all([task1, task2, task3, task4])
    db.session.commit()

    print("Database seeded successfully!")
