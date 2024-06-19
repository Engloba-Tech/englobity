import { Skeleton } from '@material-ui/lab';
import { KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Input } from '..';

export function CustomDateTimePicker({
  withHours,
  value,
  dateFormat = 'DD/MM/YYYY',
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

  const format = withHours ? dateFormat.concat(' HH:mm') : onlyTime ? 'HH:mm' : dateFormat;

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
        value: moment(e?.target?.value, dateFormat)
      }
    };
    if (!isCalendarOpen) onChange(event);
  };

  const params = {
    TextFieldComponent: params => <Input {...params} className={inputClassName} />,
    keyboardIcon: icon,
    value: value || null,
    dateFormat: dateFormat,
    autoOk: true,
    clearable: true,
    showTodayButton: true,
    ampm: false,
    fullWidth: true,
    inputVariant: 'outlined',
    onBlur: onBlur,
    onChange: handleDateChange,
    variant: 'dialog',
    format,
    ...props
  };

  return (
    <>
      {isLoading ? (
        <Skeleton height={skeletonHeight} />
      ) : withHours ? (
        <KeyboardDateTimePicker
          {...params}
          dateFormat={format}
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
          minDate={undefined}
          maxDate={undefined}
        />
      ) : onlyTime ? (
        <KeyboardTimePicker
          {...params}
          dateFormat={format}
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
        />
      ) : (
        <KeyboardDatePicker
          {...params}
          dateFormat={format}
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
          minDate={undefined}
          maxDate={undefined}
        />
      )}
    </>
  );
}

CustomDateTimePicker.propTypes = {
  withHours: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.instanceOf(Date)]),
  dateFormat: PropTypes.string,
  icon: PropTypes.element,
  InputProps: PropTypes.object,
  onChange: PropTypes.func,
  inputClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  skeletonHeight: PropTypes.number,
  onlyTime: PropTypes.bool
};
