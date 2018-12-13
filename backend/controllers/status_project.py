from flask_restful import Resource
from flask import request

# Database
from models import Project
from __main__ import db


class StatusProject(Resource):

    def get(self, id):
        project = Project.query.get(id)
        print(Project.query.all())
        serviceProviders = []
        for association in project.service_providers:
            serviceProviders.append([association.service_provider.name, str(association.service_provider.cost_per_project),
                                    association.service_provider.skills])
        return {
            'foreseenDate': str(project.final_date),
            'spending': project.spending,
            'foreseenSpending': project.cost,
            'solvedProblems': 60,
            'deliveries': {
                'value': [[
                    12, 31, 4, 9, 22, 6, 8
                ]],
                'last_update': '1 dias atrás'
            },
            'doneTasks': {
                'value': [[
                    220, 360, 270, 91, 135, 244,
                    81, 132, 317, 110, 258, 160
                ]],
                'last_update': '5 minutos atrás'
            },
            'tasks': [
                'Reunião final com a equipe',
                'Teste de integração de todo o sistema',
                'Happy Hour de comemoração',
                'Relatório final'
            ],
            'employees': {
                'value': serviceProviders,
                'last_update': '3 dias atrás'
            }
        }
