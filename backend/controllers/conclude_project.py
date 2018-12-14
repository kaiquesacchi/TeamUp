from flask_restful import Resource
from flask import request

# Database
from models import Project
from __main__ import db


class ConcludeProject(Resource):

    def get(self):
        allProjects = Project.query.all()
        projects = []
        for project in allProjects:
            if (not project.finalized):
                projects.append({
                    'name': project.origin_demand.name,
                    'value': project.id,
                })
        return {
            'projects': projects
        }

    def post(self):
        requestData = request.get_json()
        prop = {
                'nps': requestData.get('nps'),
                'comment': requestData.get('comment'),
            }
        project = Project.query.get(requestData.get('project'))
        project.finalized = True
        db.session.add(project)
        db.session.commit()
        return {'projeto': prop}
