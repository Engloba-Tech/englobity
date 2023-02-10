import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { KeyboardDateTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Skeleton } from '@material-ui/lab';
import { Input } from '..';
import moment from 'moment';

export function CustomDateTimePicker({
  withHours,
  value,
  icon,
  InputProps,
  inputClassName,
  onChange,
  isLoading,
  skeletonHeight = 48,
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
        value: moment(e?.target?.value, 'DD/MM/YYYY HH:mm')
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
          format="DD/MM/YYYY HH:mm"
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
        />
      ) : (
        <KeyboardDatePicker
          {...params}
          format="DD/MM/YYYY"
          onOpen={() => setIsCalendarOpen(true)}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
    </>
  );
}

CustomDateTimePicker.propTypes = {
  withHours: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.instanceOf(Date)]),
  icon: PropTypes.element,
  InputProps: PropTypes.object,
  onChange: PropTypes.func,
  inputClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  skeletonHeight: PropTypes.number
};
