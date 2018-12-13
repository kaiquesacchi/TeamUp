from flask_restful import Resource
from flask import request

# utils
import datetime

# Database
from models import ServiceProvider, Demand, Proposal, AssociationServiceProviderProposal, Project, AssociationServiceProviderProject
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
            if (len(demand.project) == 0):
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
        print(requestData.get('serviceProviderIds'))
        # proposal
        proposal = Proposal(demand_id=requestData.get('demand'), client_approval=False,
                            cost=requestData.get('value'), final_date=(datetime.datetime.now() + datetime.timedelta(days=30)))
        # associative table
        for servicerId in requestData.get('serviceProviderIds'):
            servicer = ServiceProvider.query.get(servicerId)
            print(servicer)
            association = AssociationServiceProviderProposal(proposal, servicer)
            db.session.add(association)
        print(Proposal.query.all())

        # proposal ==> project
        proposal.client_approval = True
        demand = Demand.query.get(proposal.demand_id)
        project = Project(cost=proposal.cost, spending=0, client_id=demand.client_id, final_date=proposal.final_date, demand_id=proposal.demand_id)
        for servicerId in requestData.get('serviceProviderIds'):
            servicer = ServiceProvider.query.get(servicerId)
            print(servicer)
            association = AssociationServiceProviderProject(project, servicer)
            db.session.add(association)
        print(Proposal.query.all())

        print(Project.query.all())
        db.session.add(project)

        db.session.add(proposal)
        db.session.commit()
        print(Proposal.query.all())
        return {'status': 'criada'}
