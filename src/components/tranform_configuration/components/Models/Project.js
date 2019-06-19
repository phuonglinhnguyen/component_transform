
class Project {
	constructor() {
		this.project_id = new Date().getTime();
		this.name = '';
		this.active = true;
		this.filter = {
			collector: {
				doc_status: "final",
				batch_status: "",
				doc_set_status: ""
			},
			transform: {
				pattern: ""
			}
		}
		this.rules = {
			common: [
				{
					convertNumber:
						"function(input){return input? input.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') : '';}"
				},
				{
					XX: "12345"
				}
			],
		}
	}
}

export default Project