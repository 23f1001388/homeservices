from application.models import Service, Professional, Customer, ServiceRequest
from enum import Enum

class SearchType(Enum):
    BY_NAME = "By Name"
    BY_DESCRIPTION = "By Description"
    BY_EXPERIENCE = "By Experience"
    BY_ADDRESS = "By Address"
    BY_PINCODE = "By Pincode"
    BY_BUDGET = "By Budget"
    BY_STATUS = "By Status"

def searchProfessionals(subtype, search):

  if subtype == SearchType.BY_NAME:
    Professionals = Professional.query.filter(Professional.name.ilike(f'%{search}%')).all()
  elif subtype == SearchType.BY_DESCRIPTION:
    Professionals = Professional.query.filter(Professional.description.like('%' + search + '%')).all()
  elif subtype == SearchType.BY_EXPERIENCE:
    Professionals = Professional.query.filter(Professional.experience>= search).all()
  elif subtype == SearchType.BY_ADDRESS:
    Professionals = Professional.query.filter(Professional.address.like('%' + search + '%')).all()
  elif subtype == SearchType.BY_PINCODE:
    Professionals = Professional.query.filter(Professional.pincode==search).all()
  elif subtype == SearchType.BY_STATUS:
    Professionals = Professional.query.filter(Professional.status.like('%' + search +
                                                        '%')).all()

  return Professionals


def searchCustomers(subtype, search):

  if subtype == SearchType.BY_NAME:
    Customers = Customer.query.filter(
        Customer.name.like('%' + search + '%')).all()
  elif subtype == "By Category":
    Customers = Customer.query.filter(
        Customer.category.like('%' + search + '%')).all()
  elif subtype == "By Niche":
    Customers = Customer.query.filter(
        Customer.niche.like('%' + search + '%')).all()
  elif subtype == "By Reach":
    Customers = Customer.query.filter(Customer.reach >= search).all()
  elif subtype == "By Status":
    Customers = Customer.query.filter(
        Customer.status.like('%' + search + '%')).all()
  return Customers


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
