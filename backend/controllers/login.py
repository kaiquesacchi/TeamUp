from flask_restful import Resource
from flask import request


class Login(Resource):

    def post(self):
        requestData = request.get_json()
        prop = {
                'email': requestData.get('email'),
                'senha': requestData.get('password'),
            }
        print(prop)
        return {'login': prop}
