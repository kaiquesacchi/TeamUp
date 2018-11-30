from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from controllers.create_proposal import CreateProposal
from controllers.start import Start

app = Flask(__name__)
api = Api(app)
CORS(app)


api.add_resource(CreateProposal, '/proposta')
api.add_resource(Start, '/start')

if __name__ == '__main__':
    app.run(debug=True)
