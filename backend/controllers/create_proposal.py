from flask_restful import Resource
from flask import request

# Database
from models import ServiceProvider, Demand
from __main__ import db


class CreateProposal(Resource):

    propostas = []

    def get(self):
        allProfessionals = ServiceProvider.query.all()
        professionals = []
        for prof in allProfessionals:
            professionals.append([prof.name, prof.skills, prof.cost_per_project])
        allDemands = Demand.query.all()
        demands = []
        for demand in allDemands:
            demands.append({
                'name': demand.name,
                'value': demand.id,
            })
        return {
            'professionals': professionals,
            'demands': demands
        }

    def post(self):
        requestData = request.get_json()
        prop = {
                'proposal': requestData.get('proposal'),
                'value': requestData.get('value'),
                'selectedList': requestData.get('selectedList')
            }
        self.propostas.append(prop)
        print(self.propostas)
        return {'proposta': prop}
