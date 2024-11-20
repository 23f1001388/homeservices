from application.models import Service, Professional, Customer, ServiceRequest

from sqlalchemy import func

def serviceRequestsData():
  servicerequestsdata = ServiceRequest.query.with_entities(
      ServiceRequest.status, 
      func.count(ServiceRequest.id).label('count')
  ).group_by(ServiceRequest.status).all()
  print("Printed from Sumamry: ",servicerequestsdata)
  result = [{"status": status, "count": count} for status, count in servicerequestsdata]
  print("Printed from Sumamry: ",result)
  return result