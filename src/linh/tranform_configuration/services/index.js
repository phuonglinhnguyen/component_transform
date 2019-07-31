import isEmpty from 'lodash/isEmpty';

const IS_REQUIRED_MESSAGE = 'This field is required!';

export const configValidators = {
	name: {
		error: false,
		message: `The field name is required!`
	},
	fieldKey: {
		error: false,
		message: `The field fieldKey is required!`
	},
	commonName: {
		error: false,
		message: `The field commonName is required!`
	},
	contentName: {
		error: false,
		message: `The field contentName is required!`
	},
	dataKey: {
		error: false,
		message: `The field dataKey is required!`
	}
};
export const exConfigValidators_fields = {
	name: {
		error: false,
		message: `The field name is required!`
	},
	value: {
		error: false,
		message: `The field value is required!`
	}
};

export const setExConfigValidatorsFields = (name, value) => {
	exConfigValidators_fields[name].error = value;
};

export const setConfigValidator = (name, value) => {
	configValidators[name].error = value;
};

export const isRequired = (value) => {
	if (isEmpty(value)) {
		return IS_REQUIRED_MESSAGE;
	}
	return false;
};
