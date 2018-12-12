from flask_restful import Resource
from flask import request

# utils
import datetime

# Database
from models import ServiceProvider, Demand, Proposal
from __main__ import db


class CreateProposal(Resource):

    def get(self):
        allProfessionals = ServiceProvider.query.all()
        professionals = []
        for prof in allProfessionals:
            professionals.append([prof.name, prof.skills, str(prof.cost_per_project), str(prof.id)])
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
        proposal = Proposal(demand_id=requestData.get('demand'), client_approval=False,
                            cost=requestData.get('value'), final_date=datetime.datetime.now())
        db.session.add(proposal)
        db.session.commit()
        print(requestData.get('serviceProviderIds'))
        print(Proposal.query.all())
        return {'status': 'criada'}
