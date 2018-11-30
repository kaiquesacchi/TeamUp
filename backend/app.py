from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from controllers.create_proposal import CreateProposal
from controllers.start import Start
from controllers.projects_list import ProjectsList
from controllers.conclude_project import ConcludeProject

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:@localhost/teamup'
db = SQLAlchemy(app)

api.add_resource(CreateProposal, '/proposta')
api.add_resource(Start, '/start')
api.add_resource(ProjectsList, '/projetos')
api.add_resource(ConcludeProject, '/projeto/concluir')

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(30))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
