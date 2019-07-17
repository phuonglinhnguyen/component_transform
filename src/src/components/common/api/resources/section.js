import CRUDApi from '../core/crud_project_api_abstract';
import { API_ENDPOINT,APP_NAME } from '../../../../constants';

export default class Section extends CRUDApi {
    constructor(conn) {
        const api_url = `section-definitions`
        super(conn, api_url)
    }
    list_of_layout = (projectId,id) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${projectId}/layout-definitions/${id}/section-definitions`)
    }
    list_of_project = (id) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${id}/section-definitions`)
    }
    get_section_by_name = (projectId, sectionName) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${projectId}/section-definitions?section_name=${sectionName}`)
    }
    get_section_by_layout_name = (projectId,layout_name) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${projectId}/section-definitions?layout_name=${layout_name}&attributes=${'position,visible,disable,validation'}`)
    }
    
}