import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { InputLabel, MenuItem, FormControl, Select, ListItemIcon, FormHelperText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useCustomSelectStyles } from './select.styles';

export function CustomSelect({
  className,
  title,
  value = '',
  elements,
  menuItemRender,
  isLoading,
  displayEmpty,
  skeletonHeight = 48,
  required,
  errorMessage,
  submitted,
  error,
  ...props
}) {
  const id = shortid.generate();
  const classes = useCustomSelectStyles();
  const isRequiredError = (required && submitted && !value) || error;
  return (
    <FormControl error={error} {...props} variant="outlined" className={`${classes.root} ${className}`}>
      {isLoading ? (
        <Skeleton height={skeletonHeight} />
      ) : (
        <>
          <InputLabel shrink={displayEmpty} id={`select-outlined-${id}`}>
            {title}
            {title && <span className={classes.requiredLabel}>*</span>}
          </InputLabel>
          <Select
            className={`${classes.customSelect} ${isRequiredError ? 'Mui-error' : ''}`}
            labelId={`select-outlined-${id}`}
            id={`${id}-select-outlined`}
            value={value}
            required={required}
            displayEmpty={displayEmpty}
            error={error}
            {...props}
            label={title}
          >
            {elements.map(element => (
              <MenuItem key={shortid.generate()} value={element.value}>
                {menuItemRender ? (
                  menuItemRender(element.value)
                ) : (
                  <>
                    {element.icon && <ListItemIcon className={classes.icon}>{element.icon}</ListItemIcon>}
                    {element.name}
                  </>
                )}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {isRequiredError && <FormHelperText className={classes.inputHelper}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      icons: PropTypes.element,
      name: PropTypes.string
    })
  ).isRequired,
  menuItemRender: PropTypes.func,
  isLoading: PropTypes.bool,
  skeletonHeight: PropTypes.number,
  displayEmpty: PropTypes.bool,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  submitted: PropTypes.bool
};
