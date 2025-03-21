from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model, SerializerMixin):
    __tablename__ = "Users"

    serialize_rules = (
        "-_password_hash", 
        "-user_boards.user",  
        "-tasks.user", 
        "-tasks.board.tasks",
        "-tasks.board.user_boards",
        "-user_boards.board.user_boards",
        "-user_boards.board.tasks",
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    _password_hash = db.Column(db.String(255), nullable=False)

    user_boards = db.relationship("UserBoards", back_populates="user")
    tasks = db.relationship("Tasks", back_populates="user")


    @validates("username")
    def validate_username(self, key, username):
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")
        elif len(username) > 25:
            raise ValueError("Username must be at most 25 characters long")
        return username


    @hybrid_property
    def password_hash(self):
        raise Exception("You cannot view the password hash")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f'<User id={self.id} username="{self.username}">'


class Boards(db.Model, SerializerMixin):
    __tablename__ = "Boards"
    
    serialize_rules = (
        "-user_boards.board",  
        "-tasks.board",  
        "-tasks.user.tasks",
        "-user_boards.user.user_boards",
        "-user_boards.user.tasks",  
        "-tasks.user",  
        "-user_boards.user",  
    )
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    user_boards = db.relationship("UserBoards", back_populates="board")
    tasks = db.relationship("Tasks", back_populates="board")

    def __repr__(self):
        return f"<Board {self.title}>"


class UserBoards(db.Model, SerializerMixin):
    __tablename__ = "UserBoards"
    
    serialize_rules = (
        "-user.user_boards",  
        "-board.user_boards", 
        "-user.tasks",
        "-board.tasks", 
        "-user",  
        "-board",
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey("Boards.id"), nullable=False)

    user = db.relationship("User", back_populates="user_boards", lazy="joined")  
    board = db.relationship("Boards", back_populates="user_boards")

    def __repr__(self):
        return f"<UserBoard User: {self.user_id} - Board: {self.board_id}>"  


class Tasks(db.Model, SerializerMixin):
    __tablename__ = "Tasks"
    
    serialize_rules = (
        "-user.tasks",  
        "-board.tasks",  
        "-board.user_boards",
        "-user.user_boards",
        "-user", 
        "-board",
    )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey("Boards.id"), nullable=False)

    user = db.relationship("User", back_populates="tasks", lazy="joined")
    board = db.relationship("Boards", back_populates="tasks")

    def __repr__(self):
        return f"<Task {self.title} - Status: {self.status}>"
