from flask_restful import Resource
from flask import request

from models import Client

class Start(Resource):

    earnings = {
        'value': 12520,
        'last_update': '3 dias atrás'
    }
    employees = {
        'value': 15,
        'last_update': 'Uma semana atrás'
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
        print("\n _"*20)
        print(Client.query.get(request.args['user_id']))
        
        return {
            'earnings': self.earnings,
            'employees': self.employees,
            'graph_values': self.graph_values,
            'tasks': self.tasks
        }
