// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import Start from "views/Start/Start.jsx";
import StatusProject from "views/StatusProject/StatusProject.jsx";
import CreateDemand from "views/CreateDemand/CreateDemand.jsx";
import ConcludeProject from "views/ConcludeProject/ConcludeProject.jsx";
import ProjectsList from "views/ProjectsList/ProjectsList.jsx";
import CreateProposal from "views/CreateProposal/CreateProposal.jsx";

const dashboardRoutes = [
	{
		path: "/inicio",
		sidebarName: "Início",
		navbarName: "Informações Gerais",
		icon: Dashboard,
		component: Start
	},
	{
		path: "/projeto/status/:id",
		sidebarName: "Projeto",
		navbarName: "Acompanhamento do Projeto",
		icon: Dashboard,
		component: StatusProject
	},
	{
		path: "/projetos",
		sidebarName: "Lista de Projetos",
		navbarName: "Lista de Projetos",
		icon: "content_paste",
		component: ProjectsList
	},
	{
		path: "/projeto/concluir",
		sidebarName: "Finalizar",
		navbarName: "Finalizar Projeto",
		icon: LibraryBooks,
		component: ConcludeProject
	},
	{
		path: "/demanda",
		sidebarName: "Cadastrar Demanda",
		navbarName: "Demanda",
		icon: Person,
		component: CreateDemand
	},
	{
		path: "/proposta",
		sidebarName: "Criar Proposta",
		navbarName: "Criar Proposta",
		icon: BubbleChart,
		component: CreateProposal
	},
	{ redirect: true, path: "/", to: "/inicio", navbarName: "Redirect" }
];

export default dashboardRoutes;
