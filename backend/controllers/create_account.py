from flask_restful import Resource
from flask import request
from models import Client
from __main__ import db

class CreateAccount(Resource):

    def post(self):
        try:
            requestData = request.get_json()
            client = Client(requestData.get('name'),
                            requestData.get('email'),
                            requestData.get('password'))
            db.session.add(client)
            db.session.commit()
            prop = {
                    'email': requestData.get('email'),
                    'senha': requestData.get('password'),
                    'nome':  requestData.get('name'),
                }
            print(prop)
            return {
                'user_id': client.id, 
                'user_name': client.name
            }
        except:
            return {'client_id': None}