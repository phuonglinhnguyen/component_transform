import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, FormLabel } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import TestIcon from '@material-ui/icons/KeyboardArrowRight';
import AceEditor from 'react-ace';
import FormHelperText from '@material-ui/core/FormHelperText';
import { isRequired } from '../../../services';
const styles: any = (theme: any) => {
	return {
		titleField: {
			fontWeight: 'bold'
		},
		add: {
			background: '#3f51b5',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1a237e'
			}
		},
		titleContent: {
			fontSize: '18px',
			margin: '10px 0'
		},
		save: {
			background: '#689f38',
			color: '#fafafa',
			transition: 'background 0.1s ease-in',
			'&:hover': {
				background: '#1b5e20'
			}
		},
		common: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		ace: {
			fontSize: '16px',
			height: '250px',
			margin: '20px 0'
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
		test: {
			display: 'flex',
			justifyContent: ' space-between',
			alignItems: 'center'
		},
		btnTest: {
			margin: theme.spacing.unit,
			fontSize: '12px',
			fontWeight: 'bold',
			'&:hover': {
				background: '#1a237e'
			}
		},
		extendedIcon: {
			marginRight: theme.spacing.unit
		},
		result: {
			width: '100%',
			background: 'lightgray',
			borderRadius: '30px',
			padding: '8px',
			border: 'none',
			fontSize: '15px'
		}
	};
};

export interface IDefautProps {
	classes?: any,
	theme?: any,
	common?: any,
	mode?: any,
	setMode?: any,
	config?: any,
	setConfig?: any,
	commonName?: any,
	setCommonName?: any,
	commonValue?: any,
	setCommonValue?: any,
	configValidators?: any,
	setConfigValidator?: any
}

const Common: React.FC<IDefautProps> = (props) => {
	const {
		classes,
		common,
		mode,
		setMode,
		config,
		setConfig,
		commonName,
		setCommonName,
		commonValue,
		setCommonValue,
		configValidators,
		setConfigValidator
	} = props;
	const [ commonTest, setCommonTest ] = useState(null);
	const [ testResult, setTestResult ] = useState('');
	const commonId = String(new Date().getTime());
	const checkIsEmptyCommon = (commonName) => {
		let result = false;
		if (!commonName) {
			setConfigValidator('commonName', true);
			result = true;
		} else {
			setConfigValidator('commonName', false);
		}
		return result;
	};

	const onAddCommon = () => {
		if (mode === 'add') {
			const newConmonItem = { commonId, [commonName]: commonValue };
			console.log({ newConmonItem });

			const checkEmpty = checkIsEmptyCommon(commonName);
			if (!checkEmpty) {
				const newCommon = [ ...common ];
				newCommon.unshift(newConmonItem);
				setConfig({
					...config,
					rules: {
						...config.rules,
						common: newCommon
					}
				});
				setCommonName(null);
				setCommonValue(null);
				setCommonTest(null);
				setTestResult('');
			}
		} else if (mode === 'edit') {
			const newCommons = common.map((newItem) => {
				console.log({ newItem });
				const key = newItem.commonId;
				if (key === commonId) {
					return { ...{ commonId, [commonName]: commonValue } };
				}
				return newItem;
			});
			console.log({ newCommons });

			setConfig({
				...config,
				rules: {
					...config.rules,
					common: newCommons
				}
			});
			setMode('add');
			setCommonName(null);
			setCommonValue(null);
			setCommonTest(null);
			setTestResult('');
		}
	};

	const onCancel = () => {
		setMode('add');
		setCommonName(null);
		setCommonValue(null);
		setCommonTest(null);
	};

	const onChangeCommonName = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log(value);

		if (configValidators[name] && isRequired(value)) {
			setConfigValidator(name, true);
		} else {
			setConfigValidator(name, false);
		}

		setCommonName(value);
	};

	const onTestCommon = () => {
		window.eval(commonValue);
		const result = window.eval(commonTest);
		setTestResult(result);
	};

	return (
		<React.Fragment>
			<div className={classes.common}>
				<FormLabel className={classes.titleField}>Common </FormLabel>
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
						className={mode === 'add' ? classes.add : classes.save}
						aria-label="Add"
						onClick={onAddCommon}
					>
						{mode === 'add' ? <AddIcon /> : <DoneIcon />}
					</Fab>
				</div>
			</div>
			<TextField
				required
				name="commonName"
				label="Name"
				error={configValidators['commonName'].error}
				value={commonName ? commonName : ''}
				onChange={onChangeCommonName}
			/>
			<FormHelperText className={classes.error}>
				{configValidators['commonName'].error ? configValidators['commonName'].message : ''}
			</FormHelperText>
			<label className={classes.titleContent}>Value</label>
			<AceEditor
				name="commonValue"
				className={classes.ace}
				editorProps={{ $blockScrolling: 'Infinity' }}
				enableBasicAutocompletion={true}
				enableLiveAutocompletion={true}
				enableSnippets={true}
				highlightActiveLine={true}
				width="100%"
				height="250px"
				mode="javascript"
				onChange={(commonValue) => setCommonValue(commonValue)}
				showGutter={true}
				showPrintMargin={false}
				theme="solarized_dark"
				value={commonValue || ''}
			/>
			<label className={classes.titleContent}>Input Test</label>
			<AceEditor
				name="commonTest"
				className={classes.ace}
				editorProps={{ $blockScrolling: 'Infinity' }}
				enableBasicAutocompletion={true}
				enableLiveAutocompletion={true}
				enableSnippets={true}
				highlightActiveLine={true}
				width="100%"
				height="100px"
				mode="javascript"
				showGutter={true}
				showPrintMargin={false}
				onChange={(commonTest) => setCommonTest(commonTest)}
				value={commonTest || ''}
			/>
			<div className={classes.test}>
				<Fab
					variant="extended"
					name="btnTestFunct"
					size="small"
					color="primary"
					aria-label="Test"
					className={classes.btnTest}
					onClick={onTestCommon}
				>
					<TestIcon className={classes.extendedIcon} />
					Test Funct
				</Fab>
				<input
					name="testResult"
					className={classes.result}
					margin="normal"
					value={testResult || ''}
					onChange={(testResult) => setTestResult(testResult)}
					placeholder="Test Common Result"
					disabled
				/>
			</div>
		</React.Fragment>
	);
};

export default withStyles(styles, { withTheme: true })(Common);
