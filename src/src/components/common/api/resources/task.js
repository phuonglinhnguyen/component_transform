export default class Task {
    constructor(conn) {
        this._conn = conn;
    }
    get = (id) => {
        return this._conn.get(`workflow/tasks/${id}`)
    }
    claim = (id, username) => {
        return this._conn.patch(`workflow/tasks/${id}/claim`, { user_name: username });
    }
    claim_next = (projectId, taskId, username) => {
        return this._conn.patch(`workflow/tasks/${projectId}/${taskId}/claim`, { user_name: username });
    }
    claim_next_max = (projectId, taskId, username, maxResult) => {
        return this._conn.patch(`workflow/tasks/${projectId}/${taskId}/claim?maxResult=${maxResult}`, { user_name: username });
    }
    claim_multi = async (
        processKey: String,
        taskDefId: String,
        maxResult: Number,
        groupBy: String,
        filterKey: String,
        filterOperator: String,
        filterValue: String,
        sortingBy: String,
        userName: String) => {
        return this._conn.patch(`workflow/tasks/${processKey}/${taskDefId}/claim?maxResult=${maxResult}&groupBy=${groupBy}&filteringBy=${filterKey};${filterOperator};${filterValue}&sortingBy=${sortingBy}`, { user_name: userName });

    }
    complete = (id, data) => {
        return this._conn.patch(`workflow/tasks/${id}/complete`, data);
    }
    complete_multi = (id, data) => {
        return this._conn.patch(`workflow/tasks/complete`, data);
    }
}