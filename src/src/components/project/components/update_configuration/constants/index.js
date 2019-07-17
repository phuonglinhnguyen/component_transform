export const PROTOCOL = ['FS', 'SFTP', 'FTP', 'IMAP', 'POP3', 'SOAP', 'RESTFUL']
export const ACTION_HANDLER = { 'NONE': 'none', 'DELETE': 'delete', 'MOVE': 'move', 'CHANGE_TO_READ': 'change_to_read', 'MASK_AS_READ': 'mask_as_read', 'RENAME': 'rename' };
export const validation_config = {
    configuration: [
        'name',
    ],
    connection: {
        FS: [
            'upload_to_folder',
        ],
        FTP: [
            'type',
            'host',
            'port',
            'username',
            'password',
            'upload_to_folder',
        ],
        SOAP: [
            'url',
            'method',
            'args',
            'operation_name',
        ]
    }
}
export const fields = [
    {
        name: 'name',
        validation: {
            arguments: {},
            content: 'if(!value||value.trim().length===0){return "Không được rỗng!"}',
        }
    }
    , { name: 'destination_folder' }
    , { name: 'zip' }
    , { name: 'encrypt' }
    , { name: 'overwrite' }
    , {
        name: 'type',
        validation: {
            arguments: {},
            content: 'if(!value||value.trim().length===0){return "Không được rỗng!"}',
        }
    }
    , {
        name: 'host',
        validation: {
            arguments: {},
            content: 'if(!value||value.trim().length===0){return "Không được rỗng!"}',
        }
    }
    , {
        name: 'port',
        validation: {
            arguments: {},
            content: 'if(!value||value.trim().length===0){return "Không được rỗng!"}',
        }
    }
    , { name: 'username' }
    , { name: 'password' }
    , {
        name: 'upload_to_folder',
        validation: {
            arguments: {},
            content: 'if(!value||value.trim().length===0){return "Không được rỗng!"}',
        }
    }
    , { name: 'upload_pattern' }
    /**restfull */
    , { name: 'url' }
    , { name: 'method' }
    , { name: 'args' }
    , { name: 'operation_name' }

    , { name: 'overwrite' }
    , { name: 'time_out' }
]
export const MAX_TRY_RELOAD = 2;
export const TIME_TRY_RELOAD = [0, 1 * 1000, 5 * 1000, 10 * 1000, 30 * 1000]
export const TIME_TRY_LOAD = 5 * 1000;
export const ACTION_CREATE = 'create';

/*const upload_configuration = {
    id: ObjectId,
    project_id: ObjectId,
    name: string,
    source_info: {
        type: string,//['ftp', 'sftp', 'imap', 'pop3'],
        host: string,
        port: number,
        username: string,
        password: string,
        upload_to_folder: string,

        upload_pattern: string,
        
        url: string,
        method: string,
        args: string,
        operation_name: string,

        overwrite: string,// value: 0||1,
        time_out: number,
        zip: boolean,
        encrypt:Object,
        success_handler: {
            action: string,//indexOf { 'DELETE': 'delete', 'NONE': 'none', 'MOVE': 'move', 'CHANGE_TO_READ': 'change_to_read', 'MASK_AS_READ': 'mask_as_read', 'RENAME':'rename' };
            move_to_folder: string,
        },
        error_handler: {
            retry: number,
            retry_interval: number
        }
    },
    local_document_location: string,
}*/