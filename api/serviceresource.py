from flask_restful import Resource,Api,fields,marshal_with,reqparse
from flask_security import auth_required,roles_required
from flask import jsonify
from application.models import Service
from application.application import db

api=Api(prefix='/api')

create_service_parser=reqparse.RequestParser()

create_service_parser.add_argument('name',type=str)
create_service_parser.add_argument('description',type=str)
create_service_parser.add_argument('price',type=float)
create_service_parser.add_argument('timerequired',type=int)

service_fields={
    'id': fields.Integer,
    'name':fields.String,
    'description': fields.String,
    'price':fields.Float,
    'timerequired':fields.Integer
}

class ServiceAPI(Resource):
    @marshal_with(service_fields)
    def get(self):
        allservices=Service.query.all()
        if allservices is None:
            return jsonify({'message':'No Service Found'}),404
        return allservices,200
    
    def post(self):
        args=create_service_parser.parse_args()
        name=args.get("name")
        description=args.get("description")
        price=args.get("price")
        timerequired=args.get("timerequired")
        
        print(name,description)
        if not name or not description or not price or not timerequired:
            return jsonify({'message':'required Paramters are missing'}),404
        
        exists=Service.query.filter_by(name=name).first()
        
        if exists:
            return jsonify({'message':"Service alreday exists"}),404
        
        newService=Service(name=name,description=description,price=price,timerequired=timerequired)
        db.session.add(newService)
        db.session.commit()
        return jsonify({'message':"Service successfully Created"}),201
        
        
api.add_resource(ServiceAPI,'/serviceapi')