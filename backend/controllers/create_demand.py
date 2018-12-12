from flask_restful import Resource
from flask import request

# utils
import datetime

# Database
from models import Demand
from __main__ import db


class CreateDemand(Resource):

    def post(self):
        requestData = request.get_json()
        date = datetime.datetime.strptime(requestData.get('maxDate'), '%d/%m/%Y')
        demand = Demand(name=requestData.get('name'), description=requestData.get('description'), funcionalities=requestData.get('funcionalities'),
                        final_date=date, platform='desktop')
        db.session.add(demand)
        db.session.commit()
        print(Demand.query.all())
        return {'status': 'criada'}
