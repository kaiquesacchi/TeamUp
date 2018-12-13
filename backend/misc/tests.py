from __main__ import db
from models import *
import names
import datetime

def generate_client(quantity):
    clients = []
    for i in range(quantity):
        name = names.get_full_name()
        email = name.replace(' ', '_').lower() + "@mail.com"
        clients.append(Client(name=name, email=email, password='123456'))
        db.session.add(clients[-1])
        db.session.commit()
    return clients


def generate_service_provider(quantity):
    service_providers = []
    for i in range(quantity):
        name = names.get_full_name()
        email = name.replace(' ', '_').lower() + "@mail.com"
        service_providers.append(
            ServiceProvider(name=name, email=email, password='123456',
                            skills="Design, Marketing",
                            curriculum="Some clever words",
                            cost_per_project=3000)
        )
        db.session.add(service_providers[-1])
        db.session.commit()
    return service_providers


def generate_demand(client_ids):
    date1 = datetime.datetime.strptime('20/10/2019', '%d/%m/%Y')
    demands = []
    plataforms = ['desktop', 'mobile']
    for id, client_id in enumerate(client_ids):
        demands.append(Demand(name='Reestruturação do TI',
                              description='Mudança na metodologia utilizada',
                              funcionalities='Robos', final_date=date1,
                              platform=plataforms[id % 2], client_id=client_id))
        db.session.add(demands[-1])
        db.session.commit()
    return demands


def generate_project(client_id, demand_id):
    date = datetime.datetime.strptime('20/10/2019', '%d/%m/%Y')
    project = Project(cost=30.3, spending=12.2, client_id=client_id,
                   final_date=date, demand_id=demand_id)
    db.session.add(project)
    db.session.commit()
    return project


def test():
    print("\n" * 10 + "Inicio do Teste\n" + "_" * 80)
    try:
        client = generate_client(1)[0]
        service_providers = generate_service_provider(3)
        demands = generate_demand([client.id, client.id])
        project1 = generate_project(client.id, demands[0].id)
        project2 = generate_project(client.id, demands[1].id)

        association1 = AssociationServiceProviderProject(
            project1, service_providers[0])
        association2 = AssociationServiceProviderProject(
            project1, service_providers[1])
        association3 = AssociationServiceProviderProject(
            project2, service_providers[2])
        db.session.add(association1)
        db.session.add(association2)
        db.session.add(association3)

        date = datetime.datetime.strptime('20/10/2019', '%d/%m/%Y')
        proposal1 = Proposal(demand_id=demands[0].id, client_approval=False,
                             cost=1234, final_date=date)
        proposal2 = Proposal(demand_id=demands[0].id, client_approval=False,
                             cost=123, final_date=date)
        db.session.add(proposal1)
        db.session.add(proposal2)

        association11 = AssociationServiceProviderProposal(
            proposal1, service_providers[0])
        association12 = AssociationServiceProviderProposal(
            proposal1, service_providers[1])
        association13 = AssociationServiceProviderProposal(
            proposal2, service_providers[0])
        association14 = AssociationServiceProviderProposal(
            proposal2, service_providers[2])

        db.session.add(association11)
        db.session.add(association12)
        db.session.add(association13)
        db.session.add(association14)

        print(client)
        print("_" * 80)
        for s in service_providers: print(s)
        print("_" * 80)
        for d in demands: print(d)
        print("_" * 80)
        print(project1)
        print(project2)
        print("_" * 80)
        print(AssociationServiceProviderProject.query.all())
        print("_" * 80)
        print(AssociationServiceProviderProposal.query.all())

    except Exception as e:
        print(e)
