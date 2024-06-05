import { Skeleton } from '@material-ui/lab';
import { KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { TextValidator } from 'react-material-ui-form-validator';
import { Input } from '..';

export function CustomDateTimePicker({
  withHours,
  value,
  format = 'MM/DD/YYYY',
  icon,
  InputProps,
  inputClassName,
  onChange,
  isLoading,
  skeletonHeight = 48,
  onlyTime,
  ...props
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  function handleDateChange(date) {
    if (onChange) {
      const event = {
        target: {
          value: date
        }
      };
      if (isCalendarOpen) onChange(event);
    }
  }

  const onBlur = e => {
    const event = {
      target: {
        value: moment(e?.target?.value, format)
      }
    };
    if (!isCalendarOpen) onChange(event);
  };

  const params = {
    TextFieldComponent: params => <Input {...params} className={inputClassName} />,
    keyboardIcon: icon,
    value: value || null,
    autoOk: true,
    clearable: true,
    showTodayButton: true,
    ampm: false,
    fullWidth: true,
    inputVariant: 'outlined',
    onBlur: onBlur,
    onChange: handleDateChange,
    variant: 'dialog',
    ...props
  };

  return (
    <>
      {isLoading ? (
        <Skeleton height={skeletonHeight} />
      ) : withHours ? (
        <KeyboardDateTimePicker
          {...params}
          format={format.concat(' HH:mm')}
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
          minDate={undefined}
          maxDate={undefined}
        />
      ) : onlyTime ? (
        <KeyboardTimePicker
          {...params}
          format="HH:mm"
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
        />
      ) : (
        <KeyboardDatePicker
          {...params}
          format={format}
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
          minDate={undefined}
          maxDate={undefined}
          TextFieldComponent={TextValidator}
        />
      )}
    </>
  );
}

CustomDateTimePicker.propTypes = {
  withHours: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.instanceOf(Date)]),
  format: PropTypes.string,
  icon: PropTypes.element,
  InputProps: PropTypes.object,
  onChange: PropTypes.func,
  inputClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  skeletonHeight: PropTypes.number,
  onlyTime: PropTypes.bool
};
