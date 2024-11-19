from application.models import Service, Professional, Customer, ServiceRequest

from sqlalchemy import func

def serviceRequest_summary():
  servicerequests = ServiceRequest.query.with_entities(
      ServiceRequest.status, 
      func.count(ServiceRequest.id).label('count')
  ).group_by(ServiceRequest.status).all()
  print(servicerequests)