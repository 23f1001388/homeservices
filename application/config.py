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
  SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(SQLITE_DB_DIR, 'database.db')

  UPLOAD_FOLDER=os.path.join(basedir, '../uploads/')

  #Celery Configuration
  CELERY_BROKER_URL='redis://localhost:6379/0'
  CELERY_RESULT_BACKEND='reids://localhost:6379/1'

  # Mail Configuration
  MAIL_SERVER= 'smtp.gmail.com'          # Your mail server, e.g., smtp.gmail.com
  MAIL_PORT = 587                           # Port for TLS
  MAIL_USE_TLS = True                       # Use TLS
  MAIL_USE_SSL = False                      # Use SSL (set to False if using TLS)
  MAIL_USERNAME= 'tlsetiastudy@gmail.com'  # Your email username
  MAIL_PASSWORD= 'Shiv*2231'           # Your email password
  MAIL_DEFAULT_SENDER = 'tlsetiastudy@gmail.com' # Default sender (optional)



 
