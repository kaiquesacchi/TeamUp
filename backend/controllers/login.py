from flask_restful import Resource
from flask import request
from models import Client
from __main__ import db


class Login(Resource):

    def post(self):
        try:
            requestData = request.get_json()
            client = Client.query.filter_by(email=requestData.get('email')).first()
            if client:
                if client.password == requestData.get('password'):
                    return {'login': True}
        except:
            pass
        return {'login': False}
