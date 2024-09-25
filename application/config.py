import os
from dotenv import load_dotenv
load_dotenv()

basedir=os.path.abspath(os.path.dirname(__file__))

class Config:
  SQLITE_DB_DIR = None
  SECRET_KEY =None
  SQLALCHEMY_DATABASE_URI =None
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SECURITY_PASSWORD_SALT = None
  DEBUG=False
  
class LocalDevelopmentConfig(Config):
  DEBUG = True
  SQLITE_DB_DIR = os.path.join(basedir, '../database')
  # SQLALCHEMY_DATABASE_URI ='sqlite:///' + os.path.join(SQLITE_DB_DIR, 'database.db')
  # SQLALCHEMY_DATABASE_URI ='sqlite:///' + os.path.join(SQLITE_DB_DIR, '/',os.getenv('DATABASE'))
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SECURITY_PASSWORD_SALT = 'saltypassword'
  SECRET_KEY="myflasksecret"
  SQL_DB_DIR = os.path.join(basedir, '../database')
  SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(SQLITE_DB_DIR, 'database.db')
 
