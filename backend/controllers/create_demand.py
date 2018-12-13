from flask_restful import Resource
from flask import request

# utils
import datetime

# Database
from models import Demand, Client
from __main__ import db


class CreateDemand(Resource):

    def post(self):
        # client
        # client = Client(name='Joãoson', email='joaoson@mail.com', password='12345')
        # db.session.add(client)
        # print(Client.query.all())

        requestData = request.get_json()
        date = datetime.datetime.strptime(requestData.get('maxDate'), '%d/%m/%Y')
        demand = Demand(name=requestData.get('name'), description=requestData.get('description'), funcionalities=requestData.get('funcionalities'),
                        final_date=date, platform='desktop', client_id='1')
        db.session.add(demand)
        db.session.commit()
        print(Demand.query.all())
        return {'status': 'criada'}
