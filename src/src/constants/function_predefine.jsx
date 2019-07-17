import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionDashboard from "material-ui/svg-icons/action/dashboard";
// import ActionHelp from "material-ui/svg-icons/action/help";
import ActionBuild from "material-ui/svg-icons/action/build";
import ActionPermIdentity from "material-ui/svg-icons/action/perm-identity";
import InsertChartIcon from "material-ui/svg-icons/editor/insert-chart";
// import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import Panorama from "material-ui/svg-icons/image/panorama";
import FolderIcon from "material-ui/svg-icons/file/folder"; 

export  const functions=
[
     {
        name:'Validation definitions',
        path: "/validation-definitions",
        sidebarName: "sidebar.validation-definitions",
        navbarName: "navbar.validation-definitions",
        icon: ContentInbox,
    },  {
        name:'Pattern definitions',
        path: "/pattern-definitions",
        sidebarName: "sidebar.pattern-definitions",
        navbarName: "navbar.pattern-definitions",
        icon: ActionPermIdentity,
    },  {
        name:'Lookup definitions',
        path: "/lookup-definitions",
        sidebarName: "sidebar.lookup-definitions",
        navbarName: "navbar.lookup-definitions",
        icon: ActionBuild,
    },  {
        name:'Error definitions',
        path: "/error-definitions",
        sidebarName: "sidebar.error-definitions",
        navbarName: "navbar.error-definitions",
        icon: FolderIcon,
    },  {
        name:'Rule definitions',
        path: "/transform-rule-definitions",
        sidebarName: "sidebar.rule-definitions",
        navbarName: "navbar.rule-definitions",
        icon: ContentInbox,
    },  {
        name:'Service definitions',
        path: "/service-definitions",
        sidebarName: "sidebar.service-definitions",
        navbarName: "navbar.service-definitions",
        icon: Panorama,
    }
]