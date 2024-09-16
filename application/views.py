from flask import request,render_template_string,render_template,jsonify
from flask_security import SQLAlchemyUserDatastore,auth_required,roles_required,roles_accepted,current_user,verify_password


def createViews(app,user_datastore:SQLAlchemyUserDatastore):
  @app.route('/')
  def index():
    return render_template('index.html')

  @app.route('/getlocation')
  def get_location():
    ip = request.remote_addr
    response = requests.get(f'http://ipinfo.io/{ip}/json')
    location_data = response.json()
    return location_data
  
  @app.route('/getuser',methods=['POST'])
  def getuser():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    message=""

    if email=="" or password=="":
      message={'message': 'Valid email and Password required'}
      return message
    message={'email':email,'password':password}
    return message,200
    # user=user_datastore.find_user(email=email)
    
    # if not user:
    #   return {'message': 'User not Registered. Please register.'},404
    
    # if verify_password(password,user.password):
    #   return {'token':user.get_auth_token(),'role':user.roles[0].name,'id' : user.id, 'email' : user.email }, 200
    # else:
    #   return {'message' : 'Wrong password'}
  
  @app.route('/userlogin',methods=['POST'])
  def userLogin():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')

    if not email or not password:
      return {'message': 'Valid email and Password required'}
    
    user=user_datastore.find_user(email=email)
    
    if not user:
      return {'message': 'User not Registered. Please register.'}
    
    if verify_password(password,user.password):
      return {'token':user.get_auth_token(),'role':user.roles[0].name,'id' : user.id, 'email' : user.email }, 200
    else:
      return {'message' : 'Wrong password'}