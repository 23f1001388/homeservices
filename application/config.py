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
  SQLITE_DB_DIR = os.path.join(basedir, '../',os.getenv('DB_DIRECTORY'))
  SQLALCHEMY_DATABASE_URI ='sqlite:///' + os.path.join(SQLITE_DB_DIR, '/',os.getenv('DATABASE'))
  SECRET_KEY = os.getenv('SECRET_KEY')
  SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')
 
