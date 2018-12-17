from flask_restful import Resource
from flask import request

from models import Client


class Start(Resource):

    costs = {
        'value': 0,
        'last_update': 'Agora'
    }
    employees = {
        'value': 0,
        'last_update': 'Agora'
    }
    graph_values = [[542, 443, 320, 780, 553, 453,
                     326, 434, 568, 610, 756, 895]]
    tasks = [
        'Reunião final com a equipe',
        'Teste de integração de todo o sistema',
        'Happy Hour de comemoração',
        'Relatório final'
    ]

    def get(self):
        print("\n_" * 20)
        projects = Client.query.get(request.args['user_id']).projects

        self.costs['value'] = sum([float(i.cost) for i in projects])
        self.employees['value'] = sum(
            [len(i.service_providers) for i in projects])
        return {
            'earnings': self.costs,
            'employees': self.employees,
            'graph_values': self.graph_values,
            'tasks': self.tasks
        }
