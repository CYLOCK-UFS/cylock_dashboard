from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
LocalSession = sessionmaker(bind=engine)

Base = declarative_base()


class Categoria(Base):
    __tablename__ = "categorias"

    id = Column(Integer, primary_key=True)
    nome = Column(String, unique=True, nullable=False)


class Fonte(Base):
    __tablename__ = "fontes"

    id = Column(Integer, primary_key=True)
    nome = Column(String, unique=True, nullable=False)


class Noticia(Base):
    __tablename__ = "noticias"

    id = Column(Integer, primary_key=True)
    titulo = Column(String, nullable=False)
    resumo = Column(Text)
    link = Column(String, unique=True)
    data = Column(DateTime, nullable=False)

    categoria_id = Column(Integer, ForeignKey("categorias.id"))
    fonte_id = Column(Integer, ForeignKey("fontes.id"))