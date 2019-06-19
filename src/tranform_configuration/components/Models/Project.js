
class Project {
    constructor() {
        this.project_id = new Date().getTime();
        this.name = '';
        this.active = true;
        this.doc_status='final'
    }
}

export default Project