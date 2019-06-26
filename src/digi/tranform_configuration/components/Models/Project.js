class Project {
  constructor() {
    this.project_id = new Date().getTime();
    this.name = "";
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
    };
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
      content: {
        H4: {
          dataKey: "p3",
          default: "p3",
          value: ""
        },
        H0: {
          dataKey: "h0",
          default:
            "function(input, parent, params){if(params.document_link.link_type === 'sftp') {let result = lookup_doc_set(params['_id']); return result.doc_set_name;}else if(params.document_link.link_type === 'imap') {return params.document_link.mail.subject;} else {return '';} }",
          value: ""
        }
      }
    };
    this.dictionary = []
  }
}

export default Project;
