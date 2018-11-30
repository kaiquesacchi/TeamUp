from flask_restful import Resource
from flask import request


class CreateDemand(Resource):

    demandas = []

    def post(self):
        requestData = request.get_json()
        prop = {
                'name': requestData.get('name'),
                'description': requestData.get('description'),
                'funcionalities': requestData.get('funcionalities'),
                'maxDate': requestData.get('maxDate'),
            }
        self.demandas.append(prop)
        print(self.demandas)
        return {'demanda': prop}
