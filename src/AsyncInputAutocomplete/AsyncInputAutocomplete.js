import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Skeleton } from '@material-ui/lab';
import { useHandleOpen, Input } from '../';
import { execHelper } from '../helper';

const TIME = 500;

// More Info Autocomplete
// https://material-ui.com/es/api/autocomplete/

export function AsyncInputAutocomplete({
	requestAction,
	validators,
	defaultInputValue,
	errorMessages,
	icon,
	required,
	label,
	value,
	multiple,
	onChange,
	isLoading,
	skeletonHeight = 48,
	...props
}) {
	const { isOpen, handleClose, handleOpen } = useHandleOpen(false);
	const [input, setInput] = useState('');
	const [internalValue, setInternalValue] = useState(value);
	const [options, setOptions] = useState([]);
	const [startLoading, setStartLoading] = useState(false);

	useEffect(() => {
		setInput(defaultInputValue);
	}, [defaultInputValue]);

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	function handleAutocompleteOpen() {
		if (startLoading) {
			handleOpen();
		}
	}

	function handleAutocompleteClose() {
		handleClose();
		setOptions([]);
		setStartLoading(false);
	}

	function onClickOpenButton() {
		setStartLoading(true);
		handleOpen();
		loadRequest();
	}

	function onInputChange(event) {
		const value = (event && event.target.value) || '';
		setInput(value);

		if (!value) {
			return;
		}

		setStartLoading(true);
		handleOpen();
		execHelper.delayed(() => loadRequest(value), TIME);
	}

	function onChangeValueSingle(event, newValue) {
		setInternalValue(newValue);
		setInput(newValue?.name || '');

		onChange(event, newValue);
	}

	async function loadRequest(queryString) {
		try {
			const response = await requestAction(queryString);

			if (response) {
				setOptions(Object.keys(response).map((index) => response[index]));
				setStartLoading(false);
			}
		} catch (error) {
			// TODO
		}
	}

	// TODO: move

	// const loadingValue = multiple ? internalValue[0] : internalValue;
	// const isLoading =
	// 	loadingValue &&
	// 	Object.keys(loadingValue).some(function (k) {
	// 		return isSkeletonLoading(loadingValue[k]);
	// 	});

	return (
		<>
			{isLoading ? (
				<Skeleton height={skeletonHeight} />
			) : (
				<Autocomplete
					{...props}
					value={internalValue}
					open={isOpen}
					onOpen={handleAutocompleteOpen}
					clearOnEscape
					multiple={multiple}
					onClose={handleAutocompleteClose}
					options={options}
					onInputChange={onInputChange}
					inputValue={input || ''}
					onChange={multiple ? onChange : onChangeValueSingle}
					loading={startLoading}
					popupIcon={<ArrowDropDownIcon onClick={onClickOpenButton} />}
					renderInput={(params) => (
						<Input
							{...params}
							icon={icon}
							label={label}
							value={input || ''}
							required={required}
							validators={validators}
							errorMessages={errorMessages}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{startLoading ? (
											<CircularProgress color='inherit' size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)}
				/>
			)}
		</>
	);
}

AsyncInputAutocomplete.propTypes = {
	requestAction: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	icon: PropTypes.element,
	label: PropTypes.string,
	multiple: PropTypes.bool,
	getOptionSelected: PropTypes.func.isRequired,
	getOptionLabel: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
	]),
	isLoading: PropTypes.bool,
	defaultInputValue: PropTypes.string,
	required: PropTypes.bool,
	validators: PropTypes.arrayOf(PropTypes.string),
	errorMessages: PropTypes.arrayOf(PropTypes.string),
	skeletonHeight: PropTypes.number,
};
