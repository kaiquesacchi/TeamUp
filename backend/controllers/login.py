from flask_restful import Resource
from flask import request
from models import Client


class Login(Resource):

    def post(self):
        try:
            requestData = request.get_json()
            client = Client.query.filter_by(
                email=requestData.get('email')).first()
            if client:
                if client.password == requestData.get('password'):
                    return {'login': True,
                            'user_id': client.id,
                            'user_name': client.name
                            }
            raise
        except Exception as e:
            return {
                'login': False,
                'error': e
            }
