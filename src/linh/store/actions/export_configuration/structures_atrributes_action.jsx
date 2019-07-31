export const NAME_REDUCER = 'export_config';
export const KEY_TRANSLATE = 'export_config';
export const FIELD_NAME = 'name';
export const FIELD_CRON_TRIGGER = 'cron_trigger';
export const FIELD_ACTIVE = 'active';
export const FIELD_PROJECT_ID = 'project_id';
export const FIELD_EXPORT_DESTINATION = 'export_destination';
export const FIELD_COLLECTOR_EXPORT_OPTION = 'collect_export_option';
export const FIELD_EXPORT_FORMAT = 'export_format';
export const FIELD_COLLECT_TYPE = '';
export const FIELD_EXPORT_FORMAT_TYPE = '';
export const FIELD_FIELDS_EXPORT = 'fields_export';
export const FIELD_FIELDS_NAME = 'name';
export const FIELD_FIELDS_VALUE = '';
export const FIELD_FILENAME = 'fileName';
export const FIELD_ROOTNAME = 'rootName';
export const FIELD_DELIMITER = 'delimiter';

export const STRUCTURES_FIELD_EXPORT = {
	[FIELD_NAME]: '',
	[FIELD_ACTIVE]: '',
	[FIELD_EXPORT_DESTINATION]: '',
	[FIELD_CRON_TRIGGER]: '',
	[FIELD_PROJECT_ID]: '',

	[FIELD_COLLECTOR_EXPORT_OPTION]: {
		[FIELD_COLLECT_TYPE]: ''
	},

	[FIELD_EXPORT_FORMAT]: [
		{
			[FIELD_EXPORT_FORMAT_TYPE]: '',
			[FIELD_FIELDS_EXPORT]: [
				{
					[FIELD_FIELDS_NAME]: '',
					[FIELD_FIELDS_VALUE]: [
						{
							[FIELD_FIELDS_NAME]: '',
							[FIELD_FIELDS_VALUE]: ''
						}
					]
				}
			],
			[FIELD_FILENAME]: '',
			[FIELD_ROOTNAME]: 'rootName',
			[FIELD_DELIMITER]: ''
		}
	]
};

export const FIELD_ATTRIBUTES_EXPORT = {};
