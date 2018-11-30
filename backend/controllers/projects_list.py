from flask_restful import Resource
from flask import request


class ProjectsList(Resource):

    def get(self):
        return {
            'projetos': [
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
				["Minerva Hooper", "Curacao", "Sinaai-Waas", "$23,789"],
				["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
				["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
				["Doris Greene", "Malawi", "Feldkirchen in Karnten", "$63,542"],
				["Mason Porter", "Chile", "Gloucester", "$78,615"]
            ]
        }
