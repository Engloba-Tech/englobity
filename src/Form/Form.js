import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Summary } from '../Summary';
import { validations } from './validations';
import { useFormStyles } from './form.styles';

export function Form({ children, errors, elementRef, ...props }) {
	const classes = useFormStyles();

	useEffect(() => {
		ValidatorForm.addValidationRule(
			validations.hourFormat.name,
			validations.hourFormat.cb
		);
		ValidatorForm.addValidationRule(
			validations.daysFormat.name,
			validations.daysFormat.cb
		);
		ValidatorForm.addValidationRule(
			validations.nifFormat.name,
			validations.nifFormat.cb
		);
		ValidatorForm.addValidationRule(
			validations.cifFormat.name,
			validations.cifFormat.cb
		);
		ValidatorForm.addValidationRule(
			validations.nieFormat.name,
			validations.nieFormat.cb
		);
		ValidatorForm.addValidationRule('isPasswordMatch', (value, referenceValue) => value === referenceValue);
		ValidatorForm.addValidationRule(
			validations.cadastralReferenceFormat.name,
			validations.cadastralReferenceFormat.cb
		);
		ValidatorForm.addValidationRule(
			validations.phoneNumber.name,
			validations.phoneNumber.cb
		);
		ValidatorForm.addValidationRule(
			validations.noDecimal.name,
			validations.noDecimal.cb
		);
	}, []);

	return (
		<>
			<Summary
				severity='error'
				text={errors?.message || ''}
				detail={errors?.detail || ''}
				className={classes.summary}
			/>
			<ValidatorForm noValidate ref={elementRef} {...props} autoComplete='off'>
				{children}
				<input type='submit' className={classes.hiddenSubmit} tabIndex='-1' />
			</ValidatorForm>
		</>
	);
}

Form.propTypes = {
	elementRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]),
	errors: PropTypes.shape({
		message: PropTypes.string,
		detail: PropTypes.string,
	}),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
