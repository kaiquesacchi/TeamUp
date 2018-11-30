from flask_restful import Resource


class Start(Resource):

    earnings = {
        'value': 12520,
        'last_update': '3 dias atras'
    }
    employees = {
        'value': 15,
        'last_update': 'Uma semana atras'
    }
    graph_values = [[542, 443, 320, 780, 553, 453,
                     326, 434, 568, 610, 756, 895]]

    def get(self):
        return {
            'earnings': self.earnings,
            'employees': self.employees,
            'graph_values': self.graph_values
        }
