import CRUDApi from '../core/crud_project_api_abstract';
import { API_ENDPOINT,APP_NAME } from '../../../../constants';

export default class Layout extends CRUDApi{
    constructor(conn) {
        const api_url = `layout-definitions`
         super(conn,api_url)
     }
    list_of_project = (id) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${id}/layout-definitions`)
    }
    clone_layout=(projectId,id)=>{
        return this._conn.post(`/apps/${APP_NAME}/projects/${projectId}/layout-definitions/clone`, {id});
        
    }
    list_of_project_by_attr=(id,includes)=>{
        includes =includes ||['id','name']
        return this._conn.get(`/apps/${APP_NAME}/projects/${id}/layout-definitions?includes=${includes.join(',')}`)
    }
}