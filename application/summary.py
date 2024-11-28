from application.models import Service, Professional, Customer, ServiceRequest

from sqlalchemy import func

def serviceRequestsData(professionalId=None,customerId=None):
  query = ServiceRequest.query.with_entities(
        ServiceRequest.status, 
        func.count(ServiceRequest.id).label('count')
    ).group_by(ServiceRequest.status)
  
  if professionalId:
    print("Reuqetsdata for Professional")
    servicerequestsdata = query.filter(
        ServiceRequest.professional_id == professionalId
    ).all()
  if customerId:
      print("Reuqetsdata for Customer")
      servicerequestsdata = query.filter(
        ServiceRequest.customer_id == customerId
    ).all()
  if not professionalId and not customerId:
     print("Reuqetsdata for Admin")
     servicerequestsdata = query.all()   
  print("Printed from Sumamry RequestData: ",servicerequestsdata)
  result = [{"status": status, "count": count} for status, count in servicerequestsdata]
  print("Printed from Sumamry RequestData : ",result)
  return result

def customersRatingsData(professionalId=None,customerId=None):
   query = ServiceRequest.query.with_entities(
        ServiceRequest.ratings,
        func.count(ServiceRequest.id).label('count')).group_by(
        ServiceRequest.ratings).all()
  
   if professionalId:
    print("Ratings for Professional")
    servicerequestsdata = query.filter(
        ServiceRequest.professional_id == professionalId
    ).all()
   if customerId:
      print("Ratings for Customer")
      servicerequestsdata = query.filter(
        ServiceRequest.customer_id == customerId
    ).all()
   if not professionalId and not customerId:
     print("Ratings for Admin")
     servicerequestsdata = query.all()   
   print("Printed from Sumamry RatingData: ",servicerequestsdata)
   result = [{
        "ratings": ratings,
        "count": count
    } for ratings, count in servicerequestsdata]
   print("Printed from Sumamry RatingData : ",result)
   return result


    # servicerequestsdata = ServiceRequest.query.with_entities(
    #     ServiceRequest.ratings,
    #     func.count(ServiceRequest.id).label('count')).group_by(
    #         ServiceRequest.ratings).all()
    # print("Printed from Ratings: ", servicerequestsdata)
    # result = [{
    #     "ratings": ratings,
    #     "count": count
    # } for ratings, count in servicerequestsdata]
    # print("Printed from Ratings: ", result)
    # return result