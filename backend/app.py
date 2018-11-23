from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

propostas = []

class CreateProposal(Resource):
    def get(self):
        return {
            'professionals': [
                ['Dakota Rice', 'Programador', 'R$1000,00'],
                ['Minerva Hooper', 'Tester', 'R$800,00'],
                ['Sage Rodriguez', 'P.O.', 'R$1200,00'],
                ['Philip Chaney', 'Programador front end', 'R$1000,00'],
                ['Doris Greene', 'Designer', 'R$700,00'],
                ['Mason Porter', 'Cientista de dados', 'R$900,00']
            ]
        }

    def post(self):
        requestData = request.get_json()
        prop = {
            'proposal': requestData.get('proposal'),
            'value': requestData.get('value'),
            'selectedList': requestData.get('selectedList')
        }
        propostas.append(prop)
        print(propostas)
        return {'proposta': prop}

api.add_resource(CreateProposal, '/proposta')

if __name__ == '__main__':
    app.run(debug=True)