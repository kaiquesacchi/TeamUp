from flask_restful import Resource
from flask import request

# Database
from models import Project
from __main__ import db


class ProjectsList(Resource):

    def get(self):
        allProjects = Project.query.all()
        projects = []
        ids = []
        for proj in allProjects:
            projects.append([proj.origin_demand.name, proj.origin_demand.platform, str(proj.final_date), str(proj.cost)])
            ids.append(proj.id)
        return {
            'projetos': projects,
            'ids': ids
        }
