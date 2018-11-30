from flask_restful import Resource
from flask import request


class CreateAccount(Resource):

    def post(self):
        requestData = request.get_json()
        prop = {
                'email': requestData.get('email'),
                'senha': requestData.get('password'),
                'nome': requestData.get('name'),
            }
        print(prop)
        return {'conta': prop}
