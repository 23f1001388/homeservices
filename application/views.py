from flask import request,render_template_string,render_template,jsonify,send_from_directory
from flask_security import SQLAlchemyUserDatastore,auth_required,roles_required,roles_accepted,current_user,verify_password,logout_user
from application.models import User
import requests

def createViews(app,user_datastore:SQLAlchemyUserDatastore):

  @app.route('/static/<path:path>')
  def static_proxy(path):
    return send_from_directory(app.static_folder, path)

  @app.route('/', defaults={'path': ''})
  @app.route('/<path:path>')
  # @app.route('/')
  def index(path):
    # users=User.query.all()
    return render_template('index.html')

  @app.route('/getlocation')
  def get_location():
    ip = request.remote_addr
    response = requests.get(f'http://ipinfo.io/{ip}/json')
    location_data = response.json()
    return location_data
  
  @app.route('/logout')
  @auth_required
  def logout():
    logout_user()
    return render_template('index.html')
    
  
  @app.route('/userlogin',methods=['POST'])
  def userLogin():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')

    if not email or not password:
      return jsonify({'message': 'Valid email and Password required'}),404
    
    user=user_datastore.find_user(email=email)
    
    if not user:
      return jsonify({'message': 'User not Registered. Please register.'}),404
    
    if verify_password(password,user.password):
      return jsonify({'token':user.get_auth_token(),'role':user.roles[0].name,'id' : user.id, 'email' : user.email }), 200
    else:
      return jsonify({'message' : 'Wrong password'}),404


  @app.route('/register/professional',methods=['POST'])
  def registerProfessional():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    name=data.get('name')
    service=data.get(service)
    experience=data.get(experience),
    address=data.get(address),
    pincode=data.get(pincode),
    contact=data.get(contact),
    fileupload=data.get(fileupload)
    message=""

    if not email or not password or not name :
      message={'message': 'Some fields are blank'}
      return message,404
    message={'email':email,'password':password}
    return message,200
