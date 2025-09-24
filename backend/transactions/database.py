from sqlmodel import create_engine, SQLModel, Session

transac_engine=create_engine("sqlite:///./transactions.db", echo=True)   

def init_transac_db():
    SQLModel.metadata.create_all(transac_engine)

def get_transac_session():
    with Session(transac_engine) as session:
        yield session