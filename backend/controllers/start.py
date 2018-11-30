from flask_restful import Resource


class Start(Resource):

    earnings = {
        'value': 12520,
        'last_update': '3 dias atrás'
    }
    employees = {
        'value': 15,
        'last_update': 'Uma semana atrás'
    }

    def get(self):
        return {
            'earnings': self.earnings,
            'employees': self.employees
        }
