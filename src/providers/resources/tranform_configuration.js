import {
    GET_LIST,
    UPDATE,
    CREATE,
    DELETE,
    fetchJson,
 } from '@dgtx/coreui';
 import { 
    APP_NAME, 
   API_ENDPOINT } from '../../constants'
 import { getDataTranform } from '../faKedata'
 const data = getDataTranform();
 export default (type: string, resource: string, params: any) => {
    switch (type) {
       case GET_LIST: {
        const { projectId } = params;
            console.log(projectId)
           return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration`,{ method: 'GET'})
       }
       case UPDATE: {
         const {
            projectId,
            data } = params;
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration`,
         { method: 'PATCH', body: JSON.stringify(data)})
      }
      case CREATE: {
         const {
            projectId,
            data } = params;
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration`,
         { method: 'POST', body: JSON.stringify(data)})
      }
      case DELETE: {
         const {
            projectId,
            data } = params;
         return fetchJson(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${projectId}/transform-configuration`,
         { method: 'DELETE', body: JSON.stringify(data)})
         // return Promise.resolve({
         //    status: 200,
         //    headers: {},
         //    json: data,
         // })
      }
       default:
          break;
    }
    return Promise.reject(`Provider ${resource} method:${type} not yet supported!`)
 };