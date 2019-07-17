import {
    PictureInPicture, ThumbsUpDown, ExitToApp, FormatColorFill, CloudUpload, Receipt, Launch,
    OpenInBrowser, Category, ImportContacts, Class, ImageAspectRatio,
    PersonAdd, RecentActors, Assignment, PermCameraMic, VerticalSplit
} from '@material-ui/icons'

export  const functions = {
    "detail_sources": {
        name: 'detail_sources',
        path: '/detail-sources',
        icon: PictureInPicture,
        title: 'Detail sources',
    },
    "response_evaluations": {
        name : 'response_evaluations',
        path: '/response-evaluations',
        icon: PictureInPicture,
        title: 'Response evaluations'
    },
    "layout_definitions": {
        name : 'layout_definitions',
        path: '/layout-definitions',
        icon: PictureInPicture,
        title: 'Layout definitions'
    },
    "field_value_definitions" : {
        name: 'field_value_definitions',
        path: '/field-value-definitions',
        icon: PictureInPicture,
        title: 'Field value definitions'
    },
    "export_configs" : {
        name: 'export_configs',
        path: '/export-configs',
        icon: PictureInPicture,
        title: 'Export configuration'
    },    
    "workflow" : {
        name: 'workflow',
        path: '/workflow',
        icon: PictureInPicture,
        title: 'Workflow'
    },    
    "upload_configs" : {
        name: 'upload_configs',
        path: '/upload-configurations',
        icon: PictureInPicture,
        title: 'Upload configuration'
    },
    "export_general_config" : {
        name: 'export_general_config',
        path: '/export-general-config',
        icon: PictureInPicture,
        title: 'Export General Config'
    },
    "tranform_config" : {
        name: 'tranform_config',
        path: '/tranform-config',
        icon: PictureInPicture,
        title: 'Tranform Configuration'
    },
    "export_config" : {
        name: 'export_config',
        path: '/export-config',
        icon: PictureInPicture,
        title: 'Export Configuration'
    }
}
export const getFunction = (items: string[]) => {
    return Object.values(functions)
}