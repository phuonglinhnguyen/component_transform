import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import ChipInput from '@harshitpant/material-ui-chip-input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isRequired } from '../../services';

const styles: any = (theme: any) => {
	return {
		dictionary: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: '20px'
		},
		titleField: {
			fontWeight: 'bold'
		},
		textField: {
			width: '95%'
		},
		textField1: {
			width: '70%'
		},
		add: {
			background: '#3f51b5',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1a237e'
			}
		},
		save: {
			background: '#689f38',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1b5e20'
			}
		},
		formInput: {
			margin: '24px 0'
		},
		query: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		hidden: {
			display: 'none'
		},
		cancel: {
			marginRight: '10px',
			background: '#ff9800',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#e65100'
			}
		},
		error: {
			color: 'red',
			opacity: '0.8'
		},
		helper: {
			opacity: '0.5'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	config?: any,
	setConfig?: any,
	dictItem?: any,
	setDictItem?: any,
	mode?: any,
	setMode?: any,
	dictionary?: any,
	configValidators?: any,
	setConfigValidator?: any
}
export interface IDefautState {
	chips?: any,
	setChips?: any
}

const DictionaryComponent: React.FC<IDefautProps, IDefautState> = (props) => {
	const {
		classes,
		config,
		setConfig,
		dictItem,
		setDictItem,
		mode,
		dictionary,
		setMode,
		setConfigValidator,
		configValidators
	} = props;
	const query = get(dictItem, 'query', {});
	const queryArray = Object.keys(query);
	const [ chips, setChips ] = useState([]);
	const [ typeDb, setTypeDb ] = useState('');
	const valDB = [
		{ label: 'MongoDB', value: 'MongoDB' },
		{ label: 'PostgresSQL', value: 'PostgresSQL' },
		{ label: 'Rest', value: 'rest' }
	];

	useEffect(
		() => {
			setChips(queryArray);
		},
		[ dictItem ]
	);

	const onChangeText = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (configValidators[name]) {
			setConfigValidator(name, false);
		}

		setDictItem({
			...dictItem,
			[name]: value
		});
	};
	const onChangeTextType = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else if (configValidators[name]) {
			setConfigValidator(name, false);
		}
		if (value === 'rest') {
			setTypeDb('rest');
		} else {
			setTypeDb('');
		}
		setDictItem({
			...dictItem,
			[name]: value
		});
	};
	const checkIsEmpty = (newDictItem) => {
		let result = true;
		if (isEmpty(newDictItem.fieldKey)) {
			result = false;
			setConfigValidator('fieldKey', true);
		} else {
			setConfigValidator('fieldKey', false);
		}

		if (isEmpty(newDictItem.host)) {
			result = false;
			setConfigValidator('host', true);
		} else {
			setConfigValidator('host', false);
		}
		if (isEmpty(newDictItem.database_type)) {
			result = false;
			setConfigValidator('database_type', true);
		} else {
			setConfigValidator('database_type', false);
		}
		if (isEmpty(newDictItem.query)) {
			result = false;
			setConfigValidator('query', true);
		} else {
			setConfigValidator('query', false);
		}
		return result;
	};

	const setNull = () => {
		setConfigValidator('fieldKey', false);
		setConfigValidator('host', false);
		setConfigValidator('database_type', false);
		setConfigValidator('query', false);
	};

	const onAddDictionary = () => {
		if (mode === 'add') {
			const newDictItem = { ...dictItem };
			const checkEmpty = checkIsEmpty(newDictItem);
			if (checkEmpty) {
				setConfig({
					...config,
					dictionary: [ ...config.dictionary, newDictItem ]
				});
				setDictItem(null);
			}
		} else if (mode === 'edit') {
			const newDictionary = dictionary.map((_dictItem) => {
				if (_dictItem.fieldKey === dictItem.fieldKey) {
					return { ...dictItem };
				}
				return _dictItem;
			});

			const checkEmptyEdit = checkIsEmpty(dictItem);
			if (checkEmptyEdit) {
				setConfig({
					...config,
					dictionary: newDictionary
				});
				setMode('add');
				setDictItem(null);
				setNull();
			}
		}
	};

	const onCancel = () => {
		setMode('add');
		setDictItem(null);
		setNull();
	};

	const onChangeQuery = (chip) => {
		const newQuery = { ...query, [chip]: null };
		if (configValidators['query'] && isRequired(chip)) {
			setConfigValidator('query', true);
		} else if (configValidators['query']) {
			setConfigValidator('query', false);
		}
		setDictItem({
			...dictItem,
			query: newQuery
		});
	};

	const onDeleteQuery = (chip) => {
		const newQuery = { ...query };
		delete newQuery[chip];
		setDictItem({
			...dictItem,
			query: newQuery
		});
	};

	return (
		<React.Fragment>
			<div className={classes.dictionary}>
				<FormLabel className={classes.titleField}>Dictionary</FormLabel>
				<div className={classes.actions}>
					<Fab
						size="small"
						className={mode === 'add' ? classes.hidden : classes.cancel}
						aria-label="Cancel"
						onClick={onCancel}
					>
						{mode === 'add' ? '' : <CancelIcon />}
					</Fab>
					<Fab
						size="small"
						aria-label="Add"
						className={mode === 'add' ? classes.add : classes.save}
						onClick={onAddDictionary}
					>
						{mode === 'add' ? <AddIcon /> : <DoneIcon />}
					</Fab>
				</div>
			</div>

			<div className={classes.formInput}>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							required
							label="Field Key"
							className={classes.textField}
							error={configValidators['fieldKey'].error}
							name="fieldKey"
							margin="dense"
							variant="outlined"
							onChange={onChangeText}
							value={dictItem && dictItem.fieldKey ? dictItem.fieldKey : ''}
							disabled={mode === 'edit'}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['fieldKey'].error ? configValidators['fieldKey'].message : ''}
						</FormHelperText>
					</Grid>
					<Grid item xs={6}>
						<TextField
							required
							select
							name="database_type"
							className={classes.textField}
							variant="outlined"
							label="Database Type"
							error={configValidators['database_type'].error}
							margin="dense"
							value={dictItem && dictItem.database_type ? dictItem.database_type : ''}
							onChange={(e) => {
								onChangeTextType(e);
							}}
						>
							{valDB.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<FormHelperText className={classes.error}>
							{configValidators['database_type'].error ? configValidators['database_type'].message : ''}
						</FormHelperText>
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							required
							name="host"
							label="Host"
							error={configValidators['host'].error}
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.host ? dictItem.host : ''}
						/>
						<FormHelperText className={classes.error}>
							{configValidators['host'].error ? configValidators['host'].message : ''}
						</FormHelperText>
					</Grid>
					<Grid item xs={6}>
						<TextField
							type="number"
							name="port"
							label="Port"
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.port ? dictItem.port : ''}
						/>
						<FormHelperText className={classes.error} />
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							name="username"
							label="Username"
							className={classes.textField}
							type="text"
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.username ? dictItem.username : ''}
						/>
						<FormHelperText className={classes.error} />
					</Grid>
					<Grid item xs={6}>
						<TextField
							name="password"
							placeHolder="Password"
							label="Password"
							type="password"
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.password ? dictItem.password : ''}
						/>
						<FormHelperText className={classes.error} />
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					<Grid item xs={6}>
						<TextField
							name="database_name"
							label="Database Name"
							className={classes.textField}
							type="text"
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.database_name ? dictItem.database_name : ''}
						/>
						<FormHelperText className={classes.error} />
					</Grid>
					<Grid item xs={6}>
						<TextField
							name="schema_name"
							label="Schema Name"
							type="text"
							className={classes.textField}
							margin="dense"
							onChange={onChangeText}
							variant="outlined"
							value={dictItem && dictItem.schema_name ? dictItem.schema_name : ''}
						/>
						<FormHelperText className={classes.error} />
					</Grid>
				</Grid>
				<Grid container spacing={12} alignItems="flex-end">
					{typeDb === 'rest' ? (
						<div style={{ width: '98%' }}>
							<TextField
								name="query"
								label="Query"
								type="text"
								margin="dense"
								fullWidth
								onChange={onChangeText}
								variant="outlined"
								value={dictItem && dictItem.query ? dictItem.query : ''}
							/>
							<FormHelperText className={classes.error}>
								{configValidators['query'].error ? configValidators['query'].message : ''}
							</FormHelperText>
						</div>
					) : (
						<div style={{ width: '95%' }}>
							<ChipInput
								required
								defaultValue={queryArray}
								name="query"
								label="Query"
								fullWidth
								error={configValidators['query'].error}
								value={chips || []}
								onChange={onChangeText}
								onAdd={(chip) => onChangeQuery(chip)}
								onDelete={(chip) => onDeleteQuery(chip)}
							/>
							<FormHelperText className={classes.error}>
								{configValidators['query'].error ? configValidators['query'].message : ''}
							</FormHelperText>
						</div>
					)}
				</Grid>
			</div>
		</React.Fragment>
	);
};
export default withStyles(styles, { withTheme: true })(DictionaryComponent);
