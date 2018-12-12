from __main__ import db, Base

# Associations classes

class AssociationServiceProviderProject(Base):
    __tablename__ = 'association-service_provider-project'
    service_provider_id = db.Column(db.Integer, db.ForeignKey('service_provider.id'), primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), primary_key=True)
    service_provider = db.relationship('ServiceProvider', back_populates='projects')
    project = db.relationship('Project', back_populates='service_providers')

    def __init__(self, project, service_provider):
        self.project = project
        self.project_id = project.id
        self.service_provider = service_provider
        self.service_provider_id = service_provider.id

    def __repr__(self):
        return "Association: ServiceProvider-Project('{}', '{}')".format(
            self.service_provider_id, self.project_id)


# Models

class User(Base):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    type = db.Column(db.String(20), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return "User('{}', '{}', '{}', '{}')".format(self.id, self.name, self.email, self.type)

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': type
    }


class Client(User):
    __tablename__ = 'client'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    projects = db.relationship('Project', backref='client', lazy=True)

    def __init__(self, name, email, password):
        User.__init__(self, name, email, password)
    
    def __repr__(self):
        return "Client('{}', '{}', '{}', '{}', '{}')".format(self.id, self.name, self.email, self.type, self.projects)
    __mapper_args__ = {
        'polymorphic_identity': 'client',
    }


class ServiceProvider(User):
    __tablename__ = 'service_provider'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    projects = db.relationship('AssociationServiceProviderProject', back_populates='service_provider')
    skills = db.Column(db.String(100), nullable=False)
    curriculum = db.Column(db.String(1000), nullable=False)
    proposal_id = db.Column(db.Integer, db.ForeignKey('proposal.id'))
    cost_per_project = db.Column(db.Float, nullable=False)
    __mapper_args__ = {
        'polymorphic_identity': 'service_provider',
    }

    def __init__(self, name, email, password, skills, curriculum, cost_per_project):
        User.__init__(self, name, email, password)
        self.skills = skills
        self.curriculum = curriculum
        self.cost_per_project = cost_per_project

    def __repr__(self):
        return "Service Provider('{}', '{}', '{}', '{}', '{}', '{}')".format(
            self.id, self.name, self.skills, self.type, self.projects, self.cost_per_project)


class Integrator(User):
    __tablename__ = 'integrator'
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)

    __mapper_args__ = {
        'polymorphic_identity': 'integrator',
    }


class Project(Base):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    final_date = db.Column(db.Date, nullable=False)
    spending = db.Column(db.Float, nullable=False)
    tasks_completed = db.Column(db.Integer, nullable=True)
    # Relationships
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'),
                          nullable=False)
    service_providers = db.relationship('AssociationServiceProviderProject',
                                        back_populates='project')
    demand_id = db.Column(db.Integer, db.ForeignKey('demand.id'), nullable=False)
    origin_demand = db.relationship('Demand', foreign_keys=[demand_id])
    # team
    # demand = db.relationship('Demand', uselist=False)
    # problems_solved
    # tasks_completed

    def __repr__(self):
        return "Project('{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(
            self.id, self.cost, self.final_date,
            self.spending, self.client_id, self.service_providers,
            self.origin_demand)


class Demand(Base):
    __tablename__ = 'demand'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    funcionalities = db.Column(db.String(300), nullable=False)
    platform = db.Column(db.String(100), nullable=False)
    final_date = db.Column(db.Date, nullable=False)
    proposals = db.relationship('Proposal', backref='demand', lazy=True)
    # project = db.relationship('Project', uselist=False)
    # project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    def __init__(self, name, description, funcionalities, platform, final_date):
        self.name = name
        self.description = description
        self.funcionalities= funcionalities
        self.platform= platform
        self.final_date= final_date

    def __repr__(self):
        return "Demand('{}', '{}', '{}', '{}', '{}', '{}')".format(self.id, self.name, self.description, self.funcionalities, self.platform, self.final_date)


class Proposal(Base):
    __tablename__ = 'proposal'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    team = db.relationship('ServiceProvider', backref='proposal', lazy=True)
    cost = db.Column(db.Float, nullable=False)
    final_date = db.Column(db.Date, nullable=False)
    client_approval = db.Column(db.Boolean, nullable=False)
    demand_id = db.Column(db.Integer, db.ForeignKey('demand.id'),
                          nullable=False)
