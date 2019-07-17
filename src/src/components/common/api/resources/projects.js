import CRUDApi from '../core/crud_api_abstract';
import { API_ENDPOINT,APP_NAME } from '../../../../constants';

export default class Projects extends CRUDApi{
    constructor(conn) {
        const api_url = `apps/${APP_NAME}/projects`;
         super(conn,api_url)
     }
}