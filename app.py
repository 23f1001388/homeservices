from flask import Flask, render_template,request
import requests
from application.application import db,security
from application.createdata import createData
from application.config import LocalDevelopmentConfig
from application.models import User,Role
from flask_security import SQLAlchemyUserDatastore
from application.views import createViews
from flask_cors import CORS
from api.serviceresource import api
from flask_mail import Message,Mail
from application.mailing import *
from flask_caching import Cache
from celeryApp.workers import celery_init_app
from celeryApp.tasks import daily_reminder
import flask_excel as excel
from celery.schedules import crontab


def createApp():
    app = Flask(__name__,template_folder='templates', static_folder='static', static_url_path='/static')
    app.config.from_object(LocalDevelopmentConfig)
     # configure token
    # app.config['WTF_CSRF_CHECK_DEFAULT'] =False
    # app.config['SECURITY_CSRF_PROTECT_MECHANISM'] = []
    # app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True
    cache=Cache()
    cache.init_app(app)
    db.init_app(app)

    with app.app_context():
        user_datastore=SQLAlchemyUserDatastore(db,User,Role)
        security.init_app(app,user_datastore)
        db.create_all()
        createData(user_datastore)
        createViews(app,user_datastore)
    # connect flask to flask_restful
    api.init_app(app)
    CORS(app)
    return app

app=createApp()
# mail=Mail(app)
calary_app=celery_init_app(app)
excel.init_excel(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)