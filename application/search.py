from application.models import Service, Professional, Customer, ServiceRequest
from enum import Enum

class SearchType(Enum):
    BY_NAME = "By Name"
    BY_ADDRESS = "By Address"
    BY_PINCODE = "By Pincode"
    BY_CONTACT = "By Contact"
    BY_STATUS = "By Status"
    BY_DESCRIPTION = "By Description"
    BY_EXPERIENCE = "By Experience"
    BY_PRICE="By Price"
    

def searchProfessionals(subtype, search):
  professionals=[]
  if subtype == SearchType.BY_NAME:
    objData = Professional.query.filter(Professional.name.ilike('%' + search + '%')).all()
  if subtype == SearchType.BY_DESCRIPTION:
    objData = Professional.query.filter(Professional.description.like('%' + search + '%')).all()
  if subtype == SearchType.BY_EXPERIENCE:
    objData = Professional.query.filter(Professional.experience>= search).all()
  if subtype == SearchType.BY_ADDRESS:
    objData = Professional.query.filter(Professional.address.like('%' + search + '%')).all()
  if subtype == SearchType.BY_PINCODE:
    objData = Professional.query.filter(Professional.pincode==search).all()
  if subtype == SearchType.BY_STATUS:
    objData = Professional.query.filter(Professional.status.like('%' + search + '%')).all()
  
  objData = Professional.query.all()
   
  for obj in objData:
    userdata = {"id": obj.id, "email": obj.email,"name": obj.name,"experience":obj.experience,"services":[service.name for service in obj.services],"active":int(obj.active)}
    professionals.append(userdata)
 
  return professionals


def searchCustomers(subtype, search):
  customers=[]

  if subtype == SearchType.BY_NAME:
    objData = Customer.query.filter(Customer.name.ilike('%' + search + '%')).all()
  if subtype == SearchType.BY_ADDRESS:
    objData = Customer.query.filter(Customer.address.like('%' + search + '%')).all()
  if subtype == SearchType.BY_PINCODE:
    objData = Customer.query.filter(Customer.pincode==search).all()
  if subtype == SearchType.BY_CONTACT:
    objData = Customer.query.filter(Customer.contact.like('%' + search + '%')).all()
  if subtype == SearchType.BY_STATUS:
    objData = Customer.query.filter(Customer.status.like('%' + search + '%')).all()
  
  objData = Professional.query.all()
   
  for obj in objData:
    userdata = {"id": obj.id, "email": obj.email,"name": obj.name,"address":obj.address,"contact":obj.contact,"pincode":obj.pincode,"active":int(obj.active)}
    customers.append(userdata)

  return customers


def searchServices(subtype, search):
  if subtype == SearchType.BY_NAME:
    Services = Service.query.filter(Service.name.like('%' + search +
                                                         '%')).all()
  elif subtype == "By Description":
    Services = Service.query.filter(
        Service.description.like('%' + search + '%')).all()
  elif subtype == "By Start Date":
    Services = Service.query.filter(Service.start_date == search).all()
  elif subtype == "By End Date":
    Services = Service.query.filter(Service.end_date == search).all()

  elif subtype == "By Budget":
    Services = Service.query.filter(Service.budget >= search).all()

  elif subtype == "By Visibility":
    Services = Service.query.filter(
        Service.visibility.like('%' + search + '%')).all()

  elif subtype == "By Goals":
    Services = Service.query.filter(Service.goals.like('%' + search +
                                                          '%')).all()
  elif subtype == "By Status":
    Services = Service.query.filter(Service.status.like('%' + search +
                                                           '%')).all()
  elif subtype == "By Validity":
    Services = Service.query.filter(
        Service.validity.like('%' + search + '%')).all()

  return Services


def searchServiceRequests(subtype, search):
  if subtype == "By Message":
    ServiceRequests = ServiceRequest.query.filter(
        ServiceRequest.message.like('%' + search + '%')).all()
  elif subtype == "By Requirements":
    ServiceRequests = ServiceRequest.query.filter(
        ServiceRequest.requirements.like('%' + search + '%')).all()
  elif subtype == "By Status":
    ServiceRequests = ServiceRequest.query.filter(
        ServiceRequest.status.like('%' + search + '%')).all()
  elif subtype == "By Present Status":
    ServiceRequests = ServiceRequest.query.filter(
        ServiceRequest.present_status.like('%' + search + '%')).all()

  return ServiceRequests
