from flask_restful import Resource
from flask import request


class ConcludeProject(Resource):

    projetosConcluidos = []

    def get(self):
        return {
            'endDate': '14/11/2018',
            'spending': 2000,
            'foreseen': 1500,
            'solvedProblems': 20
        }

    def post(self):
        requestData = request.get_json()
        prop = {
                'nps': requestData.get('nps'),
                'comment': requestData.get('comment')
            }
        self.projetosConcluidos.append(prop)
        print(self.projetosConcluidos)
        return {'projeto': prop}
