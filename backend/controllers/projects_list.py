from flask_restful import Resource
from flask import request

# Database
from models import Project
from __main__ import db


class ProjectsList(Resource):

    def get(self):
        allProjects = Project.query.filter_by(client_id=request.args['user_id'])
        projects = []
        ids = []
        for proj in allProjects:
            status = ''
            if (proj.finalized):
                status = 'Finalizado'
            else:
                status = 'Em andamento'
            projects.append([proj.origin_demand.name, status, str(proj.final_date), str(proj.cost)])
            ids.append(proj.id)
        return {
            'projetos': projects,
            'ids': ids
        }
