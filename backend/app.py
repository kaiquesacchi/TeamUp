from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Controllers
from controllers.create_proposal import CreateProposal
from controllers.start import Start
from controllers.projects_list import ProjectsList
from controllers.conclude_project import ConcludeProject
from controllers.create_demand import CreateDemand
from controllers.status_project import StatusProject
from controllers.login import Login
from controllers.create_account import CreateAccount


app = Flask(__name__)
api = Api(app)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database'
db = SQLAlchemy(app)


# Models
from models import User, Client, ServiceProvider, Integrator, Project


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
	user1 = Client('João', 'joao@mail.com', '12345')
	db.session.add(user1)
	print(Client.query.all())

	project = Project(cost=30.3, spending=12.2, client_id=user1.id)
	db.session.add(project)
	db.session.commit()
	print(Client.query.all())
	print(Project.query.all())
except:
	print("Usuário já cadastrado")

if __name__ == '__main__':
    app.run(debug=True)
