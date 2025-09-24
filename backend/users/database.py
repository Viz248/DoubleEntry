from sqlmodel import create_engine, SQLModel, Session

user_engine=create_engine("sqlite:///./users.db", echo=True)   

def init_user_db():
    SQLModel.metadata.create_all(user_engine)

def get_user_session():
    with Session(user_engine) as session:
        yield session