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
from models import User, Client, ServiceProvider, Integrator, Project, AssociationServiceProviderProject

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


try:
    db.create_all()
    client1 = Client(name='João', email='joao@mail.com', password='12345')
    user1 = ServiceProvider(name='José', email='jose@mail.com', password='12345', skills='Design', curriculum='Front', cost_per_project=1000.50)
    user2 = ServiceProvider(name='Maria', email='maria@mail.com', password='12345', skills='Marketing', curriculum='SEO', cost_per_project=1200)
    user3 = ServiceProvider(name='Victor', email='victor@mail.com', password='12345', skills='Banco de dados', curriculum='SQL', cost_per_project=2000)
    db.session.add(client1)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    print(Client.query.all())
    print('\n\n\n')
    print(ServiceProvider.query.all())
    print('\n\n\n')

    date = datetime.datetime.strptime('20/10/2019', '%d/%m/%Y')
    project = Project(cost=30.3, spending=12.2, client_id=client1.id, final_date=date)
    db.session.add(project)
    print(Project.query.all())
    print('\n\n\n')

    association1 = AssociationServiceProviderProject(project, user1)
    association2 = AssociationServiceProviderProject(project, user2)
    association3 = AssociationServiceProviderProject(project, user3)

    db.session.commit()
    print(Client.query.all())
    print('\n\n\n')
    print(ServiceProvider.query.all())
    print('\n\n\n')
    print(Project.query.all())
    print('\n\n\n')
except Exception as e:
    print(e)
    # print('Usuário já cadastrado')


if __name__ == '__main__':
    app.run(debug=True)
