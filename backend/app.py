from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)
api = Api(app)
CORS(app)
Base = declarative_base()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database'
db = SQLAlchemy(app, model_class=Base)

# utils
import datetime

# Models
from models import User, Client, ServiceProvider, Integrator, Project, AssociationServiceProviderProject, Demand, Proposal, AssociationServiceProviderProposal

# Controllers
from controllers.create_proposal import CreateProposal
from controllers.start import Start
from controllers.projects_list import ProjectsList
from controllers.conclude_project import ConcludeProject
from controllers.create_demand import CreateDemand
from controllers.status_project import StatusProject
from controllers.login import Login
from controllers.create_account import CreateAccount


api.add_resource(CreateProposal, '/proposta')
api.add_resource(Start, '/start')
api.add_resource(ProjectsList, '/projetos')
api.add_resource(ConcludeProject, '/projeto/concluir')
api.add_resource(CreateDemand, '/demanda')
api.add_resource(StatusProject, '/projeto/status')
api.add_resource(Login, '/login')
api.add_resource(CreateAccount, '/conta/criar')


@app.route('/tests')
def testes():
    from misc.tests import test
    test()
    return str("Fim")


if __name__ == '__main__':
    app.run(debug=True)
