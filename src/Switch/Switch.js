import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function CustomSwitch({
	label,
	className,
	isLoading,
	skeletonHeight = 48,
	...props
}) {
	return (
		<>
			{isLoading ? (
				<Skeleton height={skeletonHeight} width={'100%'} />
			) : (
				<FormControlLabel
					className={className}
					control={
						<Switch
							{...props}
							color='primary'
							name={label}
							inputProps={{ 'aria-label': label }}
						/>
					}
					label={label}
				/>
			)}
		</>
	);
}

CustomSwitch.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	isLoading: PropTypes.bool,
	skeletonHeight: PropTypes.number,
};
