from __main__ import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    type = db.Column(db.String(20), nullable=False)

    def __init__(self, username, email, password):
        self.email = email
        self.password = password

    def __repr__(self):
        return "User('{self.id}', '{self.email}')"

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': type
    }


class Client(User):
    __tablename__ = 'client'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    # projetos

    __mapper_args__ = {
        'polymorphic_identity': 'client',
    }


class ServiceProvider(User):
    __tablename__ = 'service_provider'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    # projetos
    # especialidade
    # curriculo
    __mapper_args__ = {
        'polymorphic_identity': 'service_provider',
    }


class Integrator(User):
    __tablename__ = 'integrator'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'integrator',
    }
