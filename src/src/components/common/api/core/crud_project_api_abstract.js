import APIAbstract from './api_abstract';
import { API_ENDPOINT,APP_NAME } from '../../../../constants';

export default class CRUDApiProject extends APIAbstract {
    constructor(conn, api_url) {
        super(conn);
        this._api_url = api_url;
    }
    get = (projectId, id) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${projectId}/${this._api_url}/${id}`)
    }
    list = (projectId) => {
        return this._conn.get(`/apps/${APP_NAME}/projects/${projectId}/${this._api_url}`)
    }
    add = (projectId,data) => {
        return this._conn.post(`/apps/${APP_NAME}/projects/${projectId}/${this._api_url}`, data);
    }
    update = (projectId, id, data) => {
        return this._conn.patch(`/apps/${APP_NAME}/projects/${projectId}/${this._api_url}/${id}`, data);
    }
    replay = (projectId, id, data) => {
        return this._conn.put(`/apps/${APP_NAME}/projects/${projectId}/${this._api_url}/${id}`, data);
    }
    delete = async (projectId, id) => {
        return await this._conn.delete(`/apps/${APP_NAME}/projects/${projectId}/${this._api_url}/${id}`);
    }
}