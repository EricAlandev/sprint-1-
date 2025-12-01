import psycopg2
import os
from dotenv import load_dotenv

def db():
    #carrega os arquivos dotenv;
    load_dotenv()
    database_URL = os.getenv("DATABASE_URL")
    conn = psycopg2.connect(database_URL)
    cursor = conn.cursor()

    return conn, cursor


