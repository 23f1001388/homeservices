from flask import request,render_template_string,render_template,jsonify,send_from_directory
from flask_security import SQLAlchemyUserDatastore,auth_required,roles_required,roles_accepted,current_user,verify_password,logout_user
from application.models import User,Professional,Customer,Service,ServiceProfessional,ServiceRequest
import requests
import application.mailing as mailing
# from createdata import createUser
from application.application import db
from flask_security.utils import hash_password
import mimetypes,os
from werkzeug.utils import secure_filename
from datetime import datetime
from application.search import searchProfessionals,searchCustomers,searchServices,searchServiceRequests
# from app import app

basedir=os.path.abspath(os.path.dirname(__file__))

def createViews(app,user_datastore:SQLAlchemyUserDatastore):

  # @app.route('/static/<path:path>')
  # def static_proxy(path):
  #   return send_from_directory(app.static_folder, path)
  @app.route('/createUser')
  def createUser(user_datastore:SQLAlchemyUserDatastore,useremail,userpassword,userrole):
   if not user_datastore.find_user(email=useremail):
      user_datastore.create_user(email=useremail,
                                 password=hash_password(userpassword),
                                 active=True,
                                 roles=[userrole])
      db.session.commit()
      return True
   else:
      return False

  @app.route('/admin/users', methods=['GET'])
  def get_users():
    users = User.query.all()  # Get all users
    users_data = []

    for user in users:
        user_info = {
            'id': user.id,
            'email': user.email,
            'roles': [role.name for role in user.roles]  # Get roles associated with the user
        }
        users_data.append(user_info)
    print(users_data)

    return jsonify(users_data)

  @app.route('/admin/professionals', methods=['GET'])
  def get_professionals():
    users = Professional.query.all()
    professionals = []
    for user in users:
      userdata = {"id": user.id, "email": user.email,"name": user.name,"experience":user.experience,"services":[service.name for service in user.services],"active":int(user.active)}
      professionals.append(userdata)
    return jsonify(professionals),200
  
  @app.route('/search/professionals', methods=['GET'])
  def search_professionals(id=None):
    subType = request.args.get('subType')
    searchText = request.args.get('searchText')
    print("From Professional ",subType,searchText)
    professionals=searchProfessionals(subType,searchText)

    if professionals is None:
        return jsonify({"message": "No Data Found"}), 404
    print(professionals)
    return professionals, 200
  
  @app.route('/search/customers', methods=['GET'])
  def search_customers(id=None):
    subType = request.args.get('subType')
    searchText = request.args.get('searchText')
    print("From Customer ",subType,searchText)
    customers=searchCustomers(subType,searchText)

    if customers is None:
        return jsonify({"message": "No Data Found"}), 404
    print(customers)
    return customers, 200
  
  @app.route('/search/servicerequests', methods=['GET'])
  def search_servicerequests(id=None):
    subType = request.args.get('subType')
    searchText = request.args.get('searchText')
    print(subType,searchText)
    servicerequests=searchCustomers(subType,searchText)

    if servicerequests is None:
        return jsonify({"message": "No Data Found"}), 404
    print(servicerequests)
    return servicerequests, 200

  @app.route('/admin/customers', methods=['GET'])
  def get_customers():
    users = Customer.query.all()
    customers = []
    for obj in users:
      userdata = {"id": obj.id, "email": obj.email,"name": obj.name,"address":obj.address,"contact":obj.contact,"pincode":obj.pincode,"active":int(obj.active)}
      customers.append(userdata)
    return customers,200
  
  @app.route('/service/professionals')
  def getServiceProfessionals():
    serviceProfessionals = ServiceProfessional.query.all()
    objectData=[]
    count=1
    for data in serviceProfessionals:
      service_id=data.service_id
      service=Service.query.filter(Service.id==service_id).first()
      for professional in service.professionals:
        obj={
          "id":count,
          "service_id":service.id,
          "service_name":service.name,
          "service_price":service.price,
          "service_timerequired":service.timerequired,
          "professional_id":professional.id,
          "professional_name":professional.name
        }
        objectData.append(obj)
        count+=1
    return objectData, 200
  

  @app.route('/service/professionals/<int:service_id>')
  def getServiceProfessionalsbyService(service_id):
    objectData=[]
    count=1
    service=Service.query.filter(Service.id==service_id).first()
    for professional in service.professionals:
      obj={
        "id":count,
        "service_id":service.id,
        "service_name":service.name,
        "service_price":service.price,
        "service_timerequired":service.timerequired,
        "professional_id":professional.id,
        "professional_name":professional.name
      }
      objectData.append(obj)
      count+=1
    return objectData, 200
  
  @app.route('/', defaults={'path': ''})
  @app.route('/<path:path>')
  def index(path):
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
      return jsonify({"message": "Valid email and Password required"}),404
    
    user=user_datastore.find_user(email=email)
    
    if not user:
      return jsonify({"message": "User not Registered. Please register."}),404
    
    if verify_password(password,user.password):
      return jsonify({"token":user.get_auth_token(),"role":user.roles[0].name,"id" : user.id, "email" : user.email }), 200
    else:
      return jsonify({"message" : "Wrong password"}),404

  @app.route('/sendemail',methods=['POST'])
  def sendEmail():
    data=request.get_json()
    print('Mail Route Ok')
    to=data.get('to')
    subject=data.get('subject')
    content_body=data.get('body')

    if not to or not subject or not content_body:
        return jsonify({"error":"Missing required fields"}),400
    try:
        mailing.send_email(to,subject,content_body)
        return jsonify({"message":"Email sent sucessfully"}),200
    except Exception as e:
        return jsonify({"error": str(e)}),500
  
  
  @app.route('/upload',methods=['POST'])
  def uploadFile():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Check if the file is a PDF
    mime_type, _ = mimetypes.guess_type(file.filename)
    if mime_type != 'application/pdf':
        return jsonify({"error": "Only PDF files are allowed"}), 400

    # Save the file
    file_path = os.path.join(basedir,'/uploads/', file.filename)
    file.save(file_path)

    return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200
  
  @app.route('/register/professional',methods=['POST'])
  def registerProfessional():
    # return jsonify({'message':'Route Ok'}),200
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('name')
    description = request.form.get('description')
    service_id =int(request.form.get('service'))
    # service_names = service_name.split(',')
    experience = request.form.get('experience')
    address = request.form.get('address')
    pincode = request.form.get('pincode')
    contact = request.form.get('contact')
    fileupload = request.files.get('file')
    active=True

    print(service_id)
    
    if not email or not password or not name or not description: 
      return jsonify({"message": "Some fields email/password/name/description are blank"}),404
    elif not address or not pincode or not contact or not experience or not fileupload: 
      return jsonify({"message": "Some fields address/pincode/contact/experience/fileupload are blank"}),404
    elif not service_id:
      return jsonify({"message": "Service Not Selected"}),404
    else:
      if not user_datastore.find_user(email=email):
        if fileupload and fileupload.filename != '':
          upload_directory = os.path.join(os.path.dirname(__file__), '..','uploads')
            # Create the uploads directory if it doesn't exist
          os.makedirs(upload_directory, exist_ok=True)

          # file_path = os.path.join(upload_directory, fileupload.filename)
          # file_path = os.path.join(basedir,'/uploads/',fileupload.filename)
          # print(upload_directory,file_path)
          filename = secure_filename(fileupload.filename)
          file_name, file_extension = os.path.splitext(filename)
          new_filename = f"{email}{file_extension}" 
          file_path = os.path.join(upload_directory, new_filename)
          fileupload.save(file_path)
          try:
            newProfessional=Professional(email=email,name=name,description=description,address=address,pincode=pincode,contact=contact,experience=experience,filepath=file_path,active=active)
            # service = Service.query.filter_by(name=service_name).first()
            # services = Service.query.filter(Service.name.in_(service_names)).all()
            service = Service.query.get(service_id)  # Get the Service object by ID
            if not service:
                return jsonify({"message": "Invalid service selected"}), 404  # Handle invalid service ID
            newProfessional.services.append(service)
            user_datastore.create_user(email=email,
                                    password=hash_password(password),
                                    active=True,
                                    roles=['professional'])
            db.session.add(newProfessional)
            db.session.commit()
            return jsonify({"message":"Professional Registered Successfully"}),200
          except Exception as e:
            db.session.rollback()
            return jsonify({"message":"Error: " + str(e)}),404
      else:
        return jsonify({"message":"Professional aleady Exists"}),404

  @app.route('/admin/approveprofessional/<int:id>', methods=['PUT'])
  def approve_professional(id):
    professional = Professional.query.get(id)
    if not professional:
        return jsonify({"message": "Professional not found"}), 404
    professional.active = True  
    db.session.commit()
    return jsonify({"message": "Professional Updated successfully"}), 200
  
  @app.route('/admin/rejectprofessional/<int:id>', methods=['PUT'])
  def reject_professional(id):
    professional = Professional.query.get(id)
    if not professional:
        return jsonify({"message": "Professional not found"}), 404
    professional.active = False  
    db.session.commit()
    return jsonify({"message": "Professional Updated successfully"}), 200

  @app.route('/register/customer',methods=['POST'])
  def registerCustomer():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    name=data.get('name')
    address=data.get('address')
    pincode=data.get('pincode')
    contact=data.get('contact')
    active=True
    # print(data)
    if not email or not password or not name or not address or not pincode or not contact :
      return jsonify({"message": "Some fields are blank"}),404
    else:
      if not user_datastore.find_user(email=email):
        try:
          newCustomer=Customer(email=email,name=name,address=address,pincode=pincode,contact=contact,active=active)
          
          user_datastore.create_user(email=email,
                                  password=hash_password(password),
                                  active=True,
                                  roles=['customer'])
        
          db.session.add(newCustomer)
          db.session.commit()
          return jsonify({"message":"Customer Registered Successfully"}),200
        except Exception as e:
          db.session.rollback()
          return jsonify({"message":{e}}),404
      else:
        return jsonify({"message":"Customer aleady Exists"}),404
    
  @app.route('/admin/approvecustomer/<int:id>', methods=['PUT'])
  def approve_customer(id):
    customer = Customer.query.get(id)
    if not customer:
        return jsonify({"message": "Customer not found"}), 404
    customer.active = True  
    db.session.commit()
    return jsonify({"message": "Customer Updated successfully"}), 200
  
  @app.route('/admin/rejectcustomer/<int:id>', methods=['PUT'])
  def reject_customer(id):
    customer = Customer.query.get(id)
    if not customer:
        return jsonify({"message": "Customer not found"}), 404
    customer.active = False  
    db.session.commit()
    return jsonify({"message": "Customer Updated successfully"}), 200
  
  def getProfessionalId(userId):
    user=User.query.get(userId)
    professional=Professional.query.filter_by(email=user.email).first()
    professionalId=professional.id
    return professionalId

  def getCustomerId(userId):
    user=User.query.get(userId)
    customer=Customer.query.filter_by(email=user.email).first()
    customerId=customer.id
    return customerId

  @app.route('/servicerequests/bycustomers/<int:customerId>')
  def servicerequests_bycustomers(userId):
    customerId=getCustomerId(userId)
    servicerequests=ServiceRequest.query.filter(ServiceRequest.customer_id==customerId).all()
    dataObject=[]
    for servicerequest in servicerequests:
      service=Service.query.filter(Service.id==servicerequest.service_id).first()
      professionalId=getProfessionalId(servicerequest.professional_id)
      professional=Professional.query.filter(Professional.id==servicerequest.professionalId).first()
      data={
        "id":servicerequest.id,
        "service_id":service.id,
        "service_name":service.name,
        "professional_name":professional.name,
        "professional_contact":professional.contact,
        "status":servicerequest.status
      } 
      dataObject.append(data)
    return dataObject,200
  
  
  
  @app.route('/servicerequests/byprofessionals/<int:userId>')
  def servicerequests_byprofeesional(userId):
    professionalId=getProfessionalId(userId)
    servicerequests=ServiceRequest.query.filter(ServiceRequest.professional_id==professionalId).all()
    print("Professional Id: ",professionalId)

    dataObject=[]
    for servicerequest in servicerequests:
      service=Service.query.filter(Service.id==servicerequest.service_id).first()
      customerId=getCustomerId(servicerequest.customer_id)
      customer=Customer.query.filter(Customer.id==customerId).first()
      data={
        "id":servicerequest.id,
        "service_id":service.id,
        "creationdate":servicerequest.timestamp,
        "service_name":service.name,
        "customer_name":customer.name,
        "customer_contact":customer.contact,
        "customer_address":customer.address,
        "customer_pincode":customer.pincode,
        "status":servicerequest.status,
        "rating":servicerequest.ratings,
        "remarks":servicerequest.remarks
      } 
      dataObject.append(data)
    return dataObject,200

  @app.route('/servicerequest/create/<int:professional_id>',methods=['POST'])
  def serviceRequest_creation(professional_id):
    data=request.get_json()

    service_id = data.get('serviceId')
    customer_id = data.get('customerId')
    professional_id = professional_id
    requestdate = datetime.now()
    status = "Requested"  #requested/assigned/closed
   
    print(customer_id,professional_id)

    if not service_id or not customer_id or not professional_id:
      return jsonify({"message": "Some fields are blank"}),404
    else:
        try:
          newServiceRequest=ServiceRequest(service_id=service_id,customer_id=customer_id,
                                           professional_id=professional_id,requestdate=requestdate,
                                           status=status)
          
          
          db.session.add(newServiceRequest)
          db.session.commit()
          return jsonify({"message":"ServiceRequest created Successfully"}),200
        except Exception as e:
          db.session.rollback()
          return jsonify({"message":{e}}),404
        
  @app.route('/professional/servicerequest/approve/<int:id>', methods=['PUT'])
  def servicerequest_approve(id):
    servicerequest = ServiceRequest.query.get(id)
    if not servicerequest:
        return jsonify({"message": "Service Request not found"}), 404
    servicerequest.status = "Accepted"  
    db.session.commit()
    return jsonify({"message": "Service Request Updated successfully"}), 200
  
  @app.route('/professional/servicerequest/reject/<int:id>', methods=['PUT'])
  def servicerequest_reject(id):
    servicerequest = ServiceRequest.query.get(id)
    if not servicerequest:
        return jsonify({"message": "Service Request not found"}), 404
    servicerequest.status = "Rejected"  
    db.session.commit()
    return jsonify({"message": "Service Request Updated successfully"}), 200